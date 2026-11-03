import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { gradeDrawingAnswer, gradeOpenAnswer } from "@/lib/gemini";
import { isDrawingDescription } from "@/lib/accessibility-settings";
import { markAnswer, OPEN_TYPES, type MarkableQuestion } from "@/lib/marking";
import {
  answerWriteDecision,
  canMutateAttempt,
  examDeadline,
  examMinutes,
  isPastDeadline,
  mergeAttemptAnswers,
  pausedRemaining,
  remainingMs,
  resumedDeadline,
  type VersionedAnswer,
} from "@/lib/exam-session";
import { FREE_EXAM_USED, hasPremium } from "@/lib/entitlements";

const STAFF = new Set(["TEACHER", "SCHOOL_ADMIN", "ADMIN", "SUPER_ADMIN"]);

export type ExamResult = {
  attemptId: string;
  score: number;
  maxScore: number;
  pendingCount: number;
  totalQuestions: number;
};

export type ExamSession = {
  attemptId: string;
  finalized: boolean;
  serverNow: string;
  deadlineAt: string | null;
  remainingMs: number | null;
  paused: boolean;
  answers: Record<string, string>;
  versions: Record<string, number>;
  result: ExamResult | null;
};

type AttemptRow = {
  id: string;
  userId: string;
  paperId: string;
  status: string;
  finalizedAt: Date | null;
  deadlineAt: Date | null;
  pausedAt: Date | null;
  timerRemainingMs: number | null;
  durationMs: number | null;
  startedAt: Date;
  score: number;
  maxScore: number;
  pendingCount: number;
};

function clock(attempt: { deadlineAt: Date | null; pausedAt?: Date | null; timerRemainingMs?: number | null }, now = new Date()) {
  if (attempt.pausedAt) {
    return {
      serverNow: now.toISOString(),
      deadlineAt: null,
      remainingMs: Math.max(0, attempt.timerRemainingMs ?? 0),
      paused: true,
    };
  }
  return {
    serverNow: now.toISOString(),
    deadlineAt: attempt.deadlineAt?.toISOString() ?? null,
    remainingMs: remainingMs(attempt.deadlineAt, now),
    paused: false,
  };
}

async function logProgress(attemptId: string, kind: string, message: string) {
  await db.attemptLog.create({ data: { attemptId, kind, message } });
}

function activeSeconds(attempt: { startedAt: Date; durationMs: number | null; pausedAt: Date | null; timerRemainingMs: number | null; deadlineAt: Date | null }, now: Date) {
  if (!attempt.durationMs) return Math.max(0, Math.round((now.getTime() - attempt.startedAt.getTime()) / 1000));
  const remaining = attempt.pausedAt
    ? attempt.timerRemainingMs ?? 0
    : pausedRemaining(attempt.deadlineAt, now, attempt.timerRemainingMs ?? attempt.durationMs);
  return Math.max(0, Math.round((attempt.durationMs - remaining) / 1000));
}

async function loadResult(attemptId: string): Promise<ExamResult> {
  const attempt = await db.attempt.findUniqueOrThrow({
    where: { id: attemptId },
    include: { _count: { select: { answers: true } } },
  });
  return {
    attemptId: attempt.id,
    score: attempt.score,
    maxScore: attempt.maxScore,
    pendingCount: attempt.pendingCount,
    totalQuestions: attempt._count.answers,
  };
}

function sessionFrom(attempt: AttemptRow, answers: { questionId: string; studentAnswer: string | null; version: number; gradingStatus: string }[], result: ExamResult | null): ExamSession {
  const saved: Record<string, string> = {};
  const versions: Record<string, number> = {};
  for (const answer of answers) {
    if (answer.gradingStatus === "DRAFT" || answer.studentAnswer) {
      saved[answer.questionId] = answer.studentAnswer || "";
      versions[answer.questionId] = answer.version;
    }
  }
  return { attemptId: attempt.id, finalized: !canMutateAttempt(attempt.status, attempt.finalizedAt), ...clock(attempt), answers: saved, versions, result };
}

async function ownedAttempt(userId: string, attemptId: string) {
  const attempt = await db.attempt.findFirst({ where: { id: attemptId, userId } });
  if (!attempt) throw new Error("This examination could not be found.");
  return attempt;
}

function accessFailure(error: unknown) {
  if (error instanceof Error && error.message === FREE_EXAM_USED) return error;
  if (typeof error === "object" && error && "code" in error && (error as { code?: string }).code === "P2002") return new Error(FREE_EXAM_USED);
  return null;
}

export async function openExamAttempt(userId: string, paperId: string): Promise<ExamSession> {
  const paper = await db.paper.findUnique({ where: { id: paperId }, select: { status: true, durationMinutes: true, subjectId: true } });
  if (!paper || paper.status !== "PUBLISHED") throw new Error("This paper is not published.");
  const learner = await db.user.findUnique({ where: { id: userId }, select: { role: true } });
  const staff = Boolean(learner && STAFF.has(learner.role));

  const open = await db.$transaction(async (tx) => {
    const existing = await tx.attempt.findFirst({
      where: { userId, paperId, status: "IN_PROGRESS", finalizedAt: null },
      orderBy: { startedAt: "desc" },
    });
    if (existing) return existing;
    const premium = staff ? true : await hasPremium(userId, new Date(), tx);
    if (!premium) {
      const grant = await tx.freeExamGrant.findUnique({ where: { userId_subjectId: { userId, subjectId: paper.subjectId } } });
      if (grant) throw new Error(FREE_EXAM_USED);
    }
    const startedAt = new Date();
    const minutes = examMinutes(paper.durationMinutes);
    const attempt = await tx.attempt.create({
      data: {
        userId,
        paperId,
        status: "IN_PROGRESS",
        mode: "EXAM",
        startedAt,
        durationMs: minutes * 60_000,
        deadlineAt: examDeadline(startedAt, minutes),
      },
    });
    if (!premium) await tx.freeExamGrant.create({ data: { userId, subjectId: paper.subjectId, attemptId: attempt.id } });
    return attempt;
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }).catch(async (error) => {
    const denied = accessFailure(error);
    if (denied) throw denied;
    const existing = await db.attempt.findFirst({ where: { userId, paperId, status: "IN_PROGRESS", finalizedAt: null }, orderBy: { startedAt: "desc" } });
    if (!existing) throw error instanceof Error ? error : new Error("The examination could not be started.");
    return existing;
  });

  if (!open.deadlineAt && !open.pausedAt) {
    const minutes = examMinutes(paper.durationMinutes);
    const startedAt = new Date();
    const deadlineAt = examDeadline(startedAt, minutes);
    await db.attempt.update({
      where: { id: open.id },
      data: { durationMs: open.durationMs || minutes * 60_000, deadlineAt, mode: "EXAM" },
    });
    open.deadlineAt = deadlineAt;
    open.durationMs = open.durationMs || minutes * 60_000;
  }
  if (!open.pausedAt && isPastDeadline(open.deadlineAt, new Date())) {
    const result = await finalizeExam(userId, open.id, {}, {});
    const answers = await db.answer.findMany({ where: { attemptId: open.id }, select: { questionId: true, studentAnswer: true, version: true, gradingStatus: true } });
    const fresh = await ownedAttempt(userId, open.id);
    return sessionFrom(fresh, answers, result);
  }
  const answers = await db.answer.findMany({ where: { attemptId: open.id }, select: { questionId: true, studentAnswer: true, version: true, gradingStatus: true } });
  const started = await db.attemptLog.findFirst({ where: { attemptId: open.id, kind: "STARTED" }, select: { id: true } });
  if (!started) await logProgress(open.id, "STARTED", `Timed exam started. ${examMinutes(paper.durationMinutes)} minutes.`);
  return sessionFrom(open, answers, null);
}

export async function openQuizAttempt(userId: string, paperId: string) {
  const paper = await db.paper.findUnique({ where: { id: paperId }, select: { status: true, kind: true } });
  if (!paper || paper.status !== "PUBLISHED") throw new Error("This quiz is not published.");
  if (paper.kind !== "TOPIC_QUIZ") throw new Error("Open this paper as an exam.");
  let attempt = await db.attempt.findFirst({
    where: { userId, paperId, status: "IN_PROGRESS", finalizedAt: null, mode: "PRACTICE" },
    orderBy: { startedAt: "desc" },
  });
  if (!attempt) {
    attempt = await db.attempt.create({
      data: { userId, paperId, status: "IN_PROGRESS", mode: "PRACTICE", startedAt: new Date() },
    });
    await logProgress(attempt.id, "STARTED", "Short quiz started.");
  }
  const answers = await db.answer.findMany({ where: { attemptId: attempt.id }, select: { questionId: true } });
  return { attemptId: attempt.id, answered: answers.map((answer) => answer.questionId) };
}

export async function answerQuizQuestion(userId: string, attemptId: string, questionId: string, value: string) {
  const attempt = await ownedAttempt(userId, attemptId);
  if (attempt.mode !== "PRACTICE") throw new Error("This is an exam, not a quiz.");
  if (!canMutateAttempt(attempt.status, attempt.finalizedAt)) throw new Error("This quiz is already finished.");
  const question = await db.question.findFirst({ where: { id: questionId, paperId: attempt.paperId } });
  if (!question) throw new Error("This question is not in the quiz.");
  const marked = markAnswer(question, value);
  const gradingStatus = marked.status === "AUTO" ? "AUTO" : marked.status === "UNANSWERED" ? "UNANSWERED" : "PENDING_TEACHER";
  await db.answer.upsert({
    where: { attemptId_questionId: { attemptId, questionId } },
    create: {
      attemptId,
      questionId,
      studentAnswer: value,
      isCorrect: marked.isCorrect,
      pointsAwarded: gradingStatus === "PENDING_TEACHER" ? null : marked.points,
      gradingStatus,
      feedback: marked.feedback,
    },
    update: {
      studentAnswer: value,
      isCorrect: marked.isCorrect,
      pointsAwarded: gradingStatus === "PENDING_TEACHER" ? null : marked.points,
      gradingStatus,
      feedback: marked.feedback,
    },
  });
  return { correct: marked.isCorrect, points: marked.points, feedback: marked.feedback, pending: gradingStatus === "PENDING_TEACHER" };
}

export async function finishQuiz(userId: string, attemptId: string): Promise<ExamResult> {
  const attempt = await ownedAttempt(userId, attemptId);
  if (attempt.mode !== "PRACTICE") throw new Error("This is an exam, not a quiz.");
  if (!canMutateAttempt(attempt.status, attempt.finalizedAt)) return loadResult(attempt.id);
  const answers = await db.answer.findMany({ where: { attemptId }, include: { question: true } });
  const score = answers.reduce((sum, answer) => sum + (answer.pointsAwarded || 0), 0);
  const maxScore = answers.reduce((sum, answer) => sum + answer.question.points, 0);
  const pendingCount = answers.filter((answer) => answer.gradingStatus === "PENDING_TEACHER").length;
  const now = new Date();
  await db.attempt.update({
    where: { id: attempt.id },
    data: {
      score,
      maxScore,
      pendingCount,
      status: pendingCount ? "NEEDS_REVIEW" : "GRADED",
      completedAt: now,
      finalizedAt: now,
      gradedAt: pendingCount ? null : now,
      timeSpentSeconds: activeSeconds(attempt, now),
    },
  });
  await logProgress(attempt.id, "SUBMITTED", "Short quiz finished.");
  await db.user.update({ where: { id: userId }, data: { xp: { increment: Math.round(score * 4) }, lastActiveOn: now } });
  return { attemptId, score, maxScore, pendingCount, totalQuestions: answers.length };
}

export async function pauseExamAttempt(userId: string, attemptId: string) {
  const attempt = await ownedAttempt(userId, attemptId);
  if (!canMutateAttempt(attempt.status, attempt.finalizedAt)) throw new Error("This examination is already submitted.");
  if (attempt.pausedAt) {
    const answers = await db.answer.findMany({ where: { attemptId }, select: { questionId: true, studentAnswer: true, version: true, gradingStatus: true } });
    return sessionFrom(attempt, answers, null);
  }
  const now = new Date();
  const remaining = pausedRemaining(attempt.deadlineAt, now, attempt.timerRemainingMs ?? attempt.durationMs ?? 0);
  const paused = await db.attempt.update({
    where: { id: attempt.id },
    data: { pausedAt: now, timerRemainingMs: remaining, deadlineAt: null, timeSpentSeconds: activeSeconds({ ...attempt, pausedAt: now, timerRemainingMs: remaining }, now) },
  });
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  await logProgress(attempt.id, "PAUSED", `Paused with ${minutes}:${String(seconds).padStart(2, "0")} left. Answers stay saved.`);
  const answers = await db.answer.findMany({ where: { attemptId }, select: { questionId: true, studentAnswer: true, version: true, gradingStatus: true } });
  return sessionFrom(paused, answers, null);
}

export async function resumeExamAttempt(userId: string, attemptId: string) {
  const attempt = await ownedAttempt(userId, attemptId);
  if (!canMutateAttempt(attempt.status, attempt.finalizedAt)) throw new Error("This examination is already submitted.");
  if (!attempt.pausedAt) {
    const answers = await db.answer.findMany({ where: { attemptId }, select: { questionId: true, studentAnswer: true, version: true, gradingStatus: true } });
    return sessionFrom(attempt, answers, null);
  }
  const now = new Date();
  const remaining = Math.max(0, attempt.timerRemainingMs ?? 0);
  if (remaining <= 0) {
    const result = await finalizeExam(userId, attempt.id, {}, {});
    const answers = await db.answer.findMany({ where: { attemptId }, select: { questionId: true, studentAnswer: true, version: true, gradingStatus: true } });
    const fresh = await ownedAttempt(userId, attempt.id);
    return sessionFrom(fresh, answers, result);
  }
  const deadlineAt = resumedDeadline(remaining, now);
  const resumed = await db.attempt.update({
    where: { id: attempt.id },
    data: { pausedAt: null, deadlineAt, timerRemainingMs: remaining },
  });
  await logProgress(attempt.id, "RESUMED", "Timer resumed.");
  const answers = await db.answer.findMany({ where: { attemptId }, select: { questionId: true, studentAnswer: true, version: true, gradingStatus: true } });
  return sessionFrom(resumed, answers, null);
}

async function applyWrites(attemptId: string, writes: { questionId: string; value: string; version: number }[]) {
  const stale: string[] = [];
  const versions: Record<string, number> = {};
  for (const write of writes) {
    const row = await db.answer.findUnique({ where: { attemptId_questionId: { attemptId, questionId: write.questionId } } });
    const stored = row?.version ?? 0;
    if (answerWriteDecision(stored, write.version) === "stale") {
      stale.push(write.questionId);
      if (row) versions[write.questionId] = row.version;
      continue;
    }
    if (!row) {
      const created = await db.answer.create({
        data: { attemptId, questionId: write.questionId, studentAnswer: write.value, version: 1, gradingStatus: "DRAFT" },
      });
      versions[write.questionId] = created.version;
      continue;
    }
    const updated = await db.answer.updateMany({
      where: { id: row.id, version: write.version },
      data: { studentAnswer: write.value, version: { increment: 1 }, gradingStatus: "DRAFT" },
    });
    const fresh = await db.answer.findUnique({ where: { id: row.id }, select: { version: true } });
    if (updated.count === 0) stale.push(write.questionId);
    if (fresh) versions[write.questionId] = fresh.version;
  }
  return { stale, versions };
}

export async function saveExamAnswers(
  userId: string,
  attemptId: string,
  writes: { questionId: string; value: string; version: number }[],
) {
  const attempt = await ownedAttempt(userId, attemptId);
  if (!canMutateAttempt(attempt.status, attempt.finalizedAt)) {
    return { saved: false, expired: true, stale: [] as string[], versions: {}, ...clock(attempt), result: await loadResult(attempt.id) };
  }
  if (!attempt.pausedAt && isPastDeadline(attempt.deadlineAt, new Date())) {
    const result = await finalizeExam(userId, attempt.id, {}, {});
    return { saved: false, expired: true, stale: [] as string[], versions: {}, ...clock(attempt, new Date()), remainingMs: 0, result };
  }
  const applied = await applyWrites(attempt.id, writes);
  const recent = await db.attemptLog.findFirst({ where: { attemptId, kind: "SAVED", createdAt: { gte: new Date(Date.now() - 60_000) } }, select: { id: true } });
  if (!recent && writes.length) await logProgress(attempt.id, "SAVED", "Progress saved.");
  return { saved: true, expired: false, ...applied, ...clock(attempt, new Date()), result: null };
}

export async function readExamClock(userId: string, attemptId: string) {
  const attempt = await ownedAttempt(userId, attemptId);
  if (canMutateAttempt(attempt.status, attempt.finalizedAt) && !attempt.pausedAt && isPastDeadline(attempt.deadlineAt, new Date())) {
    const result = await finalizeExam(userId, attempt.id, {}, {});
    return { expired: true, ...clock(attempt, new Date()), remainingMs: 0, result };
  }
  return { expired: !canMutateAttempt(attempt.status, attempt.finalizedAt), ...clock(attempt), result: null };
}

async function gradeAnswers(questions: MarkableQuestion[], answers: Record<string, string>) {
  const results = [];
  let score = 0;
  let pendingCount = 0;
  for (const question of questions) {
    const studentAnswer = answers[question.id] ?? "";
    const marked = markAnswer(question, studentAnswer);
    let gradingStatus = marked.status === "AUTO" ? "AUTO" : marked.status === "UNANSWERED" ? "UNANSWERED" : "PENDING_TEACHER";
    let feedback = marked.feedback;
    let points = marked.points;
    let isCorrect = marked.isCorrect;
    const shouldAskAi =
      process.env.SCHOOLQUEST_LIVE_AI_MARKING === "true" &&
      Boolean(studentAnswer) &&
      !isDrawingDescription(question.type, studentAnswer) &&
      (OPEN_TYPES.has(question.type) || marked.status === "PENDING") &&
      !question.requiresTeacher &&
      marked.status !== "AUTO" &&
      marked.status !== "UNANSWERED";
    if (shouldAskAi) {
      try {
        const ai = question.type === "DRAWING"
          ? await gradeDrawingAnswer(question.prompt, studentAnswer, question.points)
          : await gradeOpenAnswer(question.prompt, studentAnswer, question.markingGuide || question.correctAnswer, question.points);
        if (Number.isFinite(ai.score) && typeof ai.explanation === "string" && ai.explanation && !ai.explanation.toLowerCase().includes("unable")) {
          const suggested = Math.max(0, Math.min(question.points, ai.score));
          const uncertain = ai.needsReview === true || (typeof ai.confidence === "number" && ai.confidence < 0.6);
          if (uncertain) {
            feedback = `A teacher needs to confirm this answer. Suggested mark ${suggested} of ${question.points}. ${ai.explanation}`;
            gradingStatus = "PENDING_TEACHER";
            points = 0;
            isCorrect = null;
          } else {
            points = suggested;
            feedback = `Provisional. A teacher still needs to confirm this mark. ${ai.explanation}`;
            isCorrect = ai.score >= question.points;
            gradingStatus = "AI";
          }
        }
      } catch {
        gradingStatus = "PENDING_TEACHER";
      }
    }
    if (gradingStatus === "PENDING_TEACHER" || gradingStatus === "AI") pendingCount += 1;
    if (gradingStatus === "AUTO" || gradingStatus === "AI") score += points;
    results.push({ questionId: question.id, studentAnswer, isCorrect, pointsAwarded: gradingStatus === "PENDING_TEACHER" ? null : points, gradingStatus, feedback });
  }
  return { results, score, pendingCount, maxScore: questions.reduce((sum, question) => sum + question.points, 0) };
}

export async function finalizeExam(
  userId: string,
  attemptId: string,
  incoming: Record<string, VersionedAnswer>,
  fallbackAnswers: Record<string, string>,
): Promise<ExamResult> {
  const attempt = await ownedAttempt(userId, attemptId);
  if (!canMutateAttempt(attempt.status, attempt.finalizedAt)) return loadResult(attempt.id);

  const savedRows = await db.answer.findMany({ where: { attemptId }, select: { questionId: true, studentAnswer: true, version: true } });
  const saved: Record<string, VersionedAnswer> = {};
  for (const row of savedRows) saved[row.questionId] = { value: row.studentAnswer || "", version: row.version };
  const deadlinePassed = !attempt.pausedAt && isPastDeadline(attempt.deadlineAt, new Date());
  const merged = deadlinePassed ? {} : Object.keys(incoming).length ? mergeAttemptAnswers(saved, incoming) : { ...fallbackAnswers };
  for (const [questionId, value] of Object.entries(saved)) {
    if (merged[questionId] === undefined) merged[questionId] = value.value;
  }

  const claimed = await db.attempt.updateMany({
    where: { id: attempt.id, status: "IN_PROGRESS", finalizedAt: null },
    data: { status: "SUBMITTED" },
  });
  if (claimed.count === 0) return loadResult(attempt.id);

  const questions = await db.question.findMany({ where: { paperId: attempt.paperId }, orderBy: { order: "asc" } });
  let graded: Awaited<ReturnType<typeof gradeAnswers>>;
  try {
    graded = await gradeAnswers(questions, merged);
  } catch (error) {
    await db.attempt.updateMany({ where: { id: attempt.id, finalizedAt: null, status: "SUBMITTED" }, data: { status: "IN_PROGRESS" } });
    throw error;
  }
  for (const row of graded.results) {
    await db.answer.upsert({
      where: { attemptId_questionId: { attemptId, questionId: row.questionId } },
      create: { ...row, attemptId },
      update: { studentAnswer: row.studentAnswer, isCorrect: row.isCorrect, pointsAwarded: row.pointsAwarded, gradingStatus: row.gradingStatus, feedback: row.feedback },
    });
  }
  const now = new Date();
  await db.attempt.update({
    where: { id: attempt.id },
    data: {
      score: graded.score,
      maxScore: graded.maxScore,
      pendingCount: graded.pendingCount,
      status: graded.pendingCount ? "NEEDS_REVIEW" : "GRADED",
      completedAt: now,
      finalizedAt: now,
      gradedAt: graded.pendingCount ? null : now,
      timeSpentSeconds: activeSeconds(attempt, now),
      pausedAt: null,
    },
  });
  await logProgress(attempt.id, "SUBMITTED", "Exam submitted.");
  await db.user.update({ where: { id: userId }, data: { xp: { increment: Math.round(graded.score * 4) }, lastActiveOn: now } });
  return { attemptId, score: graded.score, maxScore: graded.maxScore, pendingCount: graded.pendingCount, totalQuestions: questions.length };
}

export async function regradeFinalizedAttempt(attemptId: string) {
  const attempt = await db.attempt.findUnique({ where: { id: attemptId }, include: { answers: { include: { question: true } } } });
  if (!attempt?.finalizedAt) throw new Error("Only a submitted examination can be regraded.");
  for (const answer of attempt.answers) {
    if (answer.gradingStatus !== "AUTO") continue;
    const marked = markAnswer(answer.question, answer.studentAnswer);
    if (marked.status !== "AUTO") continue;
    await db.answer.update({
      where: { id: answer.id },
      data: { pointsAwarded: marked.points, isCorrect: marked.isCorrect, feedback: marked.feedback },
    });
  }
  const answers = await db.answer.findMany({ where: { attemptId } });
  const pendingCount = answers.filter((answer) => answer.gradingStatus === "PENDING_TEACHER" || answer.gradingStatus === "AI").length;
  const score = answers.reduce((sum, answer) => sum + (answer.pointsAwarded || 0), 0);
  await db.attempt.update({
    where: { id: attemptId },
    data: { score, pendingCount, markingVersion: { increment: 1 }, status: pendingCount ? "NEEDS_REVIEW" : "GRADED" },
  });
}
