import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser, isAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import { EngineForm } from "./EngineForm";

export default async function EnginePage() {
  const user = await requireUser();
  if (!isAdmin(user.role)) redirect("/dashboard");

  const [classes, papers, notes] = await Promise.all([
    db.classGrade.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: { subjects: { orderBy: { order: "asc" } } },
    }),
    db.paper.findMany({
      where: { sourceType: { in: ["SCAN", "PDF", "GITHUB"] } },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { subject: { include: { classGrade: true } }, _count: { select: { questions: true } } },
    }),
    db.note.findMany({
      where: { sourceType: { in: ["SCAN", "PDF", "GITHUB"] } },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { subject: { include: { classGrade: true } } },
    }),
  ]);

  const subjects = classes.flatMap((cls) =>
    cls.subjects.map((subject) => ({ id: subject.id, name: `${cls.shortName} · ${subject.name}` })),
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Site admin</p>
        <h1 className="font-display text-4xl">Engine</h1>
        <p className="text-sm text-muted-foreground">Scan, GitHub link, or PDF. Practice or notes.</p>
      </div>
      <EngineForm subjects={subjects} />
      <div className="space-y-2">
        {papers.map((paper) => (
          <Link key={paper.id} href={`/dashboard/papers/${paper.id}`} className="block rounded-2xl border bg-white px-4 py-3">
            <p className="font-bold">{paper.title}</p>
            <p className="text-sm text-muted-foreground">{paper.subject.classGrade.shortName} · {paper.sourceType} · {paper._count.questions} questions</p>
          </Link>
        ))}
        {notes.map((note) => (
          <Link key={note.id} href={`/dashboard/notes/${note.id}`} className="block rounded-2xl border bg-white px-4 py-3">
            <p className="font-bold">{note.title}</p>
            <p className="text-sm text-muted-foreground">{note.subject.classGrade.shortName} · {note.sourceType} · notes</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
