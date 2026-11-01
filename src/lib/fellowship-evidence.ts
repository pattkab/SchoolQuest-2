import { db } from "@/lib/db";
import { cohortChange, pairedOutcomes, verifiedReceipts, type OutcomeAttempt, type PaymentRecord } from "@/lib/evidence";
import { readinessRows } from "@/lib/readiness";

export async function loadFellowshipEvidence() {
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const [users, attempts, payments, notes, papers] = await Promise.all([
    db.user.findMany({ select: { id: true, role: true, accountKind: true } }),
    db.attempt.findMany({
      where: { completedAt: { not: null } },
      select: {
        userId: true,
        mode: true,
        score: true,
        maxScore: true,
        completedAt: true,
        user: { select: { accountKind: true, role: true } },
        paper: { select: { subjectId: true } },
      },
    }),
    db.paymentTransaction.findMany({
      select: { userId: true, providerRef: true, status: true, amount: true, user: { select: { accountKind: true } } },
    }),
    db.note.findMany({ where: { status: "NEEDS_REVIEW" }, select: { id: true, title: true }, take: 20 }),
    db.paper.findMany({ where: { status: "NEEDS_REVIEW" }, select: { id: true, title: true }, take: 20 }),
  ]);

  const realUsers = users.filter((user) => user.accountKind === "REAL");
  const activeLearners = new Set(
    attempts
      .filter((attempt) => attempt.user.accountKind === "REAL" && attempt.user.role === "STUDENT" && attempt.completedAt && attempt.completedAt >= since)
      .map((attempt) => attempt.userId),
  );
  const outcomeRows: OutcomeAttempt[] = attempts.map((attempt) => ({
    userId: attempt.userId,
    subjectId: attempt.paper.subjectId,
    mode: attempt.mode,
    score: attempt.score,
    maxScore: attempt.maxScore,
    completedAt: attempt.completedAt?.toISOString() ?? null,
    accountKind: attempt.user.accountKind,
  }));
  const outcomes = pairedOutcomes(outcomeRows);
  const summary = cohortChange(outcomes.pairs);
  const paymentRows: PaymentRecord[] = payments.map((payment) => ({
    userId: payment.userId,
    providerRef: payment.providerRef,
    status: payment.status,
    amount: payment.amount,
    accountKind: payment.user.accountKind,
  }));
  const receipts = verifiedReceipts(paymentRows);
  const updated = new Date().toISOString().slice(0, 10);
  return {
    updated,
    realUsers: realUsers.length,
    demoExcluded: users.length - realUsers.length,
    activeLearners: activeLearners.size,
    receipts,
    summary,
    rows: readinessRows({
      realUsers: realUsers.length,
      activeLearners: activeLearners.size,
      receipts: receipts.receipts,
      grossUgx: receipts.grossUgx,
      pairs: outcomes.pairs.length,
      updated,
    }),
    drafts: [
      ...notes.map((note) => ({ kind: "note" as const, id: note.id, title: note.title })),
      ...papers.map((paper) => ({ kind: "paper" as const, id: paper.id, title: paper.title })),
    ],
    limitations: [
      "Demonstration and test accounts are excluded.",
      "An unfinished attempt is excluded, not scored as zero.",
      "A score change is not evidence that SchoolQuest caused the change.",
      "Revenue counts only verified provider receipts. No provider is connected yet.",
      "This is an internal record. It is not a Hive Colab or Mastercard Foundation assessment.",
    ],
  };
}
