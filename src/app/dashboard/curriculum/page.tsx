import Link from "next/link";
import { db } from "@/lib/db";
import { attachLoose, PREPRIMARY_CLASS_SLUGS, PREPRIMARY_SUBJECTS, PRIMARY_CLASS_SLUGS, PRIMARY_SUBJECTS, type LinkedTopic } from "@/lib/topics";
import { TopicList } from "@/components/topic-list";

const topicInclude = {
  orderBy: { order: "asc" as const },
  include: {
    notes: { where: { status: "PUBLISHED" }, select: { id: true, title: true } },
    papers: { where: { status: "PUBLISHED" }, select: { id: true, title: true } },
  },
};

export default async function CurriculumPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; level?: string }>;
}) {
  const { subject, level } = await searchParams;
  const preprimary = level === "pre-primary";
  const catalog = preprimary ? PREPRIMARY_SUBJECTS : PRIMARY_SUBJECTS;
  const selected = catalog.some((item) => item.slug === subject) ? subject! : catalog[0].slug;
  const label = catalog.find((item) => item.slug === selected)?.label ?? "Maths";

  const classes = await db.classGrade.findMany({
    where: { slug: { in: [...(preprimary ? PREPRIMARY_CLASS_SLUGS : PRIMARY_CLASS_SLUGS)] } },
    orderBy: { order: "asc" },
    include: {
      subjects: {
        where: { slug: selected },
        include: {
          topics: topicInclude,
          notes: { where: { status: "PUBLISHED", topicId: null }, select: { id: true, title: true } },
          papers: { where: { status: "PUBLISHED", topicId: null }, select: { id: true, title: true } },
        },
      },
    },
  });

  const rows = classes.flatMap((cls) =>
    cls.subjects.map((item) => ({
      slug: cls.slug,
      shortName: cls.shortName,
      topics: attachLoose(item.topics as LinkedTopic[], item.notes, item.papers),
    })),
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">NCDC</p>
        <h1 className="font-display text-4xl">{preprimary ? "Pre-primary" : "Primary"} · {label}</h1>
      </div>
      <div className="flex gap-2">
        <Link href="/dashboard/curriculum?level=pre-primary" className={`rounded-full px-3.5 py-2 text-sm font-bold ${preprimary ? "bg-primary text-white" : "border bg-white"}`}>Pre-primary</Link>
        <Link href="/dashboard/curriculum?level=primary" className={`rounded-full px-3.5 py-2 text-sm font-bold ${preprimary ? "border bg-white" : "bg-primary text-white"}`}>Primary</Link>
      </div>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {catalog.map((item) => (
          <Link
            key={item.slug}
            href={`/dashboard/curriculum?level=${preprimary ? "pre-primary" : "primary"}&subject=${item.slug}`}
            className={`rounded-full px-3 py-1.5 text-sm font-bold whitespace-nowrap ${
              item.slug === selected ? "bg-primary text-white" : "bg-white border"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {rows.length === 0 && <p className="text-sm text-muted-foreground">This subject starts in a later class.</p>}

      {rows.map((row) => (
        <section key={row.slug} className="space-y-2">
          <h2 className="font-display text-2xl">
            <Link href={`/dashboard/classes/${row.slug}/${selected}`}>{row.shortName}</Link>
          </h2>
          <TopicList topics={row.topics} />
        </section>
      ))}
    </div>
  );
}
