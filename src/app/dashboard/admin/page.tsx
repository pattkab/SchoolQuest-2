import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser, isAdmin } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminHomePage() {
  const user = await requireUser();
  if (!isAdmin(user.role)) redirect("/dashboard");

  const [learners, teachers, pendingTeachers, notes, quizzes, pendingMarks, people] = await Promise.all([
    db.user.count({ where: { role: "STUDENT" } }),
    db.teacherProfile.count({ where: { status: "ACCREDITED" } }),
    db.teacherProfile.count({ where: { status: "PENDING" } }),
    db.note.count(),
    db.paper.count(),
    db.answer.count({ where: { gradingStatus: "PENDING_TEACHER" } }),
    db.user.count(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Site administrator</p>
        <h1 className="font-display text-4xl">Admin</h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Tile href="/dashboard/admin/teachers" label="Pending teachers" value={String(pendingTeachers)} note={`${teachers} accredited`} />
        <Tile href="/dashboard/teacher/marking" label="Scripts to mark" value={String(pendingMarks)} note={`${learners} learners`} />
        <Tile href="/dashboard/admin/engine" label="Engine" value="Read a paper" note="Scan, GitHub link, or PDF" />
        <Tile href="/dashboard/admin/library" label="Notes & practice" value={String(notes + quizzes)} note={`${notes} notes · ${quizzes} papers`} />
        <Tile href="/dashboard/admin/store" label="SchoolQuest Store" value="Manage" note="Products and order requests" />
        <Tile href="/dashboard/admin/analytics" label="Users" value={String(people)} note="Weekly and monthly curves" />
        <Tile href="/dashboard/admin/readiness" label="Impact and funding" value="Internal" note="Real counts only" />
      </div>
    </div>
  );
}

function Tile({ href, label, value, note }: { href: string; label: string; value: string; note: string }) {
  return (
    <Link href={href} className="rounded-[1.6rem] bg-white border p-5 hover:shadow-lg transition-shadow">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-4xl mt-2">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{note}</p>
    </Link>
  );
}
