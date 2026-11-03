import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import { ensurePlans } from "@/lib/plans";
import { grantEntitlement, revokeEntitlement } from "@/lib/entitlements";

export function yoSignature(secret: string, body: string) {
  return createHmac("sha256", secret).update(body).digest("hex");
}

export function yoAuthorized(secret: string, body: string, signature: string) {
  if (!secret || !signature) return false;
  const expected = Buffer.from(yoSignature(secret, body));
  const presented = Buffer.from(signature);
  return expected.length === presented.length && timingSafeEqual(expected, presented);
}

export function clientReportedSuccess() {
  return { ok: false as const, error: "A message from the phone does not start a subscription." };
}

export async function startPayment(input: { userId: string; planCode: string; channel: "WEB" | "ANDROID" | "IOS" }) {
  await ensurePlans();
  const plan = await db.plan.findUnique({ where: { code: input.planCode } });
  if (!plan || !plan.active || plan.price <= 0) throw new Error("That product is not available.");
  if (plan.kind === "DIGITAL" && input.channel !== "WEB") throw new Error("Buy this subscription in the store. School Quest confirms the receipt.");
  const payment = await db.paymentTransaction.create({
    data: {
      userId: input.userId,
      planCode: plan.code,
      amount: plan.price,
      currency: plan.currency,
      status: "PENDING",
      provider: plan.kind === "PHYSICAL" ? "YO" : "YO",
      kind: plan.kind,
      idempotencyKey: randomUUID(),
    },
  });
  return { transactionId: payment.id, amount: payment.amount, currency: payment.currency, status: payment.status, kind: payment.kind, configured: Boolean(process.env.YO_API_USERNAME && process.env.YO_API_PASSWORD) };
}

export async function confirmYoPayment(input: { rawBody: string; signature: string; payload: { idempotencyKey?: string; providerRef?: string; status?: string; amount?: number } }) {
  const secret = process.env.YO_WEBHOOK_SECRET || "";
  if (!yoAuthorized(secret, input.rawBody, input.signature)) throw new Error("The payment notification could not be verified.");
  const providerRef = String(input.payload.providerRef || "");
  const status = String(input.payload.status || "");
  if (!providerRef) throw new Error("The payment notification is incomplete.");
  const seen = await db.billingEvent.findUnique({ where: { source_providerRef_status: { source: "YO", providerRef, status } } });
  if (seen) {
    const entitlement = await db.entitlement.findUnique({ where: { providerRef } });
    return { duplicate: true, entitlement };
  }
  const payment = await db.paymentTransaction.findUnique({ where: { idempotencyKey: String(input.payload.idempotencyKey || "") } });
  if (!payment) throw new Error("This payment is not one School Quest started.");
  if (payment.amount !== Number(input.payload.amount)) throw new Error("The amount does not match the plan.");
  await db.billingEvent.create({ data: { source: "YO", providerRef, status } });
  if (status !== "SUCCEEDED") {
    await db.paymentTransaction.update({ where: { id: payment.id }, data: { status: "FAILED", providerRef } });
    return { duplicate: false, entitlement: null };
  }
  await db.paymentTransaction.update({ where: { id: payment.id }, data: { status: "VERIFIED", providerRef, verifiedAt: new Date() } });
  const plan = await db.plan.findUnique({ where: { code: payment.planCode } });
  if (!plan?.grantsAccess) return { duplicate: false, entitlement: null };
  const granted = await grantEntitlement({ userId: payment.userId, planCode: plan.code, source: "YO", providerRef, days: plan.periodDays || 30 });
  return { duplicate: false, entitlement: granted.entitlement };
}

export type StorePurchase = { state: "PURCHASED" | "PENDING" | "CANCELED" | "REFUNDED"; expiresAt: Date; orderId: string } | null;
export type PurchaseVerifier = (token: string, productId: string) => Promise<StorePurchase>;

export const unverifiedStore: PurchaseVerifier = async () => null;

export async function confirmStorePurchase(input: { userId: string; source: "PLAY" | "APPLE"; productId: string; token: string; verify: PurchaseVerifier }) {
  await ensurePlans();
  const plan = await db.plan.findFirst({ where: { OR: [{ playProductId: input.productId }, { appleProductId: input.productId }], grantsAccess: true } });
  if (!plan) throw new Error("That product does not include School Quest Premium.");
  const purchase = await input.verify(input.token, input.productId);
  if (!purchase || purchase.state === "PENDING" || purchase.state === "CANCELED") throw new Error("The store has not confirmed this purchase.");
  const providerRef = `${input.source}:${purchase.orderId}`;
  if (purchase.state === "REFUNDED") {
    await revokeEntitlement(providerRef);
    await db.billingEvent.create({ data: { source: input.source, providerRef, status: "REFUNDED" } }).catch(() => undefined);
    return { entitlement: await db.entitlement.findUnique({ where: { providerRef } }), active: false };
  }
  const days = Math.max(1, Math.ceil((purchase.expiresAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000)));
  const granted = await grantEntitlement({ userId: input.userId, planCode: plan.code, source: input.source, providerRef, days });
  await db.billingEvent.create({ data: { source: input.source, providerRef, status: "PURCHASED" } }).catch(() => undefined);
  return { entitlement: granted.entitlement, active: true, created: granted.created };
}

export function appleNoticeEffect(type: string) {
  if (type === "DID_RENEW" || type === "SUBSCRIBED") return "renew";
  if (type === "EXPIRED") return "expire";
  if (type === "REFUND" || type === "REVOKE") return "revoke";
  return "ignore";
}

export function storeNoticeDecision(type: string, verified: boolean) {
  if (!verified) return "deny" as const;
  return appleNoticeEffect(type);
}
