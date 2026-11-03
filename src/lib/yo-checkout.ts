import "server-only";

import { randomUUID } from "node:crypto";
import type { PaymentTransaction } from "@prisma/client";
import { db } from "@/lib/db";
import { grantEntitlement } from "@/lib/entitlements";
import { ensurePlans } from "@/lib/plans";
import { initiateYoCollection, isVerifiedSuccess, verifyYoCollection, yoMode } from "@/lib/yo-payments";

export function yoProvider() {
  const mode = yoMode();
  return mode === "production" ? "YO" : mode === "sandbox" ? "YO_SANDBOX" : null;
}

export async function submitYoCheckout(userId: string, planCode: string, phone: string) {
  const provider = yoProvider();
  if (!provider) return { error: "Mobile money checkout is currently unavailable." };

  const number = phone.trim().replace(/[\s()-]/g, "");
  const match = /^(?:\+?256|0)(7\d{8})$/.exec(number);
  if (!match) return { error: "Enter a Ugandan mobile money number, for example 0772 123 456." };
  await ensurePlans();
  const plan = await db.plan.findUnique({ where: { code: planCode } });
  if (!plan?.active || plan.kind !== "DIGITAL" || !plan.grantsAccess || !plan.periodDays || plan.currency !== "UGX" || plan.price <= 0) {
    return { error: "This subscription is unavailable." };
  }

  const { payment, created } = await db.$transaction(async (tx) => {
    // Serialize submissions across server instances before contacting Yo.
    await tx.$queryRaw`SELECT id FROM "User" WHERE id = ${userId} FOR UPDATE`;
    const pending = await tx.paymentTransaction.findFirst({
      where: { userId, planCode, provider, status: "PENDING", createdAt: { gte: new Date(Date.now() - 15 * 60_000) } },
      orderBy: { createdAt: "desc" },
    });
    if (pending) return { payment: pending, created: false };
    const payment = await tx.paymentTransaction.create({
      data: { userId, planCode, provider, amount: plan.price, currency: plan.currency, kind: plan.kind, idempotencyKey: randomUUID() },
    });
    return { payment, created: true };
  });

  if (created) {
    try {
      const response = await initiateYoCollection(`256${match[1]}`, payment.amount, payment.idempotencyKey);
      if (response.TransactionReference) {
        await db.paymentTransaction.update({ where: { id: payment.id }, data: { providerRef: response.TransactionReference } });
      } else if (response.Status === "ERROR" || response.TransactionStatus === "FAILED") {
        await db.paymentTransaction.update({ where: { id: payment.id }, data: { status: "FAILED" } });
      }
    } catch {
      // A transport error can occur after Yo receives the request. Do not send it again.
    }
  }
  return { paymentId: payment.id };
}

export async function reconcileYoPayment(payment: PaymentTransaction) {
  if (payment.status !== "PENDING" || !payment.providerRef || payment.provider !== yoProvider()) return;
  const reference = payment.providerRef;
  const result = await verifyYoCollection(reference);
  if (result.TransactionReference && result.TransactionReference !== reference) return;
  if (result.Status === "OK" && result.TransactionStatus === "FAILED") {
    await db.paymentTransaction.updateMany({ where: { id: payment.id, status: "PENDING" }, data: { status: "FAILED" } });
    return;
  }
  if (!isVerifiedSuccess(result, payment.amount)) return;

  await db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM "User" WHERE id = ${payment.userId} FOR UPDATE`;
    const now = new Date();
    const claimed = await tx.paymentTransaction.updateMany({
      where: { id: payment.id, status: "PENDING" },
      data: { status: "VERIFIED", verifiedAt: now },
    });
    if (!claimed.count) return;
    const plan = await tx.plan.findUniqueOrThrow({ where: { code: payment.planCode } });
    if (payment.provider === "YO" && plan.grantsAccess && plan.periodDays) {
      await grantEntitlement({ userId: payment.userId, planCode: plan.code, source: "YO", providerRef: `YO:${reference}`, days: plan.periodDays, now }, tx);
    }
  });
}
