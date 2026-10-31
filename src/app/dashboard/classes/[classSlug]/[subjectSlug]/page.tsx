import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { attachLoose, PRIMARY_SUBJECTS, type LinkedTopic } from "@/lib/topics";
import { shortSubjectName } from "@/lib/taxonomy";
import { TopicList } from "@/components/topic-list";

export default async function SubjectRoomPage({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}) {
  const { classSlug, subjectSlug } = await params;

  const subject = await db.subject.findFirst({
    where: { slug: subjectSlug, classGrade: { slug: classSlug } },
    include: {
      classGrade: true,
      topics: {
        orderBy: { order: "asc" },
        include: {
          notes: { where: { status: "PUBLISHED" }, select: { id: true, title: true } },
          papers: { where: { status: "PUBLISHED" }, select: { id: true, title: true } },
        },
      },
      notes: { where: { status: "PUBLISHED", topicId: null }, select: { id: true, title: true } },
      papers: { where: { status: "PUBLISHED", topicId: null }, select: { id: true, title: true } },
    },
  });
  if (!subject) notFound();

  const topics = attachLoose(subject.topics as LinkedTopic[], subject.notes, subject.papers);
  const acrossYears = PRIMARY_SUBJECTS.some((item) => item.slug === subjectSlug);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <h1 className="font-display text-4xl">{shortSubjectName(subject.name)}</h1>
        {acrossYears && (
          <Link href={`/dashboard/curriculum?subject=${subjectSlug}`} className="text-sm font-bold text-primary">
            P.1–P.7
          </Link>
        )}
      </div>
      <TopicList topics={topics} />
      {subject.classGrade.freshTeacherKey && (
        <Link
          href={`/dashboard/library?class=${subject.classGrade.freshTeacherKey}`}
          className="inline-block text-sm font-bold text-primary"
        >
          GitHub files
        </Link>
      )}
    </div>
  );
}
