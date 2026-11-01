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
    <article className="lift rounded-3xl border bg-white overflow-hidden" style={{ borderTop: `5px solid ${color}` }}>
      <p className="px-5 py-4 font-display text-2xl">{shortSubjectName(name)}</p>
      <div className="grid grid-cols-2 border-t text-base font-bold">
        <Link href={noteHref} className="py-3.5 text-center hover:bg-muted transition-colors">Read</Link>
        <Link href={paperHref} className={`py-3.5 text-center transition-colors ${paperCount ? "bg-primary text-white hover:bg-[var(--forest)]" : "text-muted-foreground"}`}>
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
