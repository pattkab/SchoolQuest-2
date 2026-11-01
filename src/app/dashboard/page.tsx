import { redirect } from "next/navigation";
import LearnHome from "@/components/learn-home";
import { homeForRole, requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireUser();
  const home = homeForRole(user.role);
  if (home !== "/dashboard") redirect(home);
  return <LearnHome />;
}
