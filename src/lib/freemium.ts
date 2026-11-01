import { db } from "@/lib/db";

/** The old trial dates are intentionally NOT treated as Pro subscriptions. */
export function hasProAccess(user: { subscriptionEndsAt: Date | null }, now = new Date()) {
  return Boolean(user.subscriptionEndsAt && user.subscriptionEndsAt > now);
}

/** Read-only gate. The final entitlement is claimed atomically on submission. */
export async function practiceAccess(userId: string, subjectId: string) {
  const user = await db.user.findUnique({ where: { id: userId }, select: { subscriptionEndsAt: true } });
  if (!user) return { allowed: false, reason: "SIGN_IN" as const, isPro: false };
  if (hasProAccess(user)) return { allowed: true, reason: "PRO" as const, isPro: true };
  const [claim, historic] = await Promise.all([
    db.freeSubjectClaim.findUnique({ where: { userId_subjectId: { userId, subjectId } }, select: { id: true } }),
    db.attempt.findFirst({ where: { userId, paper: { subjectId }, completedAt: { not: null } }, select: { id: true } }),
  ]);
  return { allowed: !claim && !historic, reason: claim || historic ? "USED" as const : "FREE" as const, isPro: false };
}
