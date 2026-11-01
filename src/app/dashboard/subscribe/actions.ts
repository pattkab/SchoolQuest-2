"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { initiateYoCollection, isVerifiedSuccess, verifyYoCollection } from "@/lib/yo-payments";
import { randomUUID } from "node:crypto";

const ANNUAL_STUDENT_PRICE = 25000;
function normalizeUgandaNumber(raw: string) {
  const digits = raw.replace(/[^0-9]/g, "");
  const phone = digits.startsWith("0") ? "256" + digits.slice(1) : digits;
  if (!/^256[37][0-9]{8}$/.test(phone)) throw new Error("Enter a valid Uganda Mobile Money number.");
  return phone;
}
async function authenticatedUserId() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Sign in to subscribe.");
  return session.user.id;
}

/** Starts a real collection only when Yo credentials and production approvals are configured. */
export async function startStudentProPayment(phone: string) {
  const userId = await authenticatedUserId();
  const customerMsisdn = normalizeUgandaNumber(phone);
  if (!process.env.YO_API_USERNAME || !process.env.YO_API_PASSWORD) {
    throw new Error("Subscription checkout is not configured yet. No charge was made.");
  }
  // Avoid accidental repeat prompts for an existing pending transaction.
  const pending = await db.subscriptionPayment.findFirst({
    where: { userId, status: { in: ["CREATED","PENDING"] } }, orderBy: { createdAt: "desc" },
  });
  if (pending && Date.now() - pending.createdAt.getTime() < 20 * 60 * 1000) {
    return { id: pending.id, status: pending.status, message: "An earlier payment request is pending. Check its status." };
  }
  const externalReference = randomUUID();
  const payment = await db.subscriptionPayment.create({
    data: { userId, amountUgx: ANNUAL_STUDENT_PRICE, customerMsisdn, externalReference, status: "CREATED" },
  });
  try {
    const started = await initiateYoCollection(customerMsisdn, ANNUAL_STUDENT_PRICE, externalReference);
    if (started.Status.toUpperCase() !== "OK" || !started.TransactionReference) {
      await db.subscriptionPayment.update({ where: { id: payment.id }, data: { status: "FAILED" } });
      throw new Error("Payment request was not accepted. No subscription was activated.");
    }
    await db.subscriptionPayment.update({ where: { id: payment.id }, data: {
      providerReference: started.TransactionReference, status: "PENDING",
    } });
    return { id: payment.id, status: "PENDING", message: "Approve the payment on your phone, then check its status." };
  } catch (error) {
    // Network errors are indeterminate: do not start another request until reviewed.
    await db.subscriptionPayment.updateMany({ where: { id: payment.id, status: "CREATED" }, data: { status: "REVIEW" } });
    throw error;
  }
}

/** Server-to-server check: never trust a client success flag or redirect. */
export async function checkStudentProPayment(paymentId: string) {
  const userId = await authenticatedUserId();
  const payment = await db.subscriptionPayment.findFirst({ where: { id: paymentId, userId } });
  if (!payment) throw new Error("Payment not found.");
  if (payment.status === "SUCCEEDED") return { status: "SUCCEEDED", message: "Pro is active." };
  if (!payment.providerReference) return { status: payment.status, message: "This request is awaiting review." };
  const checked = await verifyYoCollection(payment.providerReference, payment.externalReference);
  if (isVerifiedSuccess(checked, payment.amountUgx)
      && checked.TransactionReference === payment.providerReference) {
    await db.$transaction(async tx => {
      const fresh = await tx.subscriptionPayment.findUnique({ where: { id: payment.id } });
      if (!fresh || fresh.status === "SUCCEEDED") return;
      if (fresh.status !== "PENDING") throw new Error("This payment cannot be applied automatically.");
      const account = await tx.user.findUnique({ where: { id: userId }, select: { subscriptionEndsAt: true } });
      if (!account) throw new Error("Account not found.");
      const begins = account.subscriptionEndsAt && account.subscriptionEndsAt > new Date()
        ? account.subscriptionEndsAt : new Date();
      const until = new Date(begins);
      until.setUTCFullYear(until.getUTCFullYear() + 1);
      await tx.user.update({ where: { id: userId }, data: { subscriptionEndsAt: until } });
      await tx.subscriptionPayment.update({ where: { id: payment.id }, data: {
        status: "SUCCEEDED", verifiedAt: new Date(), appliedAt: new Date(),
      } });
    });
    return { status: "SUCCEEDED", message: "Payment verified. SchoolQuest Pro is active." };
  }
  if (checked.TransactionStatus.toUpperCase() === "FAILED") {
    await db.subscriptionPayment.updateMany({ where: { id: payment.id, status: "PENDING" }, data: { status: "FAILED" } });
    return { status: "FAILED", message: "Payment was unsuccessful. No subscription was activated." };
  }
  return { status: "PENDING", message: "Payment is still pending. Check again after approving the prompt." };
}

/** Deprecated alias deliberately refuses legacy simulated flows. */
export async function processMoMoPayment(): Promise<never> {
  throw new Error("Legacy checkout disabled. Use verified SchoolQuest Pro checkout.");
}
