import { GettingStarted } from "@/components/getting-started";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { balance, schoolFor, ugx } from "@/lib/school";
import { enrolStudentAction, sendMessageAction } from "@/app/actions/school";
import { IdCard } from "@/components/id-card";
import { PasswordInput } from "@/components/fields";

export default async function SchoolHomePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const user = await requireUser();
  if (user.role === "TEACHER") redirect("/dashboard/school/attendance");
  const school = await schoolFor(user);

  if (user.role === "SCHOOL_ADMIN") {
    if (!school) redirect("/setup");
    const students = await db.user.findMany({
      where: { schoolId: school.id, role: "STUDENT" },
      include: { classGrade: true },
      orderBy: { name: "asc" },
    });
    const classes = await db.classGrade.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">School administrator</p>
          <h1 className="font-display text-4xl">{school.name}</h1>
          <p className="text-sm text-muted-foreground">School code {school.code} · Your school community, connected.</p>
        </div>
        <GettingStarted title="Get your school ready" steps={[
          { title: "Share your school code", detail: `Give ${school.code} to teachers so they can join your school from Attendance.` },
          { title: "Enrol a learner", detail: "Add their class and give them their temporary PIN privately.", href: "#enrol-learner" },
          { title: "Check attendance", detail: "Review who has been marked present today.", href: "/dashboard/school/attendance" },
        ]} />
        <section className="grid sm:grid-cols-3 gap-3"><Link href="/dashboard/school" className="metric-card tone-mint"><strong>{students.length}</strong><span>Enrolled learners</span></Link><Link href="/dashboard/school/fees" className="quest-panel font-bold text-sm">💳 Fees & payments<span className="block mt-2 text-xs font-normal text-muted-foreground">View school fee records →</span></Link><Link href="/dashboard/school/attendance" className="quest-panel font-bold text-sm">📋 Attendance<span className="block mt-2 text-xs font-normal text-muted-foreground">Keep track of each school day →</span></Link></section>
        <h2 id="enrol-learner" className="font-display text-xl">Welcome a new learner</h2>
        {error && <p className="rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">Check the form and try again.</p>}
        <form action={enrolStudentAction} className="rounded-3xl border bg-white p-4 grid sm:grid-cols-2 gap-3">
          <label className="space-y-2 text-xs font-bold">Learner’s name<input name="name" autoComplete="off" required placeholder="Full name" className="block w-full h-12 rounded-2xl border px-3 font-normal" /></label>
          <label className="space-y-2 text-xs font-bold">Phone number<input name="phone" type="tel" required placeholder="e.g. 0700 123 456" className="block w-full h-12 rounded-2xl border px-3 font-normal" /></label>
          <label className="space-y-2 text-xs font-bold">Class<select name="classGradeId" required className="block w-full h-12 rounded-2xl border px-3 font-normal">
            {classes.map((cls) => <option key={cls.id} value={cls.id}>{cls.shortName}</option>)}
          </select></label>
          <label className="space-y-2 text-xs font-bold">Registration number (optional)<input name="studentNumber" placeholder="School registration number" className="block w-full h-12 rounded-2xl border px-3 font-normal" /></label>
          <label className="space-y-2 text-xs font-bold">Temporary PIN<PasswordInput id="pin" name="pin" autoComplete="new-password" minLength={4} required placeholder="At least 4 characters" className="block w-full h-12 rounded-2xl border px-3 font-normal" /></label>
          <button type="submit" className="quest-button self-end">Enrol learner</button>
        </form>
        <div className="grid sm:grid-cols-2 gap-3">
          {students.map((student) => (
            <Link key={student.id} href={`/dashboard/school/students/${student.id}`} className="rounded-3xl border bg-white p-4">
              <p className="font-bold">{student.name}</p>
              <p className="text-sm text-muted-foreground">{student.classGrade?.shortName} · {student.studentNumber}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (!school || !user.studentNumber) {
    return (
      <div className="space-y-2">
        <h1 className="font-display text-4xl">School</h1>
        <p className="text-muted-foreground">Your school has not enrolled you yet.</p>
      </div>
    );
  }

  const [charges, payments, teachers, messages, attendance] = await Promise.all([
    db.feeCharge.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
    db.feePayment.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
    db.user.findMany({ where: { schoolId: school.id, role: "TEACHER" }, orderBy: { name: "asc" } }),
    db.schoolMessage.findMany({
      where: { OR: [{ fromId: user.id }, { toId: user.id }] },
      include: { from: true, to: true },
      orderBy: { createdAt: "desc" },
      take: 12,
    }),
    db.attendanceMark.findMany({ where: { userId: user.id }, orderBy: { day: "desc" }, take: 8 }),
  ]);
  const money = balance(charges, payments);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">School</p>
        <h1 className="font-display text-4xl">{school.name}</h1>
      </div>
      <IdCard
        name={user.name || "Learner"}
        studentNumber={user.studentNumber}
        school={school.name}
        className={user.classGrade?.shortName || ""}
      />
      <section className="rounded-3xl border bg-white p-4">
        <p className="text-sm text-muted-foreground">Balance</p>
        <p className="font-display text-4xl">{ugx(money.due)}</p>
        <p className="text-sm text-muted-foreground">{ugx(money.paid)} paid · {ugx(money.billed)} billed</p>
        <div className="mt-3 space-y-1 text-sm">
          {charges.map((row) => <p key={row.id}>{row.label} · {ugx(row.amount)}</p>)}
          {payments.map((row) => <p key={row.id}>Paid {ugx(row.amount)}{row.note ? ` · ${row.note}` : ""}</p>)}
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl">Teachers</h2>
        {teachers.map((teacher) => (
          <form key={teacher.id} action={sendMessageAction} className="rounded-3xl border bg-white p-4 space-y-2">
            <input type="hidden" name="toId" value={teacher.id} />
            <p className="font-bold">{teacher.name}</p>
            <div className="flex gap-2">
              <input name="body" required placeholder="Message" className="h-11 flex-1 rounded-2xl border px-3" />
              <button type="submit" className="h-11 rounded-2xl bg-primary px-4 text-white font-bold">Send</button>
            </div>
          </form>
        ))}
        {messages.map((message) => (
          <p key={message.id} className="text-sm">
            <span className="font-bold">{message.fromId === user.id ? "You" : message.from.name}</span> · {message.body}
          </p>
        ))}
      </section>
      <section>
        <h2 className="font-display text-2xl">Attendance</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {attendance.map((mark) => <span key={mark.id} className="rounded-full bg-white border px-3 py-1 text-sm font-bold">{mark.day}</span>)}
          {attendance.length === 0 && <p className="text-sm text-muted-foreground">No marks yet.</p>}
        </div>
      </section>
    </div>
  );
}
