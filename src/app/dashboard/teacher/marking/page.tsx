import { db } from "@/lib/db";
import { requireUser, isAccreditedTeacher } from "@/lib/session";
import { markAnswerAsTeacher } from "@/app/actions/marking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default async function MarkingQueuePage() {
  const user = await requireUser();
  if (!isAccreditedTeacher(user) && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    return (
      <div className="rounded-[1.6rem] bg-white border p-8">
        <h1 className="font-display text-3xl">Marking is for accredited teachers</h1>
        <p className="text-muted-foreground mt-2">Submit the teacher form with your registration number first.</p>
        <Link href="/register/teacher" className="inline-block mt-4 font-bold text-primary">Go to the form</Link>
      </div>
    );
  }

  const answers = await db.answer.findMany({
    where: { gradingStatus: "PENDING_TEACHER" },
    include: {
      question: true,
      attempt: { include: { user: true, paper: { include: { subject: { include: { classGrade: true } } } } } },
    },
    orderBy: { createdAt: "asc" },
    take: 40,
  });

  return (
    <div className="space-y-5">
      <h1 className="font-display text-4xl">Marking queue</h1>
      <p className="text-muted-foreground">Award marks and write a short note. Learners see the feedback immediately.</p>
      {answers.length === 0 && <p className="rounded-[1.5rem] bg-white border p-6">No scripts waiting. Well done.</p>}
      {answers.map((answer) => (
        <article key={answer.id} className="rounded-[1.6rem] bg-white border p-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {answer.attempt.paper.subject.classGrade.shortName} · {answer.attempt.paper.subject.name} · {answer.attempt.user.name}
          </p>
          <p className="font-semibold">{answer.question.prompt}</p>
          {answer.question.markingGuide && (
            <p className="text-sm rounded-2xl bg-amber-50 px-3 py-2">Guide: {answer.question.markingGuide}</p>
          )}
          <p className="text-sm rounded-2xl bg-muted px-3 py-2">
            Answer: {answer.studentAnswer?.startsWith("data:image") ? "drawing on file" : answer.studentAnswer || "blank"}
          </p>
          {answer.studentAnswer?.startsWith("data:image") && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={answer.studentAnswer} alt="Learner drawing" className="max-h-56 rounded-2xl border" />
          )}
          <form action={markAnswerAsTeacher} className="grid sm:grid-cols-[120px_1fr_auto] gap-3 items-end">
            <input type="hidden" name="answerId" value={answer.id} />
            <div>
              <label className="text-xs font-bold">Marks / {answer.question.points}</label>
              <Input name="pointsAwarded" type="number" step="0.5" min="0" max={answer.question.points} className="rounded-2xl" required />
            </div>
            <Textarea name="feedback" placeholder="Feedback the learner will see" className="rounded-2xl min-h-16" />
            <Button className="rounded-2xl h-12">Save mark</Button>
          </form>
        </article>
      ))}
    </div>
  );
}
