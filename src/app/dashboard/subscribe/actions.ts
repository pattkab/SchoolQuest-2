"use server";

import { auth } from "@/auth";
import { startPayment } from "@/lib/billing";
import { redirect } from "next/navigation";

export async function startYoCheckout(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const result = await startPayment({ userId: session.user.id, planCode: String(formData.get("planCode") || "monthly"), channel: "WEB" });
  redirect(`/dashboard/subscribe?pending=${result.transactionId}`);
}
