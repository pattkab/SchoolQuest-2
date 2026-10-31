import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { DoCard, workLinks } from "@/components/do-card";
import { shortSubjectName, splitSubjects } from "@/lib/taxonomy";

export default async function ClassRoomPage({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}) {
  const { classSlug } = await params;
  const cls = await db.classGrade.findUnique({
    where: { slug: classSlug },
    include: {
      subjects: {
        orderBy: { order: "asc" },
        include: {
          _count: { select: { notes: true, papers: true } },
          notes: { where: { status: "PUBLISHED" }, orderBy: { order: "asc" }, take: 1, select: { id: true } },
          papers: { where: { status: "PUBLISHED" }, orderBy: { createdAt: "asc" }, take: 1, select: { id: true } },
        },
      },
    },
  });
  if (!cls) notFound();
  const { core, more } = splitSubjects(cls.slug, cls.subjects);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl">{cls.shortName}</h1>
      <div className="grid sm:grid-cols-2 gap-3">
        {core.map((subject) => (
          <DoCard
            key={subject.id}
            name={subject.name}
            color={subject.color}
            paperCount={subject._count.papers}
            {...workLinks(cls.slug, subject)}
          />
        ))}
      </div>
      {more.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {more.map((subject) => (
            <Link
              key={subject.id}
              href={`/dashboard/classes/${cls.slug}/${subject.slug}`}
              className="rounded-full border bg-white px-3 py-1.5 text-sm font-bold"
            >
              {shortSubjectName(subject.name)}
              {subject._count.notes + subject._count.papers === 0 ? " · soon" : ""}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
