"use server";

import { createHash } from "node:crypto";
import { grantEntitlement } from "@/lib/entitlements";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { reconcileYoPayment, submitYoCheckout } from "@/lib/yo-checkout";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function startYoCheckout(_state: { error: string }, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (!rateLimit(`yo-start:${session.user.id}`, 4, 60_000).ok) return { error: "Please wait a minute before requesting another payment." };
  let result;
  try {
    result = await submitYoCheckout(session.user.id, String(formData.get("planCode") || ""), String(formData.get("phone") || ""));
  } catch {
    return { error: "Checkout could not be started. Please try again later." };
  }
  if (!result.paymentId) return { error: result.error ?? "Checkout could not be started." };
  revalidatePath("/dashboard/subscribe");
  redirect(`/dashboard/subscribe?pending=${result.paymentId}`);
}

export async function checkYoCheckout(_state: { error: string }, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (!rateLimit(`yo-check:${session.user.id}`, 10, 60_000).ok) return { error: "Please wait a minute before checking again." };
  const payment = await db.paymentTransaction.findFirst({ where: {
    id: String(formData.get("paymentId") || ""), userId: session.user.id,
  } });
  if (!payment) return { error: "Payment was not found." };
  try {
    await reconcileYoPayment(payment);
  } catch {
    return { error: "Yo is temporarily unavailable. Check again before making another payment." };
  }
  revalidatePath("/dashboard/subscribe");
  return { error: "" };
}

export async function redeemPromoCode(_state: { error: string; message: string }, formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");
  if (!rateLimit(`promo:${userId}`, 6, 60_000).ok) {
    return { error: "Wait a minute before trying another code.", message: "" };
  }
  const code = String(formData.get("code") || "").trim().toUpperCase();
  if (!/^[A-Z0-9-]{4,64}$/.test(code)) return { error: "Enter a valid promo code.", message: "" };

  const campaign = (process.env.SCHOOLQUEST_PROMO_CODES || "").split(",").find((item) => item.trim().split(":")[0]?.toUpperCase() === code);
  const days = Number(campaign?.split(":")[1]);
  if (!Number.isInteger(days) || days < 1 || days > 365) {
    return { error: "That promo code is invalid or no longer available.", message: "" };
  }

  const providerRef = `PROMO:${createHash("sha256").update(`${userId}:${code}`).digest("hex")}`;
  const created = await db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM "User" WHERE id = ${userId} FOR UPDATE`;
    const result = await grantEntitlement({ userId, planCode: "monthly", source: "PROMO", providerRef, days }, tx);
    return result.created;
  });
  if (!created) return { error: "You’ve already redeemed this promo code.", message: "" };
  revalidatePath("/dashboard", "layout");
  return { error: "", message: `${days} ${days === 1 ? "day" : "days"} of Premium added to your account.` };
}
