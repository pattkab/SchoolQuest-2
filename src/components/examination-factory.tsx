import { readFile } from "node:fs/promises";
import path from "node:path";
import { queueFreshTeacherAction } from "@/app/dashboard/teacher/digitization/queue-action";
import { FACTORY_CLASSES, FACTORY_SUBJECTS } from "@/lib/fresh-teacher-catalog";

type Summary = {
  revision: string;
  documents: number;
  paths: number;
  byKind: { paper: number; guide: number; notes: number; other: number };
  byClass: Record<string, { paper: number; guide: number; notes: number; other: number }>;
};

async function loadSummary(): Promise<Summary | null> {
  try {
    return JSON.parse(await readFile(path.join(process.cwd(), "data", "fresh-teacher", "summary.json"), "utf8")) as Summary;
  } catch {
    return null;
  }
}

export async function ExaminationFactory({ queued = 0 }: { queued?: number }) {
  const summary = await loadSummary();
  const classes = FACTORY_CLASSES.filter(([slug]) => (summary?.byClass[slug]?.paper || 0) > 0);
  return (
    <section className="rounded-3xl border bg-white p-4 sm:p-5 space-y-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Examination Factory</p>
        <h2 className="font-display text-2xl mt-1">Fresh Teacher papers</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {summary
            ? `${summary.documents.toLocaleString()} unique files from ${summary.paths.toLocaleString()} paths. ${summary.byKind.paper.toLocaleString()} look like exams, ${summary.byKind.guide.toLocaleString()} like marking guides, and ${summary.byKind.notes.toLocaleString()} like notes.`
            : "The Fresh Teacher inventory summary is not on this computer yet."}
        </p>
        <p className="text-sm text-muted-foreground mt-1">Past papers, holiday packages, and exams are stored on this computer. Their marking schemes are saved beside them and mark learner answers. Live AI marking stays off unless SCHOOLQUEST_LIVE_AI_MARKING is turned on.</p>
      </div>
      {queued > 0 && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">{queued} {queued === 1 ? "file is" : "files are"} queued for reading. Learners cannot see them yet.</p>}
      {summary && (
        <form action={queueFreshTeacherAction} className="grid gap-3 sm:grid-cols-4">
          <label className="text-sm font-bold">Class
            <select name="classSlug" defaultValue="p7" className="mt-1 h-12 w-full rounded-2xl border px-3 font-normal">
              {classes.map(([slug, label]) => <option key={slug} value={slug}>{label} · {summary.byClass[slug]?.paper.toLocaleString()} papers</option>)}
            </select>
          </label>
          <label className="text-sm font-bold">Subject
            <select name="subjectSlug" defaultValue="science" className="mt-1 h-12 w-full rounded-2xl border px-3 font-normal">
              {FACTORY_SUBJECTS.map(([slug, label]) => <option key={slug} value={slug}>{label}</option>)}
            </select>
          </label>
          <label className="text-sm font-bold">Read
            <select name="kind" defaultValue="paper" className="mt-1 h-12 w-full rounded-2xl border px-3 font-normal">
              <option value="paper">Exam papers</option>
              <option value="guide">Marking guides</option>
              <option value="notes">Notes</option>
            </select>
          </label>
          <label className="text-sm font-bold">How many
            <select name="limit" defaultValue="3" className="mt-1 h-12 w-full rounded-2xl border px-3 font-normal">
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="5">5</option>
            </select>
          </label>
          <button type="submit" className="sm:col-span-4 h-12 rounded-2xl bg-primary font-bold text-white">Queue the next files</button>
        </form>
      )}
    </section>
  );
}
