import Link from "next/link";
import { db } from "@/lib/db";
import { attachLoose, PRIMARY_CLASS_SLUGS, PRIMARY_SUBJECTS, type LinkedTopic } from "@/lib/topics";
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
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;
  const selected = PRIMARY_SUBJECTS.some((item) => item.slug === subject) ? subject! : "mathematics";
  const label = PRIMARY_SUBJECTS.find((item) => item.slug === selected)?.label ?? "Maths";

  const classes = await db.classGrade.findMany({
    where: { slug: { in: [...PRIMARY_CLASS_SLUGS] } },
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
        <h1 className="font-display text-4xl">{label}</h1>
        <p className="text-sm text-muted-foreground">
          {rows.length > 1 ? `${rows[0].shortName}–${rows[rows.length - 1].shortName}` : rows[0]?.shortName || "Primary"} topics. A coloured title opens the notes or paper.
        </p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {PRIMARY_SUBJECTS.map((item) => (
          <Link
            key={item.slug}
            href={`/dashboard/curriculum?subject=${item.slug}`}
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
