import Link from "next/link";
import { notFound } from "next/navigation";
import { practiceAccess } from "@/lib/freemium";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { canViewContent } from "@/lib/access";
import ExamPlayer from "./ExamPlayer";
import { shortSubjectName } from "@/lib/taxonomy";

function publicMatchOptions(correctAnswer: string, options: string | null) {
  try {
    const pairs = JSON.parse(correctAnswer);
    if (Array.isArray(pairs) && pairs.length && Array.isArray(pairs[0])) {
      const rights = Array.from(new Set(pairs.map((p: unknown[]) => String(p[1])))).sort();
      return JSON.stringify(pairs.map((p: unknown[]) => [String(p[0]), rights]));
    }
  } catch {
    return options;
  }
  return options;
}

export default async function PaperPage({ params }: { params: Promise<{ paperId: string }> }) {
  const user = await requireUser();
  const { paperId } = await params;
  const paper = await db.paper.findUnique({
    where: { id: paperId },
    include: {
      subject: { include: { classGrade: true } },
      topic: true,
      questions: { orderBy: { order: "asc" } },
    },
  });
  if (!paper || !canViewContent(user, paper)) notFound();
  const access = await practiceAccess(user.id, paper.subjectId);
  if (!access.allowed) return (
    <div className="mx-auto max-w-xl rounded-3xl border bg-white p-8 text-center space-y-4">
      <h1 className="font-display text-3xl">Free practice completed</h1>
      <p>You have used your free practice exam in {shortSubjectName(paper.subject.name)}. Unlock more practice exams with SchoolQuest Pro.</p>
      <Link href="/dashboard/subscribe" className="inline-flex rounded-2xl bg-primary px-6 py-3 font-bold text-white">Go Pro</Link>
    </div>
  );

  return (
    <ExamPlayer
      freeAttempt={!access.isPro}
      paper={{
        id: paper.id,
        title: paper.title,
        kind: paper.kind,
        subject: shortSubjectName(paper.subject.name),
        className: paper.subject.classGrade.shortName,
        topic: paper.topic?.name || null,
        backHref: `/dashboard/classes/${paper.subject.classGrade.slug}/${paper.subject.slug}`,
      }}
      questions={paper.questions.map((q) => ({
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        stimulus: q.stimulus,
        options: q.type === "MATCHING" ? publicMatchOptions(q.correctAnswer, q.options) : q.options,
        points: q.points,
      }))}
    />
  );
}
