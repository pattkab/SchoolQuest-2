import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { attachLoose, type LinkedTopic } from "@/lib/topics";
import { defaultSubjectSlug } from "@/lib/taxonomy";
import { LearnPicker, type LearnClass, type LearnItem } from "@/components/learn-picker";

function currentTerm() {
  const month = new Date().getMonth();
  if (month < 4) return "1";
  if (month < 8) return "2";
  return "3";
}

function itemsFor(subject: {
  topics: LinkedTopic[];
  notes: { id: string; title: string }[];
  papers: { id: string; title: string }[];
}): LearnItem[] {
  const seen = new Set<string>();
  const items: LearnItem[] = [];
  for (const topic of attachLoose(subject.topics, subject.notes, subject.papers)) {
    for (const note of topic.notes) {
      const key = `note:${note.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({ id: note.id, title: note.title, term: topic.term, kind: "note", href: `/dashboard/notes/${note.id}` });
    }
    for (const paper of topic.papers) {
      const key = `paper:${paper.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({ id: paper.id, title: paper.title, term: topic.term, kind: "paper", href: `/dashboard/papers/${paper.id}` });
    }
  }
  return items;
}

export default async function LearnHome({ query }: { query: { class?: string; subject?: string; term?: string; mode?: string } }) {
  const user = await requireUser();
  const grades = await db.classGrade.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: {
      slug: true,
      shortName: true,
      subjects: {
        orderBy: { order: "asc" },
        select: {
          slug: true,
          name: true,
          topics: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              name: true,
              term: true,
              notes: { where: { status: "PUBLISHED" }, orderBy: { order: "asc" }, select: { id: true, title: true } },
              papers: { where: { status: "PUBLISHED" }, orderBy: { createdAt: "asc" }, select: { id: true, title: true } },
            },
          },
          notes: { where: { status: "PUBLISHED", topicId: null }, select: { id: true, title: true } },
          papers: { where: { status: "PUBLISHED", topicId: null }, select: { id: true, title: true } },
        },
      },
    },
  });
  const classes: LearnClass[] = grades.map((grade) => ({
    slug: grade.slug,
    shortName: grade.shortName,
    subjects: grade.subjects.map((subject) => ({
      slug: subject.slug,
      name: subject.name,
      items: itemsFor(subject),
    })),
  }));
  const home = user.classGradeId ? await db.classGrade.findUnique({ where: { id: user.classGradeId }, select: { slug: true } }) : null;
  const classSlug = classes.some((item) => item.slug === query.class) ? query.class! : home?.slug || classes[0]?.slug || "";
  const grade = classes.find((item) => item.slug === classSlug);
  const subjectSlug = grade?.subjects.some((item) => item.slug === query.subject) ? query.subject! : defaultSubjectSlug(classSlug, grade?.subjects || []) || "";
  const mode = query.mode === "paper" ? "paper" : "notes";
  const explicitTerm = query.term === "1" || query.term === "2" || query.term === "3";
  let term = explicitTerm ? query.term! : currentTerm();
  if (!explicitTerm) {
    const chosen = grade?.subjects.find((item) => item.slug === subjectSlug);
    const kind = mode === "notes" ? "note" : "paper";
    const has = (value: string) => chosen?.items.some((item) => item.kind === kind && item.term === Number(value));
    if (!has(term)) term = (["1", "2", "3"] as const).find((value) => has(value)) || term;
  }
  if (!classSlug || !subjectSlug) return <p>No classes are ready yet.</p>;
  if (query.class !== classSlug || query.subject !== subjectSlug || query.term !== term || query.mode !== mode) {
    redirect(`/dashboard/learn?class=${classSlug}&subject=${subjectSlug}&term=${term}&mode=${mode}`);
  }
  return <LearnPicker classes={classes} classSlug={classSlug} subjectSlug={subjectSlug} term={term} mode={mode} />;
}
