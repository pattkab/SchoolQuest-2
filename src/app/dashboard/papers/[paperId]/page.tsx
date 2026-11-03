import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { canViewContent } from "@/lib/access";
import ExamPlayer from "./ExamPlayer";
import QuizGame from "./QuizGame";
import { shortSubjectName } from "@/lib/taxonomy";
import { toPublicQuestion } from "@/lib/public-question";
import { quizQuestions } from "@/lib/quiz-game";

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
  const publicQuestions = paper.questions.map(toPublicQuestion);
  if (paper.kind === "TOPIC_QUIZ") {
    return (
      <QuizGame
        paper={{
          id: paper.id,
          title: paper.title,
          subject: shortSubjectName(paper.subject.name),
          className: paper.subject.classGrade.shortName,
          backHref: `/dashboard/classes/${paper.subject.classGrade.slug}/${paper.subject.slug}`,
        }}
        questions={quizQuestions(publicQuestions)}
      />
    );
  }

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
      questions={publicQuestions}
    />
  );
}
