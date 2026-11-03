import { GettingStarted } from "@/components/getting-started";
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
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Site manager</p>
        <h1 className="font-display mt-2">Your platform, at a glance.</h1>
        <p className="mt-3 text-sm text-muted-foreground">Support your educators, review content, and keep learning moving.</p>
      </div>
      <GettingStarted title="Set up your site manager workspace" steps={[
        { title: "Review teacher applications", detail: "Check pending applications and record your decisions.", href: "/dashboard/admin/teachers" },
        { title: "Review the learning library", detail: "Check the notes and practice available to learners.", href: "/dashboard/admin/library" },
        { title: "Check platform activity", detail: "See how many learners and educators are using School Quest.", href: "/dashboard/admin/analytics" },
      ]} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Tile href="/dashboard/admin/teachers" label="Pending teachers" value={String(pendingTeachers)} note={`${teachers} accredited`} />
        <Tile href="/dashboard/teacher/marking" label="Scripts to mark" value={String(pendingMarks)} note={`${learners} learners`} />
        <Tile href="/dashboard/teacher/digitization" label="Examination Factory" value="Fresh Teacher" note="Queue papers, then approve them" />
        <Tile href="/dashboard/admin/engine" label="Content studio" value="Add resources" note="Scan, GitHub link, or PDF" />
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
    <Link href={href} className="quest-panel subject-tile">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-2xl mt-3">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{note}</p>
    </Link>
  );
}
