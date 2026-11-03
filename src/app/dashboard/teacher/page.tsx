import { GettingStarted } from "@/components/getting-started";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser, homeForRole } from "@/lib/session";
import { reviewableAnswersWhere } from "@/lib/access";
import { createClassroomAction } from "@/app/actions/marking";
import { ClipboardCheck, Users, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function TeacherDeskPage() {
  const user = await requireUser();
  if (user.role === "STUDENT" || user.role === "PARENT") redirect(homeForRole(user.role));
  const profile = user.teacherProfile;
  const accredited = profile?.status === "ACCREDITED";
  const applicationStatus = profile?.status === "PENDING" ? "Accreditation under review" : profile?.status === "REJECTED" ? "Accreditation was declined" : profile?.status === "SUSPENDED" ? "Accreditation suspended" : "Accredited teacher";
  const classes = await db.classGrade.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  const rooms = await db.classroom.findMany({
    where: { teacherId: user.id },
    include: { classGrade: true, _count: { select: { enrollments: true } } },
  });
  const pending = await db.answer.count({ where: reviewableAnswersWhere(user) });

  return (
    <div className="space-y-8">
      <div className="learning-hero teacher-hero">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">YOUR TEACHING DASHBOARD</p>
        <h1 className="font-display text-4xl mt-2">Hello, {profile?.fullName || user.name || "teacher"} 👋</h1>
        <p className="text-white/75 mt-2">
          {profile ? `${profile.registrationNumber} · ${applicationStatus}` : "A space to help every learner grow."}
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

      <section className="grid grid-cols-3 gap-3" aria-label="Teaching overview">
        {[{ icon: ClipboardCheck, value: pending, label: "Awaiting marking", tone: "peach" }, { icon: GraduationCap, value: rooms.length, label: "Your classrooms", tone: "lilac" }, { icon: Users, value: rooms.reduce((total, room) => total + room._count.enrollments, 0), label: "Enrolled learners", tone: "mint" }].map(({ icon: Icon, value, label, tone }) => <div key={label} className={`metric-card tone-${tone}`}><Icon className="h-5 w-5" /><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      {user.role === "TEACHER" && <GettingStarted title="Set up your teaching workspace"
        intro={profile?.status === "PENDING" ? "Your application is under review. You can join your school for attendance while you wait." : profile?.status === "REJECTED" ? "Your accreditation was declined. Contact your site manager about the decision." : undefined}
        steps={[
          { title: user.schoolId ? "Open attendance" : "Join your school", detail: "Ask your school administrator for the school code, then enter it on the Attendance page.", href: "/dashboard/school/attendance" },
          !profile ? { title: "Apply for accreditation", detail: "Use your MoES or UTS registration number to apply to mark work.", href: "/register/teacher" }
            : { title: accredited ? "Review learner work" : applicationStatus, detail: accredited ? "Open your marking queue to see work awaiting review." : "Your site manager handles accreditation decisions.", href: accredited ? "/dashboard/teacher/marking" : undefined },
          { title: "Open a classroom", detail: accredited ? "Create a room below and share its code with your learners." : "Classroom creation opens once your accreditation is approved.", href: accredited ? "#open-classroom" : undefined },
        ]} />}

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-[1.6rem] bg-white border p-5 space-y-3">
          <h2 className="font-display text-2xl">Your classrooms</h2>
          {!rooms.length && <p className="rounded-2xl bg-muted/60 p-5 text-sm text-muted-foreground">Your next classroom starts here. Create a room and share its code with your learners.</p>}
          {rooms.map((room) => (
            <Link key={room.id} href={`/dashboard/classes/${room.classGrade.slug}`} className="block rounded-2xl bg-muted px-4 py-3">
              <p className="font-bold">{room.name}</p>
              <p className="text-xs text-muted-foreground">{room.classGrade.name} · code {room.code} · {room._count.enrollments} learners</p>
            </Link>
          ))}
        </div>
        {(profile?.status === "ACCREDITED" || user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
        <form id="open-classroom" action={createClassroomAction} className="rounded-[1.6rem] bg-white border p-5 space-y-3">
          <h2 className="font-display text-2xl">Open a classroom</h2>
          <label htmlFor="classroom-name" className="block text-xs font-bold">Classroom name</label>
          <Input id="classroom-name" name="name" placeholder="P.6 Afternoon revision" className="rounded-2xl" required />
          <label htmlFor="classroom-grade" className="block text-xs font-bold">Class</label>
          <select id="classroom-grade" name="classGradeId" className="w-full h-11 rounded-2xl border px-3">
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <label htmlFor="classroom-description" className="block text-xs font-bold">Description (optional)</label>
          <Input id="classroom-description" name="description" placeholder="What this room is for" className="rounded-2xl" />
          <button type="submit" className="rounded-2xl h-11 px-5 bg-primary text-white font-bold">Create room</button>
        </form>
        )}
      </section>
    </div>
  );
}
