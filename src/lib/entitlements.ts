import { db } from "@/lib/db";
import { FREE_EXAM_POLICY, ensurePlans } from "@/lib/plans";

const STAFF = new Set(["TEACHER", "SCHOOL_ADMIN", "ADMIN", "SUPER_ADMIN"]);
export const FREE_EXAM_USED = "This subject's free practice exam has already started. A subscription is required for another paper.";

type Tx = Parameters<Parameters<typeof db.$transaction>[0]>[0];

export function entitlementActive(row: { endsAt: Date; revokedAt: Date | null; graceHours: number }, now = new Date()) {
  if (row.revokedAt) return false;
  return now.getTime() < row.endsAt.getTime() + row.graceHours * 60 * 60 * 1000;
}

export async function hasPremium(userId: string, now = new Date(), tx: Tx | typeof db = db) {
  const rows = await tx.entitlement.findMany({ where: { userId, revokedAt: null } });
  return rows.some((row) => entitlementActive(row, now));
}

export async function refreshSubscriptionCache(userId: string, tx: Tx | typeof db = db) {
  const rows = await tx.entitlement.findMany({ where: { userId, revokedAt: null } });
  const active = rows.filter((row) => entitlementActive(row));
  const endsAt = active.sort((a, b) => b.endsAt.getTime() - a.endsAt.getTime())[0]?.endsAt ?? null;
  await tx.user.update({ where: { id: userId }, data: { subscriptionEndsAt: endsAt } });
}

export async function grantEntitlement(input: { userId: string; planCode: string; source: string; providerRef: string; days: number; now?: Date }, tx: Tx | typeof db = db) {
  const existing = await tx.entitlement.findUnique({ where: { providerRef: input.providerRef } });
  if (existing) return { entitlement: existing, created: false };
  const now = input.now ?? new Date();
  const current = await tx.entitlement.findMany({ where: { userId: input.userId, revokedAt: null } });
  const latest = current.filter((row) => entitlementActive(row, now)).sort((a, b) => b.endsAt.getTime() - a.endsAt.getTime())[0];
  const startsAt = latest && latest.endsAt > now ? latest.endsAt : now;
  const endsAt = new Date(startsAt.getTime() + input.days * 24 * 60 * 60 * 1000);
  const entitlement = await tx.entitlement.create({
    data: { userId: input.userId, planCode: input.planCode, source: input.source, providerRef: input.providerRef, startsAt, endsAt },
  });
  await refreshSubscriptionCache(input.userId, tx);
  return { entitlement, created: true };
}

export async function expireEntitlement(providerRef: string) {
  const row = await db.entitlement.findUnique({ where: { providerRef } });
  if (!row || row.revokedAt) return row;
  await db.entitlement.update({ where: { providerRef }, data: { endsAt: new Date(), graceHours: 0 } });
  await refreshSubscriptionCache(row.userId);
  return db.entitlement.findUnique({ where: { providerRef } });
}

export async function revokeEntitlement(providerRef: string) {
  const row = await db.entitlement.findUnique({ where: { providerRef } });
  if (!row) return null;
  if (!row.revokedAt) await db.entitlement.update({ where: { providerRef }, data: { revokedAt: new Date() } });
  await refreshSubscriptionCache(row.userId);
  return db.entitlement.findUnique({ where: { providerRef } });
}

export async function learnerBillingSummary(userId: string) {
  const plans = await ensurePlans();
  const [entitlements, grants, payments, subjects] = await Promise.all([
    db.entitlement.findMany({ where: { userId }, orderBy: { endsAt: "desc" } }),
    db.freeExamGrant.findMany({ where: { userId } }),
    db.paymentTransaction.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 10 }),
    db.subject.findMany({ where: { id: { in: (await db.freeExamGrant.findMany({ where: { userId }, select: { subjectId: true } })).map((grant) => grant.subjectId) } }, select: { id: true, name: true } }),
  ]);
  const active = entitlements.find((row) => entitlementActive(row));
  return {
    premium: Boolean(active),
    endsAt: active?.endsAt.toISOString() ?? null,
    source: active?.source ?? null,
    policy: FREE_EXAM_POLICY,
    plans: plans.filter((plan) => plan.active),
    physical: plans.filter((plan) => plan.kind === "PHYSICAL"),
    freeExams: grants.map((grant) => ({ subjectId: grant.subjectId, subject: subjects.find((subject) => subject.id === grant.subjectId)?.name ?? "Subject", attemptId: grant.attemptId })),
    payments: payments.map((payment) => ({ id: payment.id, planCode: payment.planCode, amount: payment.amount, currency: payment.currency, status: payment.status, kind: payment.kind, createdAt: payment.createdAt.toISOString() })),
  };
}

export async function learnerCanOpenExam(userId: string, subjectId: string) {
  const user = await db.user.findUnique({ where: { id: userId }, select: { role: true } });
  if (user && STAFF.has(user.role)) return { allowed: true, reason: "staff" as const };
  if (await hasPremium(userId)) return { allowed: true, reason: "premium" as const };
  const grant = await db.freeExamGrant.findUnique({ where: { userId_subjectId: { userId, subjectId } } });
  if (grant) return { allowed: false, reason: "free-used" as const };
  return { allowed: true, reason: "free" as const };
}
