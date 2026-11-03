import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/session';
import { classWithTerm, shortSubjectName } from '@/lib/taxonomy';
import { QuestArt } from '@/components/quest-art';
import { StudentsPhoto } from '@/components/students-photo';
import { ArrowRight, BookOpen, Flame, Sparkles, Trophy, ChevronRight, Calculator, FlaskConical, Languages, Globe, Compass } from 'lucide-react';

const subjectIcons = [Calculator, Languages, FlaskConical, Globe, BookOpen, Compass];
export default async function StudentDashboard() {
  const user = await requireUser();
  const [subjects, completed, recent, continuing] = await Promise.all([
    user.classGradeId ? db.subject.findMany({ where: { classGradeId: user.classGradeId }, orderBy: { order: 'asc' }, include: { _count: { select: { notes: { where: { status: 'PUBLISHED' } }, papers: { where: { status: 'PUBLISHED' } } } }, notes: { where: { status: 'PUBLISHED' }, orderBy: { order: 'asc' }, take: 1, select: { id: true, title: true } }, papers: { where: { status: 'PUBLISHED' }, take: 1, select: { id: true } } } }) : [],
    db.attempt.count({ where: { userId: user.id, completedAt: { not: null } } }),
    db.attempt.findMany({ where: { userId: user.id, completedAt: { not: null } }, orderBy: { completedAt: 'desc' }, take: 3, include: { paper: { include: { subject: true } } } }),
    db.attempt.findFirst({ where: { userId: user.id, status: 'IN_PROGRESS', completedAt: null, paper: { status: 'PUBLISHED' } }, orderBy: { startedAt: 'desc' }, include: { paper: true } }),
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
    <section className="learning-hero">
      <div className="relative z-10 min-w-0"><h2 className="font-display max-w-md text-2xl">Continue where you left off</h2><Link href={nextHref} className="quest-button quest-button-light mt-4">{continuing ? 'Continue' : 'Start'}<ArrowRight className="h-4 w-4" /></Link></div>
      <QuestArt compact />
    </section>
    <section aria-label="Your learning progress" className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {[{ icon: Flame, value: user.currentStreak, label: 'Day streak', tone: 'peach' }, { icon: Sparkles, value: user.xp, label: 'Learning XP', tone: 'lilac' }, { icon: Trophy, value: completed, label: 'Papers completed', tone: 'mint' }].map(({ icon: Icon, value, label, tone }) => <Link href="/dashboard/progress" key={label} className={`metric-card tone-${tone}`}><span className="metric-icon"><Icon className="h-5 w-5" /></span><strong>{value.toLocaleString()}</strong><span>{label}</span></Link>)}
    </section>
    <section><div className="section-heading"><h2 className="font-display text-xl">Subjects</h2><Link href="/dashboard/learn" className="text-xs font-bold text-primary inline-flex items-center gap-1">All <ChevronRight className="h-4 w-4" /></Link></div>
      {subjects.length ? <div className="stagger grid grid-cols-2 lg:grid-cols-3 gap-3 mt-4">{subjects.slice(0, 6).map((subject, index) => { const Icon = subjectIcons[index % subjectIcons.length]; return <Link key={subject.id} href={`/dashboard/learn?class=${user.classGrade?.slug}&subject=${subject.slug}&mode=notes`} className={`subject-tile subject-tone-${index % 4}`}><span className="subject-icon"><Icon className="h-6 w-6" /></span><h3 className="mt-4 text-sm sm:text-base font-extrabold">{shortSubjectName(subject.name)}</h3><p className="mt-1 text-xs text-muted-foreground">{subject._count.notes} notes · {subject._count.papers} practice papers</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold">Explore <ArrowRight className="h-3.5 w-3.5" /></span></Link>; })}</div> : <div className="quest-panel mt-4 text-center"><BookOpen className="mx-auto h-8 w-8 text-primary" /><h3 className="font-display mt-3 text-xl">Choose your class</h3><Link href="/setup" className="quest-button mt-4">Choose your class <ArrowRight className="h-4 w-4" /></Link></div>}
    </section>
    {libraryClass && <section className="space-y-2"><h2 className="font-display text-xl">Library</h2><div className="flex gap-2 overflow-x-auto no-scrollbar">{libraryKinds.map(([kind, label]) => <Link key={kind} href={`/dashboard/library?class=${libraryClass}&kind=${kind}`} className="rounded-full border bg-white px-3.5 py-2 text-sm font-bold whitespace-nowrap">{label}</Link>)}</div></section>}
    {recent.length > 0 && <section className="quest-panel"><h2 className="font-display text-lg">Recent papers</h2><div className="mt-2 divide-y">{recent.map(attempt => <Link key={attempt.id} href={`/dashboard/attempts/${attempt.id}`} className="flex items-center gap-3 py-3"><span className="min-w-0 flex-1 truncate text-sm font-bold">{attempt.paper.title}</span><ChevronRight className="h-4 w-4" /></Link>)}</div></section>}
  </div>;
}
