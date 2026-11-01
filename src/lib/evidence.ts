export type AccountKind = "REAL" | "DEMO" | "TEST";

export type OutcomeAttempt = {
  userId: string;
  subjectId: string;
  mode: string;
  score: number | null;
  maxScore: number | null;
  completedAt: string | null;
  accountKind: string;
};

export type OutcomePair = {
  userId: string;
  subjectId: string;
  baselinePct: number;
  endlinePct: number;
  changePoints: number;
};

export type PaymentRecord = {
  userId: string;
  providerRef: string | null;
  status: string;
  amount: number;
  accountKind: string;
};

const MEASURED = "BASELINE" as const;

export function percentage(score: number, maxScore: number) {
  if (maxScore <= 0) return null;
  return Math.round((score / maxScore) * 1000) / 10;
}

export function pairedOutcomes(rows: OutcomeAttempt[]) {
  const usable = rows.filter((row) => {
    return row.accountKind === "REAL"
      && row.completedAt
      && row.score !== null
      && row.maxScore !== null
      && row.maxScore > 0
      && (row.mode === "BASELINE" || row.mode === "ENDLINE");
  });
  const groups = new Map<string, OutcomeAttempt[]>();
  for (const row of usable) {
    const key = `${row.userId}\t${row.subjectId}`;
    groups.set(key, [...(groups.get(key) || []), row]);
  }
  const pairs: OutcomePair[] = [];
  for (const [key, items] of groups) {
    const baselines = items.filter((item) => item.mode === "BASELINE").sort((a, b) => a.completedAt!.localeCompare(b.completedAt!));
    const endlines = items.filter((item) => item.mode === "ENDLINE").sort((a, b) => a.completedAt!.localeCompare(b.completedAt!));
    const baseline = baselines[0];
    const endline = endlines.at(-1);
    if (!baseline || !endline || endline.completedAt! < baseline.completedAt!) continue;
    const baselinePct = percentage(baseline.score!, baseline.maxScore!);
    const endlinePct = percentage(endline.score!, endline.maxScore!);
    if (baselinePct === null || endlinePct === null) continue;
    const [userId, subjectId] = key.split("\t");
    pairs.push({
      userId,
      subjectId,
      baselinePct,
      endlinePct,
      changePoints: Math.round((endlinePct - baselinePct) * 10) / 10,
    });
  }
  return { pairs, excluded: rows.length - pairs.length };
}

export function cohortChange(pairs: OutcomePair[]) {
  if (pairs.length === 0) return null;
  const mean = (values: number[]) => Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
  return {
    pairs: pairs.length,
    learners: new Set(pairs.map((pair) => pair.userId)).size,
    baselinePct: mean(pairs.map((pair) => pair.baselinePct)),
    endlinePct: mean(pairs.map((pair) => pair.endlinePct)),
    changePoints: mean(pairs.map((pair) => pair.changePoints)),
  };
}

export function verifiedReceipts(payments: PaymentRecord[]) {
  const seen = new Set<string>();
  const customers = new Set<string>();
  let amount = 0;
  for (const payment of payments) {
    if (payment.accountKind !== "REAL") continue;
    if (payment.status !== "VERIFIED" || !payment.providerRef) continue;
    if (seen.has(payment.providerRef)) continue;
    seen.add(payment.providerRef);
    customers.add(payment.userId);
    amount += payment.amount;
  }
  return {
    receipts: seen.size,
    customers: customers.size,
    grossUgx: amount,
    measured: seen.size > 0,
  };
}

export function entitlementAllowed(payment: { status: string; providerRef: string | null; amount: number }, expectedAmount: number) {
  if (payment.status !== "VERIFIED" || !payment.providerRef) return false;
  return payment.amount === expectedAmount;
}

export const outcomeModes = { baseline: MEASURED, endline: "ENDLINE" };
