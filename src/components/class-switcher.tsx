import Link from "next/link";

export function ClassSwitcher({
  classes,
  currentSlug,
}: {
  classes: { slug: string; shortName: string }[];
  currentSlug: string;
}) {
  if (classes.length < 2) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {classes.map((cls) => (
        <Link
          key={cls.slug}
          href={`/dashboard/classes/${cls.slug}`}
          className={`rounded-full px-3 py-1.5 text-sm font-bold ${
            cls.slug === currentSlug ? "bg-white text-[var(--ink)]" : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          {cls.shortName}
        </Link>
      ))}
    </div>
  );
}

export function SubjectChips({
  classSlug,
  currentSlug,
  subjects,
}: {
  classSlug: string;
  currentSlug: string;
  subjects: { slug: string; name: string }[];
}) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {subjects.map((subject) => (
        <Link
          key={subject.slug}
          href={`/dashboard/classes/${classSlug}/${subject.slug}`}
          className={`rounded-full px-3 py-1.5 text-sm font-bold whitespace-nowrap ${
            subject.slug === currentSlug ? "bg-primary text-white" : "bg-white border"
          }`}
        >
          {subject.name.replace("Integrated ", "")}
        </Link>
      ))}
    </div>
  );
}
