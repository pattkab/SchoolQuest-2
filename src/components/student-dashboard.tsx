import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/session';
import { classWithTerm, shortSubjectName } from '@/lib/taxonomy';
import { ClassDoors } from '@/components/class-doors';
import { QuestArt } from '@/components/quest-art';
import { QuestDoor } from '@/components/quest-door';
import { StudentsPhoto } from '@/components/students-photo';
import { ArrowRight, Flame, Sparkles, Trophy, ChevronRight } from 'lucide-react';
export default async function StudentDashboard() {
  const user = await requireUser();
  const [subjects, completed, recent, continuing, grades] = await Promise.all([
    user.classGradeId ? db.subject.findMany({ where: { classGradeId: user.classGradeId }, orderBy: { order: 'asc' }, include: { _count: { select: { notes: { where: { status: 'PUBLISHED' } }, papers: { where: { status: 'PUBLISHED' } } } }, notes: { where: { status: 'PUBLISHED' }, orderBy: { order: 'asc' }, take: 1, select: { id: true, title: true } }, papers: { where: { status: 'PUBLISHED' }, take: 1, select: { id: true } } } }) : [],
    db.attempt.count({ where: { userId: user.id, completedAt: { not: null } } }),
    db.attempt.findMany({ where: { userId: user.id, completedAt: { not: null } }, orderBy: { completedAt: 'desc' }, take: 3, include: { paper: { include: { subject: true } } } }),
    db.attempt.findFirst({ where: { userId: user.id, status: 'IN_PROGRESS', completedAt: null, paper: { status: 'PUBLISHED' } }, orderBy: { startedAt: 'desc' }, include: { paper: true } }),
    user.classGradeId ? Promise.resolve([]) : db.classGrade.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, select: { id: true, shortName: true } }),
  ]);
  const firstNote = subjects.find(subject => subject.notes.length)?.notes[0];
  const nextHref = continuing ? `/dashboard/papers/${continuing.paperId}` : firstNote ? `/dashboard/notes/${firstNote.id}` : '/dashboard/learn';
  const libraryClass = user.classGrade?.freshTeacherKey;
  const libraryKinds = [["LESSON_NOTES", "Lesson notes"], ["PAST_PAPER", "Past papers"], ["SCHEME_OF_WORK", "Schemes"], ["HOLIDAY_PACKAGE", "Holiday"]] as const;
  return <div className="space-y-4">
    <div className="flex items-center justify-between gap-3"><h1 className="font-display">Hey, {user.name?.split(' ')[0] || 'explorer'}</h1><span className="context-chip shrink-0">{classWithTerm(user.classGrade?.shortName)}</span></div>
    <figure className="students-feature">
      <StudentsPhoto className="students-feature-photo students-feature-photo-compact" />
      <figcaption>Big smiles. Bright futures.</figcaption>
    </figure>
    {user.classGradeId ? <section className="learning-hero">
      <div className="relative z-10 min-w-0"><h2 className="font-display max-w-md text-2xl">Continue where you left off</h2><Link href={nextHref} className="quest-button quest-button-light mt-4">{continuing ? 'Continue' : 'Open the door'}<ArrowRight className="h-4 w-4" /></Link></div>
      <QuestArt compact />
    </section> : <section className="space-y-3"><h2 className="font-display text-2xl">Pick your door</h2><ClassDoors name={user.name || ""} phone={user.phone || ""} classes={grades} /></section>}
    <section aria-label="Your learning progress" className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {[{ icon: Flame, value: user.currentStreak, label: 'Day streak', tone: 'peach' }, { icon: Sparkles, value: user.xp, label: 'Learning XP', tone: 'lilac' }, { icon: Trophy, value: completed, label: 'Papers completed', tone: 'mint' }].map(({ icon: Icon, value, label, tone }) => <Link href="/dashboard/progress" key={label} className={`metric-card tone-${tone}`}><span className="metric-icon"><Icon className="h-5 w-5" /></span><strong>{value.toLocaleString()}</strong><span>{label}</span></Link>)}
    </section>
    {subjects.length ? <section><div className="section-heading"><h2 className="font-display text-xl">Open a subject</h2><Link href="/dashboard/learn" className="text-xs font-bold text-primary inline-flex items-center gap-1">All <ChevronRight className="h-4 w-4" /></Link></div>
      <div className="quest-doors mt-4">{subjects.slice(0, 6).map((subject, index) => <QuestDoor key={subject.id} tone={index} href={`/dashboard/learn?class=${user.classGrade?.slug}&subject=${subject.slug}&mode=notes`} label={shortSubjectName(subject.name)} />)}</div>
    </section> : null}
    {libraryClass && <section className="space-y-2"><h2 className="font-display text-xl">Library doors</h2><div className="quest-doors">{libraryKinds.map(([kind, label], index) => <QuestDoor key={kind} tone={index} href={`/dashboard/library?class=${libraryClass}&kind=${kind}`} label={label} />)}</div></section>}
    {recent.length > 0 && <section className="quest-panel"><h2 className="font-display text-lg">Recent papers</h2><div className="mt-2 divide-y">{recent.map(attempt => <Link key={attempt.id} href={`/dashboard/attempts/${attempt.id}`} className="flex items-center gap-3 py-3"><span className="min-w-0 flex-1 truncate text-sm font-bold">{attempt.paper.title}</span><ChevronRight className="h-4 w-4" /></Link>)}</div></section>}
  </div>;
}
