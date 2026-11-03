import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { listLibrary } from "@/lib/fresh-teacher";
import { shortSubjectName } from "@/lib/taxonomy";

const kinds = [
  ["LESSON_NOTES", "Lesson notes"],
  ["PAST_PAPER", "Past papers"],
  ["SCHEME_OF_WORK", "Schemes"],
  ["HOLIDAY_PACKAGE", "Holiday"],
] as const;

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ class?: string; kind?: string; subject?: string }>;
}) {
  const { class: classKey, kind, subject } = await searchParams;
  const user = await requireUser();
  const classes = await db.classGrade.findMany({
    where: { isActive: true, freshTeacherKey: { not: null }, level: { slug: { in: ["pre-primary", "primary"] } } },
    orderBy: { order: "asc" },
    include: { subjects: { orderBy: { order: "asc" }, select: { name: true, freshTeacherKey: true } } },
  });
  const selected = classes.find((cls) => cls.freshTeacherKey === classKey) || classes.find((cls) => cls.id === user.classGradeId) || classes.find((cls) => cls.slug === "p7") || classes[0];
  const subjects = (selected?.subjects || [])
    .map((item) => ({ name: item.name, key: item.freshTeacherKey?.split(",")[0] || "" }))
    .filter((item) => item.key);
  const narrowed = Boolean(kind || subject);
  const items = narrowed && selected ? await listLibrary({
    classKey: selected.freshTeacherKey || undefined,
    kind: kind || undefined,
    subjectKeys: subject ? [subject] : undefined,
    limit: 18,
  }).catch(() => []) : [];
  const groups = new Map<string, typeof items>();
  for (const item of items) {
    const label = subjects.find((entry) => entry.key.toLowerCase() === item.subjectKey.toLowerCase())?.name || item.subjectKey;
    groups.set(label, [...(groups.get(label) || []), item]);
  }
  const classQuery = selected?.freshTeacherKey || "";

  return (
    <div className="space-y-4">
      <h1 className="font-display">Library</h1>
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {classes.map((cls) => (
          <Link key={cls.id} href={`/dashboard/library?class=${cls.freshTeacherKey}${kind ? `&kind=${kind}` : ""}`} className={`rounded-full px-3.5 py-2 text-sm font-bold whitespace-nowrap ${cls.id === selected?.id ? "bg-primary text-white" : "border bg-white"}`}>{cls.shortName}</Link>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <Link href={`/dashboard/library?class=${classQuery}${subject ? `&subject=${subject}` : ""}`} className={`rounded-full px-3.5 py-2 text-sm font-bold whitespace-nowrap ${!kind ? "bg-[var(--ink)] text-white" : "border bg-white"}`}>All types</Link>
        {kinds.map(([value, label]) => (
          <Link key={value} href={`/dashboard/library?class=${classQuery}&kind=${value}${subject ? `&subject=${subject}` : ""}`} className={`rounded-full px-3.5 py-2 text-sm font-bold whitespace-nowrap ${kind === value ? "bg-[var(--ink)] text-white" : "border bg-white"}`}>{label}</Link>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <Link href={`/dashboard/library?class=${classQuery}${kind ? `&kind=${kind}` : ""}`} className={`rounded-full px-3.5 py-2 text-sm font-bold whitespace-nowrap ${!subject ? "bg-primary text-white" : "border bg-white"}`}>All subjects</Link>
        {subjects.map((item) => (
          <Link key={item.key} href={`/dashboard/library?class=${classQuery}&subject=${item.key}${kind ? `&kind=${kind}` : ""}`} className={`rounded-full px-3.5 py-2 text-sm font-bold whitespace-nowrap ${subject === item.key ? "bg-primary text-white" : "border bg-white"}`}>{shortSubjectName(item.name)}</Link>
        ))}
      </div>
      {[...groups.entries()].map(([label, rows]) => (
        <section key={label}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{shortSubjectName(label)}</h2>
          <div className="mt-2 grid gap-2">
            {rows.map((item) => (
              <a key={item.pdfUrl} href={item.pdfUrl} target="_blank" rel="noreferrer" className="rounded-2xl border bg-white px-4 py-3 font-bold">{item.title}</a>
            ))}
          </div>
        </section>
      ))}
      {!narrowed && <p className="rounded-2xl border bg-white px-4 py-6 text-center font-bold">Choose a type or a subject. Files load after that, to save data.</p>}
      {narrowed && items.length === 0 && <p className="rounded-2xl border bg-white px-4 py-6 text-center font-bold">Nothing in this shelf yet.</p>}
    </div>
  );
}
