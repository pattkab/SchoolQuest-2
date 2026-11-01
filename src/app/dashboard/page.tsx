import { redirect } from "next/navigation";
import StudentDashboard from "@/components/student-dashboard";
import { homeForRole, requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireUser();
  const home = homeForRole(user.role);
  if (home !== "/dashboard") redirect(home);
  return <StudentDashboard />;
}
