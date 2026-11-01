"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function completeGoogleSignIn(idToken: string) {
  try {
    await signIn("credentials", { idToken, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) redirect("/login?error=google");
    throw error;
  }
}
