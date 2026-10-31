import { db } from "@/lib/db";
import { FRESH_TEACHER_FEEDS, listLibrary } from "@/lib/fresh-teacher";
import { CLASS_BANDS } from "@/lib/taxonomy";
import Link from "next/link";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ class?: string; kind?: string }>;
}) {
  const { class: classKey, kind } = await searchParams;
  const classes = await db.classGrade.findMany({
    where: { isActive: true, freshTeacherKey: { not: null } },
    orderBy: { order: "asc" },
  });
  const items = await listLibrary({
    classKey: classKey || classes.find((c) => c.slug === "p7")?.freshTeacherKey || undefined,
    kind: kind || undefined,
    limit: 36,
  }).catch(() => []);

  const kinds = Array.from(new Set(FRESH_TEACHER_FEEDS.map((f) => f.kind)));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl">Library</h1>

      <div className="space-y-3">
        {CLASS_BANDS.map((band) => {
          const bandClasses = classes.filter((cls) => (band.slugs as readonly string[]).includes(cls.slug));
          if (!bandClasses.length) return null;
          return (
            <div key={band.id}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{band.label}</p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {bandClasses.map((cls) => (
                  <Link
                    key={cls.id}
                    href={`/dashboard/library?class=${cls.freshTeacherKey}${kind ? `&kind=${kind}` : ""}`}
                    className={`rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap ${classKey === cls.freshTeacherKey || (!classKey && cls.slug === "p7") ? "bg-primary text-white" : "bg-white border"}`}
                  >
                    {cls.shortName}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <Link href={`/dashboard/library${classKey ? `?class=${classKey}` : ""}`} className={`rounded-full px-3 py-1.5 text-xs font-bold ${!kind ? "bg-[var(--ink)] text-white" : "bg-white border"}`}>All</Link>
        {kinds.map((k) => (
          <Link key={k} href={`/dashboard/library?class=${classKey || "PrimarySeven"}&kind=${k}`} className={`rounded-full px-3 py-1.5 text-xs font-bold ${kind === k ? "bg-[var(--ink)] text-white" : "bg-white border"}`}>
            {k.replaceAll("_", " ")}
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <a key={item.pdfUrl} href={item.pdfUrl} target="_blank" rel="noreferrer" className="rounded-[1.5rem] bg-white border p-4 hover:shadow-lg transition-shadow">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{item.kind.replaceAll("_", " ")} · {item.subjectKey}</p>
            <p className="font-bold mt-2">{item.title}</p>
            {item.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>}
          </a>
        ))}
        {items.length === 0 && (
          <p className="col-span-full rounded-[1.5rem] border bg-white p-8 text-muted-foreground">
            No files for this filter.
          </p>
        )}
      </div>
    </div>
  );
}
