import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { schoolFor, todayKey } from "@/lib/school";
import { joinSchoolAction } from "@/app/actions/school";
import { QrScan } from "@/components/qr-scan";

export default async function AttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const user = await requireUser();
  if (user.role === "STUDENT") redirect("/dashboard/school");
  if (user.role !== "TEACHER" && user.role !== "SCHOOL_ADMIN") redirect("/dashboard");
  const school = await schoolFor(user);

  if (!school) {
    return (
      <div className="space-y-4 max-w-md">
        <h1 className="font-display text-4xl">Attend</h1>
        <p className="text-sm text-muted-foreground">Enter the code from your school admin.</p>
        {error && <p className="text-sm font-bold text-red-700">School code not found.</p>}
        <form action={joinSchoolAction} className="flex gap-2">
          <input name="schoolCode" placeholder="SQ-DEMO" className="h-12 flex-1 rounded-2xl border px-3" />
          <button type="submit" className="h-12 rounded-2xl bg-primary px-4 text-white font-bold">Join</button>
        </form>
      </div>
    );
  }

  const day = todayKey();
  const marks = await db.attendanceMark.findMany({
    where: { schoolId: school.id, day },
    include: { user: { include: { classGrade: true } } },
    orderBy: { createdAt: "desc" },
  });
  const messages = user.role === "TEACHER"
    ? await db.schoolMessage.findMany({
        where: { toId: user.id },
        include: { from: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      })
    : [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{school.name}</p>
        <h1 className="font-display text-4xl">Attend</h1>
        <p className="text-sm text-muted-foreground">{day}</p>
      </div>
      <QrScan />
      <div className="space-y-2">
        {marks.map((mark) => (
          <p key={mark.id} className="rounded-2xl bg-white border px-4 py-3 font-bold">
            {mark.user.name} · {mark.user.classGrade?.shortName} · {mark.user.studentNumber}
          </p>
        ))}
        {marks.length === 0 && <p className="text-sm text-muted-foreground">No one marked yet.</p>}
      </div>
      {messages.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-display text-2xl">Messages</h2>
          {messages.map((message) => (
            <p key={message.id} className="text-sm"><span className="font-bold">{message.from.name}</span> · {message.body}</p>
          ))}
        </section>
      )}
    </div>
  );
}
