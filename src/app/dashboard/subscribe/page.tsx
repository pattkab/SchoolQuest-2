import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import SubscribeClient from "./SubscribeClient";

export default async function SubscribePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/login");
  }

  const now = new Date();
  const hasActiveTrial = user.trialEndsAt && user.trialEndsAt > now;
  const hasActiveSubscription = user.subscriptionEndsAt && user.subscriptionEndsAt > now;

  // If already active, send back to dashboard
  if (hasActiveTrial || hasActiveSubscription) {
    redirect("/dashboard");
  }

  const userPhone = user.phone || "";

  return <SubscribeClient userPhone={userPhone} />;
}
