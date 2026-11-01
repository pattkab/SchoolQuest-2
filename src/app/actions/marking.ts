"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { gradeDrawingAnswer, gradeOpenAnswer } from "@/lib/gemini";
import { markAnswer, OPEN_TYPES, type MarkableQuestion } from "@/lib/marking";
import { isAccreditedTeacher } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { hasProAccess, practiceAccess } from "@/lib/freemium";

function toMarkable(question: {
  id: string;
  type: string;
  prompt: string;
  options: string | null;
  correctAnswer: string;
  acceptedAnswers: string | null;
  markingGuide: string | null;
  explanation: string | null;
  numericTolerance: number | null;
  caseSensitive: boolean;
  requiresTeacher: boolean;
  points: number;
}): MarkableQuestion {
  return question;
}

export async function submitExam(payload: { paperId: string; answers: Record<string, string>; mode?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Please sign in to submit.");
  const userId: string = session.user.id;

  const paper = await db.paper.findUnique({ where: { id: payload.paperId }, select: { subjectId: true, status: true } });
  if (!paper || paper.status !== "PUBLISHED") throw new Error("This paper is unavailable.");
  const access = await practiceAccess(userId, paper.subjectId);
  if (!access.allowed) throw new Error("Your free practice for this subject is complete. Upgrade to Pro to continue.");
  const questions = await db.question.findMany({
    where: { paperId: payload.paperId },
    orderBy: { order: "asc" },
  });
  if (!questions.length) throw new Error("This paper has no questions.");

  const results: Array<{ questionId: string; studentAnswer: string; isCorrect: boolean | null; pointsAwarded: number | null; gradingStatus: string; feedback: string | null }> = [];
  let score = 0;
  let pendingCount = 0;
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);

  for (const question of questions) {
    const studentAnswer = payload.answers[question.id] ?? "";
    let marked = markAnswer(toMarkable(question), studentAnswer);
    let gradingStatus = marked.status === "AUTO" ? "AUTO" : marked.status === "UNANSWERED" ? "UNANSWERED" : "PENDING_TEACHER";
    let feedback = marked.feedback;
    let points = marked.points;
    let isCorrect = marked.isCorrect;

    const shouldAskAi =
      studentAnswer &&
      (OPEN_TYPES.has(question.type) || marked.status === "PENDING") &&
      !question.requiresTeacher &&
      marked.status !== "AUTO" &&
      marked.status !== "UNANSWERED";

    if (shouldAskAi) {
      try {
        const ai =
          question.type === "DRAWING"
            ? await gradeDrawingAnswer(question.prompt, studentAnswer, question.points)
            : await gradeOpenAnswer(
                question.prompt,
                studentAnswer,
                question.markingGuide || question.correctAnswer,
                question.points
              );
        if (ai.explanation && !ai.explanation.toLowerCase().includes("unable")) {
          points = ai.score;
          feedback = ai.explanation;
          isCorrect = ai.score >= question.points;
          gradingStatus = "AI";
          marked = { status: "AUTO", isCorrect, points, feedback };
        }
      } catch {
        gradingStatus = "PENDING_TEACHER";
      }
    }

    if (gradingStatus === "PENDING_TEACHER") pendingCount += 1;
    if (gradingStatus === "AUTO" || gradingStatus === "AI") score += points;

    results.push({
      questionId: question.id,
      studentAnswer,
      isCorrect,
      pointsAwarded: gradingStatus === "PENDING_TEACHER" ? null : points,
      gradingStatus,
      feedback,
    });
  }

  // Claim the one-free-per-subject entitlement in the SAME transaction as the
  // completed attempt. Unique(userId,subjectId) defeats concurrent submissions.
  // Historical completed attempts count, preventing retroactive free resets.
  let attempt;
  try {
    attempt = await db.$transaction(async (tx) => {
      const current = await tx.user.findUnique({ where: { id: userId }, select: { subscriptionEndsAt: true } });
      if (!current) throw new Error("Sign in again.");
      const pro = hasProAccess(current);
      if (!pro) {
        const historic = await tx.attempt.findFirst({
          where: { userId: userId, paper: { subjectId: paper.subjectId }, completedAt: { not: null } },
          select: { id: true },
        });
        if (historic) throw new Error("Free practice already used in this subject. Upgrade to Pro.");
        await tx.freeSubjectClaim.create({ data: { userId: userId, subjectId: paper.subjectId } });
      }
      const saved = await tx.attempt.create({
        data: {
          userId: userId,
          paperId: payload.paperId,
          mode: payload.mode || "PRACTICE",
          status: pendingCount ? "NEEDS_REVIEW" : "GRADED",
          score,
          maxScore,
          pendingCount,
          completedAt: new Date(),
          gradedAt: pendingCount ? null : new Date(),
          answers: { create: results },
        },
        include: {
          answers: { include: { question: true } },
          paper: { include: { subject: { include: { classGrade: true } } } },
        },
      });
      if (!pro) await tx.freeSubjectClaim.update({
        where: { userId_subjectId: { userId: userId, subjectId: paper.subjectId } },
        data: { attemptId: saved.id },
      });
      await tx.user.update({
        where: { id: userId },
        data: { xp: { increment: Math.round(score * 4) }, lastActiveOn: new Date() },
      });
      return saved;
    });
  } catch (error) {
    if (error instanceof Error && /[Uu]nique constraint|P2002/.test(error.message)) {
      throw new Error("Your free practice for this subject has already been used. Upgrade to Pro.");
    }
    throw error;
  }

  return {
    attemptId: attempt.id,
    score,
    maxScore,
    pendingCount,
    totalQuestions: questions.length,
    answers: attempt.answers,
  };
}

export async function markAnswerAsTeacher(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { teacherProfile: true },
  });
  if (!user || !isAccreditedTeacher(user)) throw new Error("Only an accredited teacher can mark this work.");

  const answerId = String(formData.get("answerId") || "");
  const pointsAwarded = Number(formData.get("pointsAwarded") || 0);
  const feedback = String(formData.get("feedback") || "").trim();
  const teacherNote = String(formData.get("teacherNote") || "").trim();

  const answer = await db.answer.findUnique({
    where: { id: answerId },
    include: { question: true, attempt: true },
  });
  if (!answer) throw new Error("Answer not found");

  const awarded = Math.max(0, Math.min(answer.question.points, pointsAwarded));
  await db.answer.update({
    where: { id: answerId },
    data: {
      pointsAwarded: awarded,
      isCorrect: awarded >= answer.question.points,
      gradingStatus: "TEACHER_MARKED",
      feedback: feedback || `Marked by ${user.name || "your teacher"}.`,
      teacherNote: teacherNote || null,
      markedById: user.id,
      markedAt: new Date(),
    },
  });

  const answers = await db.answer.findMany({ where: { attemptId: answer.attemptId } });
  const pendingCount = answers.filter((a) => a.gradingStatus === "PENDING_TEACHER").length;
  const score = answers.reduce((sum, a) => sum + (a.pointsAwarded || 0), 0);
  await db.attempt.update({
    where: { id: answer.attemptId },
    data: {
      score,
      pendingCount,
      status: pendingCount ? "NEEDS_REVIEW" : "GRADED",
      gradedAt: pendingCount ? null : new Date(),
    },
  });

  revalidatePath("/dashboard/teacher");
  revalidatePath("/dashboard/teacher/marking");
  revalidatePath(`/dashboard/attempts/${answer.attemptId}`);
}

export async function joinClassroomAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Sign in first");
  const code = String(formData.get("code") || "").trim().toUpperCase();
  const room = await db.classroom.findUnique({ where: { code } });
  if (!room) throw new Error("Classroom code not found");
  await db.enrollment.upsert({
    where: { classroomId_userId: { classroomId: room.id, userId: session.user.id } },
    update: {},
    create: { classroomId: room.id, userId: session.user.id },
  });
  revalidatePath("/dashboard");
}

export async function createClassroomAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { teacherProfile: true },
  });
  if (!user || !isAccreditedTeacher(user)) throw new Error("Only accredited teachers can open a classroom.");

  const name = String(formData.get("name") || "").trim();
  const classGradeId = String(formData.get("classGradeId") || "");
  const description = String(formData.get("description") || "").trim();
  if (!name || !classGradeId) throw new Error("Name and class are required.");
  const code = `SQ-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(Math.random() * 90 + 10)}`;
  await db.classroom.create({
    data: { name, code, description: description || null, teacherId: user.id, classGradeId },
  });
  revalidatePath("/dashboard/teacher");
}

export async function reviewTeacherAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const admin = await db.user.findUnique({ where: { id: session.user.id } });
  if (!admin || (admin.role !== "ADMIN" && admin.role !== "SUPER_ADMIN")) throw new Error("Admin only");

  const profileId = String(formData.get("profileId") || "");
  const status = String(formData.get("status") || "");
  const reviewNote = String(formData.get("reviewNote") || "");
  if (!["ACCREDITED", "REJECTED", "SUSPENDED"].includes(status)) throw new Error("Invalid status");

  await db.teacherProfile.update({
    where: { id: profileId },
    data: { status, reviewNote: reviewNote || null, reviewedById: admin.id, reviewedAt: new Date() },
  });
  revalidatePath("/dashboard/admin/teachers");
}

export async function syncLibraryAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const { syncFeeds } = await import("@/lib/fresh-teacher");
  const classKey = String(formData.get("classKey") || "") || undefined;
  await syncFeeds({ classKey, triggeredById: session.user.id });
  revalidatePath("/dashboard/admin/library");
  revalidatePath("/dashboard/library");
}
