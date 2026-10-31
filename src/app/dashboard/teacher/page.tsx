import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { createClassroomAction } from "@/app/actions/marking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function TeacherDeskPage() {
  const user = await requireUser();
  const profile = user.teacherProfile;
  const classes = await db.classGrade.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  const rooms = await db.classroom.findMany({
    where: { teacherId: user.id },
    include: { classGrade: true, _count: { select: { enrollments: true } } },
  });
  const pending = await db.answer.count({ where: { gradingStatus: "PENDING_TEACHER" } });

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-[var(--ink)] text-white p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">Teacher desk</p>
        <h1 className="font-display text-4xl mt-2">{profile?.fullName || user.name || "Teacher"}</h1>
        <p className="text-white/75 mt-2">
          {profile ? `${profile.registrationNumber} · ${profile.status}` : "Apply to mark."}
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <Link href="/dashboard/teacher/marking" className="rounded-full bg-white text-[var(--ink)] px-5 py-2 font-bold">
            Marking queue · {pending}
          </Link>
          <Link href="/dashboard/teacher/upload" className="rounded-full border border-white/30 px-5 py-2 font-bold">
            Upload a paper
          </Link>
        </div>
      </div>

      {(!profile || profile.status !== "ACCREDITED") && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN" && (
        <div className="rounded-[1.5rem] bg-amber-50 border border-amber-100 p-5">
          <p className="font-bold">{profile?.status || "Apply to mark"}</p>
          {!profile && <Link href="/register/teacher" className="inline-block mt-3 font-bold text-primary">Apply</Link>}
        </div>
      )}

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-[1.6rem] bg-white border p-5 space-y-3">
          <h2 className="font-display text-2xl">Your classrooms</h2>
          {rooms.map((room) => (
            <Link key={room.id} href={`/dashboard/classes/${room.classGrade.slug}`} className="block rounded-2xl bg-muted px-4 py-3">
              <p className="font-bold">{room.name}</p>
              <p className="text-xs text-muted-foreground">{room.classGrade.name} · code {room.code} · {room._count.enrollments} learners</p>
            </Link>
          ))}
        </div>
        {(profile?.status === "ACCREDITED" || user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
        <form action={createClassroomAction} className="rounded-[1.6rem] bg-white border p-5 space-y-3">
          <h2 className="font-display text-2xl">Open a classroom</h2>
          <Input name="name" placeholder="P.6 Afternoon revision" className="rounded-2xl" required />
          <select name="classGradeId" className="w-full h-11 rounded-2xl border px-3">
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <Input name="description" placeholder="What this room is for" className="rounded-2xl" />
          <button type="submit" className="rounded-2xl h-11 px-5 bg-primary text-white font-bold">Create room</button>
        </form>
        )}
      </section>
    </div>
  );
}
