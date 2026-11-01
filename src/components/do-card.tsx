import Link from "next/link";
import { shortSubjectName } from "@/lib/taxonomy";
import { BookOpen, PencilLine, ArrowUpRight } from 'lucide-react';

export function DoCard({ name, color, noteHref, paperHref, paperCount }: { name: string; color: string; noteHref: string; paperHref: string; paperCount: number }) {
  return <article className="subject-tile bg-white"><div className="flex items-start justify-between"><span className="subject-icon" style={{ color, backgroundColor: `${color}15` }}><BookOpen className="h-6 w-6" /></span><span className="context-chip">{paperCount} papers</span></div><h2 className="font-display text-xl mt-5">{shortSubjectName(name)}</h2><p className="text-xs text-muted-foreground mt-2">Build understanding. Practise with purpose.</p><div className="grid grid-cols-2 gap-2 mt-5"><Link href={noteHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border text-xs font-bold hover:bg-muted"><BookOpen className="h-3.5 w-3.5" />Read notes</Link><Link href={paperHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-[var(--forest)]">{paperCount ? <><PencilLine className="h-3.5 w-3.5" />Practice</> : <>Explore<ArrowUpRight className="h-3.5 w-3.5" /></>}</Link></div></article>;
}
export function workLinks(classSlug: string, subject: { slug: string; notes: { id: string }[]; papers: { id: string }[] }) {
  const room = `/dashboard/classes/${classSlug}/${subject.slug}`;
  return { noteHref: subject.notes[0] ? `/dashboard/notes/${subject.notes[0].id}` : room, paperHref: subject.papers[0] ? `/dashboard/papers/${subject.papers[0].id}` : room };
}
