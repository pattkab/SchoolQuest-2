import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { canViewContent } from "@/lib/access";
import ExamPlayer from "./ExamPlayer";
import { shortSubjectName } from "@/lib/taxonomy";
import { publicDiagramTargets } from "@/lib/exam-session";

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

  return (
    <ExamPlayer
      paper={{
        id: paper.id,
        title: paper.title,
        kind: paper.kind,
        subject: shortSubjectName(paper.subject.name),
        className: paper.subject.classGrade.shortName,
        topic: paper.topic?.name || null,
        durationMinutes: paper.durationMinutes,
        backHref: `/dashboard/classes/${paper.subject.classGrade.slug}/${paper.subject.slug}`,
      }}
      questions={paper.questions.map((q) => ({
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        stimulus: q.stimulus,
        imageUrl: q.imageUrl,
        displayNumber: q.displayNumber,
        unit: q.unit,
        options: q.type === "MATCHING" ? publicMatchOptions(q.correctAnswer, q.options) : q.options,
        labelTargets: q.type === "DIAGRAM_LABEL" ? publicDiagramTargets(q.correctAnswer) : [],
        points: q.points,
      }))}
    />
  );
}
