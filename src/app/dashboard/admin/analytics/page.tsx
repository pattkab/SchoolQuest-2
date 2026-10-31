import { db } from "@/lib/db";
import { requireUser, isAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import { TrendChart } from "@/components/trend-chart";
import { monthlyCounts, weeklyCounts } from "@/lib/trends";

export default async function AdminAnalyticsPage() {
  const user = await requireUser();
  if (!isAdmin(user.role)) redirect("/dashboard");

  const users = await db.user.findMany({ select: { role: true, createdAt: true } });
  const dates = users.map((row) => row.createdAt);
  const students = users.filter((row) => row.role === "STUDENT").length;
  const teachers = users.filter((row) => row.role === "TEACHER").length;
  const schools = users.filter((row) => row.role === "SCHOOL_ADMIN").length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Site admin</p>
        <h1 className="font-display text-4xl">Users</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="All users" value={String(users.length)} />
        <Stat label="Students" value={String(students)} />
        <Stat label="Teachers" value={String(teachers)} />
        <Stat label="Schools" value={String(schools)} />
      </div>
      <TrendChart title="New users each week" points={weeklyCounts(dates)} />
      <TrendChart title="New users each month" points={monthlyCounts(dates)} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-4xl mt-1">{value}</p>
    </div>
  );
}
