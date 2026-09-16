"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function processMoMoPayment(phone: string, provider: "MTN" | "AIRTEL") {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // In production:
  // 1. Initialize Flutterwave or Pesapal Mobile Money collection
  // 2. Await webhook confirmation
  // For Phase 1 / local MVP testing:
  // 1. Instantly approve the transaction after 1s mock wait.
  
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const subscriptionEnds = new Date();
  subscriptionEnds.setDate(subscriptionEnds.getDate() + 30);

  await db.user.update({
    where: { id: userId },
    data: {
      subscriptionEndsAt: subscriptionEnds,
    },
  });

  redirect("/dashboard");
}
