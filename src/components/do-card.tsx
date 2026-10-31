import Link from "next/link";
import { shortSubjectName } from "@/lib/taxonomy";

export function DoCard({
  name,
  color,
  noteHref,
  paperHref,
  paperCount,
}: {
  name: string;
  color: string;
  noteHref: string;
  paperHref: string;
  paperCount: number;
}) {
  return (
    <article className="rounded-3xl border bg-white overflow-hidden" style={{ borderTop: `4px solid ${color}` }}>
      <p className="px-4 py-3 font-display text-xl">{shortSubjectName(name)}</p>
      <div className="grid grid-cols-2 border-t text-sm font-bold">
        <Link href={noteHref} className="py-3 text-center hover:bg-muted">Read</Link>
        <Link href={paperHref} className={`py-3 text-center ${paperCount ? "bg-primary text-white" : "text-muted-foreground"}`}>
          {paperCount ? "Practice" : "Soon"}
        </Link>
      </div>
    </article>
  );
}

export function workLinks(
  classSlug: string,
  subject: { slug: string; notes: { id: string }[]; papers: { id: string }[] },
) {
  const room = `/dashboard/classes/${classSlug}/${subject.slug}`;
  return {
    noteHref: subject.notes[0] ? `/dashboard/notes/${subject.notes[0].id}` : room,
    paperHref: subject.papers[0] ? `/dashboard/papers/${subject.papers[0].id}` : room,
  };
}
