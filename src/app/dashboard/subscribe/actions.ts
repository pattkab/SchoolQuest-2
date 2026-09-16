"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function processMoMoPayment(
  phone: string, 
  provider: "MTN" | "AIRTEL",
  plan: "weekly" | "monthly" | "term" = "monthly"
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Simulate MoMo net processing latency
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const subscriptionEnds = new Date();
  
  if (plan === "weekly") {
    subscriptionEnds.setDate(subscriptionEnds.getDate() + 7);
  } else if (plan === "term") {
    subscriptionEnds.setDate(subscriptionEnds.getDate() + 90);
  } else {
    subscriptionEnds.setDate(subscriptionEnds.getDate() + 30);
  }

  await db.user.update({
    where: { id: userId },
    data: {
      subscriptionEndsAt: subscriptionEnds,
    },
  });

  redirect("/dashboard");
}
