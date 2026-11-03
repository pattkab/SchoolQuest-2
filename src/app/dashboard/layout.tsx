import { DashboardShell } from "@/components/shell";
import { requireUser } from "@/lib/session";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  if (!user.profileComplete || (user.role === "STUDENT" && !user.classGradeId)) {
    const { redirect } = await import("next/navigation");
    redirect("/setup");
  }
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
