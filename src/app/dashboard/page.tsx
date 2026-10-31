import { redirect } from "next/navigation";
import LearnHome from "@/components/learn-home";
import { requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireUser();
  if (user.role === "SCHOOL_ADMIN") redirect("/dashboard/school");
  return <LearnHome />;
}
