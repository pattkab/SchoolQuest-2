"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function googleSignInAction() {
  if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
    redirect("/login?error=google");
  }
  await signIn("google", { redirectTo: "/dashboard" });
}
