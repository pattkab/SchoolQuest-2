import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { blockingIssues } from "@/lib/digitization";
import { readDraft } from "@/lib/digitization-jobs";
import { requireUser, isAccreditedTeacher, isAdmin } from "@/lib/session";
import { approveDigitization, cancelDigitization, confirmDiagram, correctQuestion, publishDigitization, rejectDigitization, setJobSubject, advanceDigitization } from "../actions";

const ISSUE: Record<string, string> = {
  "missing-prompt": "Question text is missing",
  "missing-marks": "Marks are missing",
  duplicate: "This question is repeated",
  "unsupported-answer": "No accepted answer",
  "unconfirmed-diagram": "Diagram labels need a teacher",
  "invalid-type": "Question type is not supported",
  "no-questions": "No questions were found",
};

export default async function DigitizationJobPage({ params }: { params: Promise<{ jobId: string }> }) {
  const user = await requireUser();
  if (!isAccreditedTeacher(user) && !isAdmin(user.role)) redirect("/dashboard");
  const { jobId } = await params;
  const job = await db.digitizationJob.findUnique({ where: { id: jobId }, include: { importedSource: { select: { url: true, permission: true } }, events: { orderBy: { createdAt: "asc" } } } });
  if (!job || (job.createdById !== user.id && !isAdmin(user.role))) notFound();
  const draft = readDraft(job.draft);
  const blocking = draft ? blockingIssues(draft) : ["no-questions"];
  const subjects = await db.subject.findMany({ orderBy: [{ classGrade: { order: "asc" } }, { order: "asc" }], include: { classGrade: true } });

  return (
    <div className="space-y-5 max-w-3xl">
      <Link href="/dashboard/teacher/digitization" className="text-sm text-primary">All papers</Link>
      <div>
        <h1 className="font-display text-3xl">{job.title || job.fileName}</h1>
        <p className="text-muted-foreground mt-1">{job.status.replaceAll("_", " ").toLowerCase()} · {job.stage} · {job.progress}%</p>
        {job.importedSource ? <div className="mt-2 text-sm">
          <a className="text-primary underline" href={job.importedSource.url} target="_blank" rel="noreferrer">Open original Fresh Teacher PDF</a>
          <p>Permission record: {job.importedSource.permission || "Unverified. Publication is locked."}</p>
        </div> : null}
        {job.errorMessage ? <p className="mt-2 text-sm">{job.errorMessage}</p> : null}
      </div>

      {job.status === "QUEUED" || job.status === "FAILED" ? (
        <div className="flex gap-2">
          <form action={advanceDigitization}><input type="hidden" name="jobId" value={job.id} /><button className="h-11 rounded-2xl bg-primary px-4 text-white">Read this paper</button></form>
          <form action={cancelDigitization}><input type="hidden" name="jobId" value={job.id} /><button className="h-11 rounded-2xl border px-4">Cancel</button></form>
        </div>
      ) : null}

      <form action={setJobSubject} className="grid gap-2 rounded-2xl border bg-white p-4">
        <input type="hidden" name="jobId" value={job.id} />
        <label className="text-sm" htmlFor="title">Title</label>
        <input id="title" name="title" defaultValue={draft?.title || job.title || ""} className="h-11 rounded-xl border px-3" />
        <label className="text-sm" htmlFor="subjectId">Subject</label>
        <select id="subjectId" name="subjectId" defaultValue={job.subjectId || ""} className="h-11 rounded-xl border px-3">
          <option value="">Choose a subject</option>
          {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.classGrade?.shortName} · {subject.name}</option>)}
        </select>
        <label className="text-sm" htmlFor="year">Year</label>
        <input id="year" name="year" defaultValue={job.year || draft?.year || ""} inputMode="numeric" className="h-11 rounded-xl border px-3" />
        {draft ? <>
          <label className="text-sm" htmlFor="durationMinutes">Duration in minutes</label>
          <input id="durationMinutes" name="durationMinutes" type="number" min="1" max="1440" defaultValue={draft.durationMinutes ?? ""} className="h-11 rounded-xl border px-3" />
        </> : null}
        <button className="h-11 rounded-2xl border px-4">Save details</button>
      </form>

      {draft?.questions.map((question, index) => (
        <section key={`${question.number || "q"}-${index}`} className="rounded-2xl border bg-white p-4 space-y-3">
          <p className="text-sm text-muted-foreground">{question.number || index + 1} · {question.type}{question.page ? ` · page ${question.page}` : ""}</p>
          {question.issues.length ? <ul className="text-sm">{question.issues.map((issue) => <li key={issue}>{ISSUE[issue] || issue}</li>)}</ul> : null}
          {question.imagePage ? <p className="text-sm">Check the illustration on source page {question.imagePage}.</p> : null}
          <form action={correctQuestion} className="grid gap-2">
            <input type="hidden" name="jobId" value={job.id} />
            <input type="hidden" name="index" value={index} />
            <label className="text-sm" htmlFor={`prompt-${index}`}>Question</label>
            <textarea id={`prompt-${index}`} name="prompt" defaultValue={question.prompt} rows={3} className="rounded-xl border px-3 py-2" />
            <label className="text-sm" htmlFor={`points-${index}`}>Marks</label>
            <input id={`points-${index}`} name="points" defaultValue={question.points ?? ""} inputMode="decimal" className="h-11 rounded-xl border px-3" />
            {question.type !== "DIAGRAM_LABEL" ? (
              <>
                <label className="text-sm" htmlFor={`answer-${index}`}>Accepted answer</label>
                <input id={`answer-${index}`} name="correctAnswer" defaultValue={question.correctAnswer} className="h-11 rounded-xl border px-3" />
              </>
            ) : null}
            <label className="text-sm" htmlFor={`rubric-${index}`}>Marking guide</label>
            <textarea id={`rubric-${index}`} name="markingGuide" defaultValue={question.explanation || ""} rows={2} className="rounded-xl border px-3 py-2" />
            <button className="h-11 rounded-2xl border px-4">Save correction</button>
          </form>
          {question.type === "DIAGRAM_LABEL" ? (
            <form action={confirmDiagram} className="grid gap-2">
              <input type="hidden" name="jobId" value={job.id} />
              <input type="hidden" name="index" value={index} />
              {question.labels.map((label) => (
                <label key={label.id} className="text-sm">
                  {label.prompt} ({Math.round(label.x * 100)}%, {Math.round(label.y * 100)}%)
                  <input name={`accept-${label.id}`} defaultValue={label.accept} placeholder="Accepted label" className="mt-1 h-11 w-full rounded-xl border px-3" />
                </label>
              ))}
              <button className="h-11 rounded-2xl border px-4">Confirm labels</button>
            </form>
          ) : null}
        </section>
      ))}

      {draft && ["AWAITING_REVIEW", "NEEDS_CORRECTION"].includes(job.status) ? (
        <form action={approveDigitization}>
          <input type="hidden" name="jobId" value={job.id} />
          <button className="h-11 rounded-2xl bg-primary px-4 text-white" disabled={blocking.length > 0 || !job.subjectId}>Approve draft</button>
          {blocking.length ? <p className="mt-2 text-sm">Correct {ISSUE[blocking[0]] || blocking[0]} before approval. This does not publish the paper.</p> : null}
        </form>
      ) : null}
      {job.status === "APPROVED" ? (
        <form action={publishDigitization}>
          <input type="hidden" name="jobId" value={job.id} />
          <button className="h-11 rounded-2xl bg-primary px-4 text-white disabled:opacity-50" disabled={Boolean(job.importedSource && !job.importedSource.permission)}>Publish for learners</button>
        </form>
      ) : null}
      {job.status !== "PUBLISHED" && job.status !== "REJECTED" && job.status !== "CANCELLED" ? (
        <form action={rejectDigitization} className="grid gap-2">
          <input type="hidden" name="jobId" value={job.id} />
          <label className="text-sm" htmlFor="reason">Reject this paper</label>
          <input id="reason" name="reason" required placeholder="Why this paper is rejected" className="h-11 rounded-xl border px-3" />
          <button className="h-11 rounded-2xl border px-4">Reject</button>
        </form>
      ) : null}
      {job.events.length ? (
        <ol className="text-sm text-muted-foreground space-y-1">
          {job.events.map((event) => <li key={event.id}>{event.message}</li>)}
        </ol>
      ) : null}
    </div>
  );
}
