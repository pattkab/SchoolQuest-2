import { db } from "@/lib/db";
import { classWithTerm } from "@/lib/taxonomy";
import { learnerBillingSummary } from "@/lib/entitlements";
import { toPublicQuestion } from "@/lib/public-question";
import { finalizeExam, openExamAttempt, saveExamAnswers } from "@/lib/exam-attempts";
import { WHATSAPP_URL, PRODUCTS_URL, COMPANY_LINE } from "@/lib/company";

export function rejectClientBilling() {
  return { ok: false as const, error: "A store receipt does not start a subscription. The server confirms payment before access changes." };
}

export async function mobileHome(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId }, include: { classGrade: true } });
  if (!user) throw new Error("Account not found.");
  const [subjects, openAttempt, results] = await Promise.all([
    user.classGradeId
      ? db.subject.findMany({
          where: { classGradeId: user.classGradeId },
          orderBy: { order: "asc" },
          select: { id: true, name: true, _count: { select: { notes: { where: { status: "PUBLISHED" } }, papers: { where: { status: "PUBLISHED" } } } } },
        })
      : [],
    db.attempt.findFirst({
      where: { userId, status: "IN_PROGRESS", finalizedAt: null },
      orderBy: { startedAt: "desc" },
      include: { paper: { select: { id: true, title: true, subject: { select: { name: true } } } } },
    }),
    db.attempt.findMany({
      where: { userId, finalizedAt: { not: null } },
      orderBy: { finalizedAt: "desc" },
      take: 20,
      include: { paper: { select: { id: true, title: true, subject: { select: { name: true } } } } },
    }),
  ]);
  return {
    name: user.name,
    role: user.role,
    classLabel: classWithTerm(user.classGrade?.shortName),
    xp: user.xp,
    streak: user.currentStreak,
    subjects: subjects.map((subject) => ({ id: subject.id, name: subject.name, notes: subject._count.notes, papers: subject._count.papers })),
    continue: openAttempt ? { attemptId: openAttempt.id, paperId: openAttempt.paper.id, title: openAttempt.paper.title, subject: openAttempt.paper.subject.name } : null,
    results: results.map((attempt) => ({
      attemptId: attempt.id,
      paperId: attempt.paper.id,
      title: attempt.paper.title,
      subject: attempt.paper.subject.name,
      score: attempt.score,
      maxScore: attempt.maxScore,
      pendingCount: attempt.pendingCount,
    })),
  };
}

export async function mobileSubject(subjectId: string) {
  const subject = await db.subject.findUnique({
    where: { id: subjectId },
    include: {
      papers: { where: { status: "PUBLISHED" }, orderBy: { year: "desc" }, select: { id: true, title: true, year: true, durationMinutes: true } },
      notes: { where: { status: "PUBLISHED" }, orderBy: { order: "asc" }, select: { id: true, title: true, summary: true } },
    },
  });
  if (!subject) return null;
  return { id: subject.id, name: subject.name, papers: subject.papers, notes: subject.notes };
}

export async function mobileNote(noteId: string) {
  const note = await db.note.findFirst({ where: { id: noteId, status: "PUBLISHED" }, select: { id: true, title: true, summary: true, content: true } });
  return note;
}

export async function mobilePaper(paperId: string) {
  const paper = await db.paper.findFirst({
    where: { id: paperId, status: "PUBLISHED" },
    include: { questions: { orderBy: { order: "asc" } }, subject: { select: { name: true } } },
  });
  if (!paper) return null;
  return {
    id: paper.id,
    title: paper.title,
    subject: paper.subject.name,
    durationMinutes: paper.durationMinutes,
    questions: paper.questions.map((question) => toPublicQuestion(question)),
  };
}

export async function mobileStart(userId: string, paperId: string) {
  return openExamAttempt(userId, paperId);
}

export async function mobileSave(userId: string, attemptId: string, writes: { questionId: string; value: string; version: number }[]) {
  return saveExamAnswers(userId, attemptId, writes);
}

export async function mobileSubmit(userId: string, attemptId: string, incoming: Record<string, { value: string; version: number }>) {
  const result = await finalizeExam(userId, attemptId, incoming, {});
  const feedback = await db.answer.findMany({
    where: { attemptId },
    select: { questionId: true, pointsAwarded: true, feedback: true, gradingStatus: true },
  });
  return { result, feedback };
}

export async function mobileSubscription(userId: string) {
  const summary = await learnerBillingSummary(userId);
  return {
    ...summary,
    plans: summary.plans.filter((plan) => plan.kind === "DIGITAL").map((plan) => ({ code: plan.code, name: plan.name, price: plan.price, currency: plan.currency, period: plan.periodDays ? `${plan.periodDays} days` : "once" })),
    trialActive: false,
    subscriptionActive: summary.premium,
    subscriptionEndsAt: summary.endsAt,
    billing: "The phone cannot turn a subscription on. Payment is confirmed on the server.",
  };
}

export async function mobileClasses() {
  return db.classGrade.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, select: { id: true, name: true, shortName: true, slug: true } });
}

export function mobileHelp() {
  return { whatsapp: WHATSAPP_URL, products: PRODUCTS_URL, about: COMPANY_LINE };
}
