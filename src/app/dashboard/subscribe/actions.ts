"use server";

/** Intentionally disabled: the previous implementation granted Pro after a timer,
 * not a confirmed payment. Re-enable only after a verified payment-provider
 * callback, idempotent reconciliation and app-store billing review. */
export async function processMoMoPayment(
  _phone: string,
  _provider: "MTN" | "AIRTEL",
  _plan: "weekly" | "monthly" | "term" = "monthly"
): Promise<never> {
  throw new Error("Payments are not yet enabled. No charge has been made.");
}
