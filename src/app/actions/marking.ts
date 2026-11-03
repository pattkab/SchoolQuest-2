"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { canReviewLearner, canViewContent } from "@/lib/access";
import { isAccreditedTeacher } from "@/lib/session";
import { finalizeExam, openExamAttempt, pauseExamAttempt, readExamClock, regradeFinalizedAttempt, resumeExamAttempt, saveExamAnswers } from "@/lib/exam-attempts";
import { offlineExpiry, signOfflinePass } from "@/lib/offline-pass";
import { toPublicQuestion } from "@/lib/public-question";
import { shortSubjectName } from "@/lib/taxonomy";
import { revalidatePath } from "next/cache";

async function signedIn() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Please sign in to submit.");
  return session.user.id;
}

export async function startOrResumeExam(paperId: string) {
  return openExamAttempt(await signedIn(), paperId);
}

export async function saveExamProgress(payload: { attemptId: string; writes: { questionId: string; value: string; version: number }[] }) {
  return saveExamAnswers(await signedIn(), payload.attemptId, payload.writes);
}

export async function examClock(attemptId: string) {
  return readExamClock(await signedIn(), attemptId);
}

export async function pauseExam(attemptId: string) {
  return pauseExamAttempt(await signedIn(), attemptId);
}

export async function resumeExam(attemptId: string) {
  return resumeExamAttempt(await signedIn(), attemptId);
}

export async function downloadExamPack(paperId: string) {
  const userId = await signedIn();
  const user = await db.user.findUnique({ where: { id: userId } });
  const paper = await db.paper.findUnique({
    where: { id: paperId },
    include: { subject: { include: { classGrade: true } }, topic: true, questions: { orderBy: { order: "asc" } } },
  });
  if (!user || !paper || !canViewContent(user, paper)) throw new Error("This paper is not available.");
  const started = await db.attempt.findFirst({ where: { userId, paperId, status: "IN_PROGRESS", finalizedAt: null }, select: { id: true } });
  const { hasPremium } = await import("@/lib/entitlements");
  const staff = user.role === "TEACHER" || user.role === "SCHOOL_ADMIN" || user.role === "ADMIN" || user.role === "SUPER_ADMIN";
  if (!staff && !started && !(await hasPremium(userId))) throw new Error("Start the exam before saving it offline. Opening the list does not use the free exam.");
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Offline save is not configured.");
  const version = paper.updatedAt.toISOString();
  return {
    version,
    pass: signOfflinePass({ userId, paperId, version, expiresAt: offlineExpiry(new Date()).toISOString() }, secret),
    paper: {
      id: paper.id,
      title: paper.title,
      kind: paper.kind,
      subject: shortSubjectName(paper.subject.name),
      className: paper.subject.classGrade.shortName,
      topic: paper.topic?.name || null,
      durationMinutes: paper.durationMinutes,
      backHref: `/dashboard/classes/${paper.subject.classGrade.slug}/${paper.subject.slug}`,
    },
    questions: paper.questions.map(toPublicQuestion),
  };
}

export async function submitExam(payload: { paperId: string; answers: Record<string, string>; versions?: Record<string, number>; attemptId?: string; mode?: string }) {
  const userId = await signedIn();
  const paper = await db.paper.findUnique({ where: { id: payload.paperId }, select: { status: true } });
  if (!paper || paper.status !== "PUBLISHED") throw new Error("This paper is not published.");
  const attemptId = payload.attemptId || (await openExamAttempt(userId, payload.paperId)).attemptId;
  const incoming = payload.versions
    ? Object.fromEntries(Object.entries(payload.answers).map(([questionId, value]) => [questionId, { value, version: payload.versions?.[questionId] ?? 0 }]))
    : {};
  const result = await finalizeExam(userId, attemptId, incoming, payload.answers);
  return { ...result, answers: [] as [] };
}

export async function regradeAttempt(attemptId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const user = await db.user.findUnique({ where: { id: session.user.id }, include: { teacherProfile: true } });
  if (!user || !isAccreditedTeacher(user)) throw new Error("Only an accredited teacher can regrade.");
  const attempt = await db.attempt.findUnique({ where: { id: attemptId } });
  if (!attempt || !(await canReviewLearner(user, attempt.userId))) throw new Error("This learner is outside your classes.");
  await regradeFinalizedAttempt(attemptId);
  revalidatePath(`/dashboard/attempts/${attemptId}`);
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
  if (!(await canReviewLearner(user, answer.attempt.userId))) throw new Error("This learner is outside your classes.");

  const awarded = Math.max(0, Math.min(answer.question.points, pointsAwarded));
  if (!feedback) throw new Error("Write the reason for this mark.");
  await db.markOverride.create({
    data: { answerId, actorId: user.id, previousPoints: answer.pointsAwarded, points: awarded, reason: feedback },
  });
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
  const pendingCount = answers.filter((a) => a.gradingStatus === "PENDING_TEACHER" || a.gradingStatus === "AI").length;
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
  const admin = await db.user.findUnique({ where: { id: session.user.id } });
  if (!admin || (admin.role !== "ADMIN" && admin.role !== "SUPER_ADMIN")) throw new Error("Admin only");
  const { syncFeeds } = await import("@/lib/fresh-teacher");
  const classKey = String(formData.get("classKey") || "") || undefined;
  await syncFeeds({ classKey, triggeredById: session.user.id });
  revalidatePath("/dashboard/admin/library");
  revalidatePath("/dashboard/library");
}
