import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { canViewContent } from "@/lib/access";
import { NotesMarkdown } from "@/components/markdown";
import { ReadAloudButton } from '@/components/accessibility-tools';

export default async function NotePage({ params }: { params: Promise<{ noteId: string }> }) {
  const user = await requireUser();
  const { noteId } = await params;
  const note = await db.note.findUnique({
    where: { id: noteId },
    include: {
      subject: { include: { classGrade: true } },
      topic: { include: { papers: true } },
    },
  });
  if (!note || !canViewContent(user, note)) notFound();
  const quiz = note.topic?.papers[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6" data-reading-content>
      <Link
        href={`/dashboard/classes/${note.subject.classGrade.slug}/${note.subject.slug}`}
        className="text-sm font-bold text-primary"
      >
        ← {note.subject.classGrade.shortName} {note.subject.name}
      </Link>
      <header className="rounded-[1.8rem] bg-white border p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {note.topic?.name || note.subject.name} · {note.readingMinutes} min
        </p>
        <h1 className="font-display text-4xl mt-2">{note.title}</h1>
      </header>
      <ReadAloudButton label="Listen to this lesson" />
      <article className="rounded-[1.8rem] bg-white border p-6 md:p-10 shadow-sm">
        <NotesMarkdown content={note.content} />
      </article>
      {quiz && (
        <Link href={`/dashboard/papers/${quiz.id}`} className="block rounded-3xl bg-primary text-white px-6 py-4 font-bold">
          Practice
        </Link>
      )}
    </div>
  );
}
