import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { canReviewLearner } from "@/lib/access";
import { questionTypeLabel } from "@/lib/marking";

export default async function AttemptPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const user = await requireUser();
  const { attemptId } = await params;
  const attempt = await db.attempt.findUnique({
    where: { id: attemptId },
    include: {
      paper: { include: { subject: { include: { classGrade: true } } } },
      answers: { include: { question: true }, orderBy: { createdAt: "asc" } },
    },
  });
  if (!attempt) notFound();
  if (attempt.userId !== user.id && !(await canReviewLearner(user, attempt.userId))) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Link href={`/dashboard/papers/${attempt.paperId}`} className="text-sm font-bold text-primary">← Practice again</Link>
      <header className="rounded-[1.8rem] bg-white border p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {attempt.paper.subject.classGrade.shortName} · {attempt.paper.subject.name}
        </p>
        <h1 className="font-display text-4xl mt-1">{attempt.paper.title}</h1>
        <p className="mt-2 font-bold text-primary text-xl">
          {attempt.score} / {attempt.maxScore}
          {attempt.pendingCount ? ` · ${attempt.pendingCount} awaiting teacher` : ""}
        </p>
      </header>
      {attempt.answers.map((answer, i) => (
        <article key={answer.id} className="rounded-[1.6rem] bg-white border p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Q{i + 1} · {questionTypeLabel(answer.question.type)} · {answer.gradingStatus.replaceAll("_", " ")}
          </p>
          <p className="font-semibold mt-2">{answer.question.prompt}</p>
          <p className="mt-3 rounded-2xl bg-muted px-3 py-2 text-sm">
            Your answer: {answer.studentAnswer?.startsWith("data:image") ? "drawing submitted" : answer.studentAnswer || "—"}
          </p>
          <p className="mt-2 text-sm">
            Marks: {answer.pointsAwarded ?? "pending"} / {answer.question.points}
          </p>
          {answer.feedback && <p className="mt-2 text-sm text-muted-foreground">{answer.feedback}</p>}
        </article>
      ))}
    </div>
  );
}
