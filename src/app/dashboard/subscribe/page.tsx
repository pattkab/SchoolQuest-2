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

  const hasActiveSubscription = Boolean(user.subscriptionEndsAt && user.subscriptionEndsAt > new Date());

  // Free practice is now per subject, not time-limited. Only Pro redirects.
  if (hasActiveSubscription) {
    redirect("/dashboard");
  }

  const userPhone = user.phone || "";

  return <SubscribeClient userPhone={userPhone} />;
}
