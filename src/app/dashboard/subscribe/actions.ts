"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function processMoMoPayment() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  redirect("/dashboard/subscribe?error=unavailable");
}
