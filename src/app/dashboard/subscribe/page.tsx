import { auth } from "@/auth";
import { learnerBillingSummary } from "@/lib/entitlements";
import { redirect } from "next/navigation";
import SubscribeClient from "./SubscribeClient";

export default async function SubscribePage({ searchParams }: { searchParams: Promise<{ pending?: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const summary = await learnerBillingSummary(session.user.id);
  const { pending } = await searchParams;
  return <SubscribeClient summary={summary} pending={pending || ""} />;
}
