import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { TrendChart } from "@/components/trend-chart";
import { classWithTerm, shortSubjectName } from "@/lib/taxonomy";

const PASS = 0.5;

export default async function ProgressPage() {
  const user = await requireUser();
  const attempts = await db.attempt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
    include: { paper: { include: { subject: { include: { classGrade: true } } } } },
  });
  const scored = attempts.filter((attempt) => attempt.maxScore > 0);
  const passed = scored.filter((attempt) => attempt.score / attempt.maxScore >= PASS);
  const passRate = scored.length ? Math.round((passed.length / scored.length) * 100) : 0;

  const bySubject = new Map<string, { name: string; href: string; total: number; count: number }>();
  for (const attempt of scored) {
    const subject = attempt.paper.subject;
    const row = bySubject.get(subject.id) || {
      name: `${subject.classGrade.shortName} ${shortSubjectName(subject.name)}`,
      href: `/dashboard/classes/${subject.classGrade.slug}/${subject.slug}`,
      total: 0,
      count: 0,
    };
    row.total += (attempt.score / attempt.maxScore) * 100;
    row.count += 1;
    bySubject.set(subject.id, row);
  }
  const subjects = [...bySubject.values()]
    .map((row) => ({ ...row, average: Math.round(row.total / row.count) }))
    .sort((a, b) => a.average - b.average);
  const revise = subjects.filter((row) => row.average < PASS * 100);
  const focus = (revise.length ? revise : subjects).slice(0, 3);

  const scores = scored.slice(-8).map((attempt) => ({
    label: shortSubjectName(attempt.paper.subject.name).slice(0, 6),
    value: Math.round((attempt.score / attempt.maxScore) * 100),
  }));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Your dashboard</p>
        <h1 className="font-display text-4xl">{user.name || "Learner"}</h1>
        <p className="text-sm text-muted-foreground">
          {[user.classGrade ? classWithTerm(user.classGrade.shortName) : null, user.school, user.studentNumber].filter(Boolean).join(" · ") || "Add your class in Profile"}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Pass rate" value={scored.length ? `${passRate}%` : "—"} />
        <Stat label="Exams" value={String(attempts.length)} />
        <Stat label="Passed" value={String(passed.length)} />
      </div>

      {scores.length > 1 && <TrendChart title="Your scores" points={scores} />}

      <section className="space-y-2">
        <h2 className="font-display text-2xl">Revise</h2>
        {focus.length === 0 && <p className="text-sm text-muted-foreground">Sit a paper and weak topics will show here.</p>}
        {focus.map((row) => (
          <Link key={row.href} href={row.href} className="flex items-center justify-between rounded-3xl border bg-white px-4 py-3">
            <span className="font-bold">{row.name}</span>
            <span className="text-sm font-bold text-primary">{row.average}% · open</span>
          </Link>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-2xl">Exams</h2>
        {[...attempts].reverse().map((attempt) => {
          const percent = attempt.maxScore ? Math.round((attempt.score / attempt.maxScore) * 100) : 0;
          return (
            <Link key={attempt.id} href={`/dashboard/attempts/${attempt.id}`} className="flex items-center justify-between rounded-3xl border bg-white px-4 py-3">
              <span>
                <span className="block font-bold">{attempt.paper.title}</span>
                <span className="text-sm text-muted-foreground">{attempt.paper.subject.classGrade.shortName} · {shortSubjectName(attempt.paper.subject.name)} · {attempt.status === "IN_PROGRESS" ? (attempt.pausedAt ? "Paused" : "In progress") : "Submitted"}{spentLabel(attempt.timeSpentSeconds)}</span>
              </span>
              <span className="font-display text-2xl">{percent}%</span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

function spentLabel(seconds: number) {
  if (seconds <= 0) return "";
  if (seconds < 60) return ` · ${seconds} sec`;
  return ` · ${Math.floor(seconds / 60)} min`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-3xl mt-1">{value}</p>
    </div>
  );
}
