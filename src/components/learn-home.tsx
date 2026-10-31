import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { setStudentClassAction } from "@/app/actions/auth";
import { joinClassroomAction } from "@/app/actions/marking";
import { DoCard, workLinks } from "@/components/do-card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CLASS_BANDS, splitSubjects } from "@/lib/taxonomy";

const subjectPick = {
  orderBy: { order: "asc" as const },
  include: {
    _count: { select: { notes: true, papers: true } },
    notes: { where: { status: "PUBLISHED" }, orderBy: { order: "asc" as const }, take: 1, select: { id: true } },
    papers: { where: { status: "PUBLISHED" }, orderBy: { createdAt: "asc" as const }, take: 1, select: { id: true } },
  },
};

export default async function LearnHome() {
  const user = await requireUser();
  const classes = await db.classGrade.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { id: true, slug: true, shortName: true, name: true },
  });
  const myClass = user.classGradeId
    ? await db.classGrade.findUnique({
        where: { id: user.classGradeId },
        include: { subjects: subjectPick },
      })
    : null;
  const { core } = myClass ? splitSubjects(myClass.slug, myClass.subjects) : { core: [] };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Learn</p>
        <h1 className="font-display text-4xl">{user.name?.split(" ")[0] || "Start"}</h1>
        <p className="text-sm text-muted-foreground">
          {myClass ? myClass.shortName : "Pick your class"}
          {" · "}
          <Link href="/dashboard/curriculum" className="font-bold text-primary">Syllabus</Link>
        </p>
      </div>

      {!myClass && user.role === "STUDENT" && (
        <form action={setStudentClassAction} className="rounded-3xl bg-white border p-4 flex flex-col sm:flex-row gap-3">
          <input type="hidden" name="userId" value={user.id} />
          <select name="classGradeId" className="flex-1 h-12 rounded-2xl border px-3">
            {CLASS_BANDS.map((band) => (
              <optgroup key={band.id} label={band.short}>
                {classes.filter((cls) => (band.slugs as readonly string[]).includes(cls.slug)).map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.shortName}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <button type="submit" className="h-12 rounded-2xl px-6 bg-primary text-white font-bold">Save</button>
        </form>
      )}

      {myClass && (
        <section className="grid sm:grid-cols-2 gap-3">
          {core.map((subject) => (
            <DoCard
              key={subject.id}
              name={subject.name}
              color={subject.color}
              paperCount={subject._count.papers}
              {...workLinks(myClass.slug, subject)}
            />
          ))}
        </section>
      )}

      <form action={joinClassroomAction} className="flex gap-2 max-w-md">
        <Input name="code" placeholder="Class code" className="rounded-2xl" />
        <button type="submit" className="rounded-2xl px-4 bg-primary text-white font-bold">Join</button>
      </form>
    </div>
  );
}
