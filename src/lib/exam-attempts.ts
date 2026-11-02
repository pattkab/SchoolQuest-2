import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { gradeDrawingAnswer, gradeOpenAnswer } from "@/lib/gemini";
import { isDrawingDescription } from "@/lib/accessibility-settings";
import { markAnswer, OPEN_TYPES, type MarkableQuestion } from "@/lib/marking";
import {
  answerWriteDecision,
  canMutateAttempt,
  examDeadline,
  isPastDeadline,
  mergeAttemptAnswers,
  remainingMs,
  type VersionedAnswer,
} from "@/lib/exam-session";

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
  startedAt: Date;
  score: number;
  maxScore: number;
  pendingCount: number;
};

function clock(attempt: { deadlineAt: Date | null }, now = new Date()) {
  return {
    serverNow: now.toISOString(),
    deadlineAt: attempt.deadlineAt?.toISOString() ?? null,
    remainingMs: remainingMs(attempt.deadlineAt, now),
  };
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

export async function openExamAttempt(userId: string, paperId: string): Promise<ExamSession> {
  const paper = await db.paper.findUnique({ where: { id: paperId }, select: { status: true, durationMinutes: true } });
  if (!paper || paper.status !== "PUBLISHED") throw new Error("This paper is not published.");

  const open = await db.$transaction(async (tx) => {
    const existing = await tx.attempt.findFirst({
      where: { userId, paperId, status: "IN_PROGRESS", finalizedAt: null },
      orderBy: { startedAt: "desc" },
    });
    if (existing) return existing;
    const startedAt = new Date();
    return tx.attempt.create({
      data: {
        userId,
        paperId,
        status: "IN_PROGRESS",
        mode: "PRACTICE",
        startedAt,
        deadlineAt: examDeadline(startedAt, paper.durationMinutes),
      },
    });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }).catch(async () => {
    const existing = await db.attempt.findFirst({ where: { userId, paperId, status: "IN_PROGRESS", finalizedAt: null }, orderBy: { startedAt: "desc" } });
    if (!existing) throw new Error("The examination could not be started.");
    return existing;
  });

  if (isPastDeadline(open.deadlineAt, new Date())) {
    const result = await finalizeExam(userId, open.id, {}, {});
    const answers = await db.answer.findMany({ where: { attemptId: open.id }, select: { questionId: true, studentAnswer: true, version: true, gradingStatus: true } });
    const fresh = await ownedAttempt(userId, open.id);
    return sessionFrom(fresh, answers, result);
  }
  const answers = await db.answer.findMany({ where: { attemptId: open.id }, select: { questionId: true, studentAnswer: true, version: true, gradingStatus: true } });
  return sessionFrom(open, answers, null);
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
  const applied = await applyWrites(attempt.id, writes);
  if (isPastDeadline(attempt.deadlineAt, new Date())) {
    const result = await finalizeExam(userId, attempt.id, {}, {});
    return { saved: true, expired: true, ...applied, ...clock(attempt, new Date()), remainingMs: 0, result };
  }
  return { saved: true, expired: false, ...applied, ...clock(attempt, new Date()), result: null };
}

export async function readExamClock(userId: string, attemptId: string) {
  const attempt = await ownedAttempt(userId, attemptId);
  if (canMutateAttempt(attempt.status, attempt.finalizedAt) && isPastDeadline(attempt.deadlineAt, new Date())) {
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
    let marked = markAnswer(question, studentAnswer);
    let gradingStatus = marked.status === "AUTO" ? "AUTO" : marked.status === "UNANSWERED" ? "UNANSWERED" : "PENDING_TEACHER";
    let feedback = marked.feedback;
    let points = marked.points;
    let isCorrect = marked.isCorrect;
    const shouldAskAi =
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
        if (ai.explanation && !ai.explanation.toLowerCase().includes("unable")) {
          points = Math.max(0, Math.min(question.points, ai.score));
          feedback = `Provisional. A teacher still needs to confirm this mark. ${ai.explanation}`;
          isCorrect = ai.score >= question.points;
          gradingStatus = "AI";
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
  const merged = Object.keys(incoming).length ? mergeAttemptAnswers(saved, incoming) : { ...fallbackAnswers };
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
      timeSpentSeconds: Math.max(0, Math.round((now.getTime() - attempt.startedAt.getTime()) / 1000)),
    },
  });
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
