"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function suggestFeature(formData: FormData) {
  const message = String(formData.get("message") || "").trim().slice(0, 800);
  const requested = String(formData.get("category") || "FEATURE_REQUEST");
  const category = requested === "CONTENT_ISSUE" || requested === "GENERAL" ? requested : "FEATURE_REQUEST";
  const returnTo = String(formData.get("returnTo") || "/dashboard/settings");
  const base = returnTo.startsWith("/dashboard") ? returnTo.split("?")[0] : "/dashboard/settings";
  if (message.length < 4) redirect(`${base}?suggestion=short`);
  const session = await auth();
  await db.feedback.create({
    data: {
      userId: session?.user?.id,
      category,
      message,
    },
  });
  redirect(`${base}?suggestion=sent`);
}
