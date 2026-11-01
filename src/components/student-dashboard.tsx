import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/session';
import { shortSubjectName } from '@/lib/taxonomy';
import { QuestArt } from '@/components/quest-art';
import { ArrowRight, BookOpen, Flame, Sparkles, Target, Trophy, ChevronRight, Calculator, FlaskConical, Languages, Globe, Compass } from 'lucide-react';

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
  const nextTitle = continuing ? continuing.paper.title : firstNote?.title || 'Find your next favourite subject';
  return <div className="space-y-7">
    <div className="flex items-start justify-between gap-3"><div><p className="eyebrow">LET’S MAKE TODAY COUNT</p><h1 className="font-display mt-2">Hey, {user.name?.split(' ')[0] || 'explorer'}! <span aria-hidden="true">👋</span></h1><p className="mt-2 text-sm text-muted-foreground">A little progress today. A brighter tomorrow.</p></div><span className="context-chip shrink-0">{user.classGrade?.shortName || 'Your journey'}</span></div>
    <section className="learning-hero">
      <div className="relative z-10 min-w-0"><span className="hero-chip"><Sparkles className="h-3.5 w-3.5" /> YOUR NEXT DISCOVERY</span><h2 className="font-display mt-4 max-w-md text-2xl sm:text-3xl">{completed ? 'Keep your curiosity growing.' : 'Your adventure starts here.'}</h2><p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">{nextTitle}</p><Link href={nextHref} className="quest-button quest-button-light mt-5">{continuing ? 'Continue practice' : 'Let’s learn'}<ArrowRight className="h-4 w-4" /></Link></div>
      <QuestArt compact />
    </section>
    <section aria-label="Your learning progress" className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {[{ icon: Flame, value: user.currentStreak, label: 'Day streak', tone: 'peach' }, { icon: Sparkles, value: user.xp, label: 'Learning XP', tone: 'lilac' }, { icon: Trophy, value: completed, label: 'Papers completed', tone: 'mint' }].map(({ icon: Icon, value, label, tone }) => <Link href="/dashboard/progress" key={label} className={`metric-card tone-${tone}`}><span className="metric-icon"><Icon className="h-5 w-5" /></span><strong>{value.toLocaleString()}</strong><span>{label}</span></Link>)}
    </section>
    <section><div className="section-heading"><div><p className="eyebrow">A LITTLE OF WHAT YOU LOVE</p><h2 className="font-display mt-1 text-xl">Your subjects</h2></div><Link href="/dashboard/learn" className="text-xs font-bold text-primary inline-flex items-center gap-1">View all <ChevronRight className="h-4 w-4" /></Link></div>
      {subjects.length ? <div className="stagger grid grid-cols-2 lg:grid-cols-3 gap-3 mt-4">{subjects.slice(0, 6).map((subject, index) => { const Icon = subjectIcons[index % subjectIcons.length]; return <Link key={subject.id} href={`/dashboard/classes/${user.classGrade?.slug}/${subject.slug}`} className={`subject-tile subject-tone-${index % 4}`}><span className="subject-icon"><Icon className="h-6 w-6" /></span><h3 className="mt-4 text-sm sm:text-base font-extrabold">{shortSubjectName(subject.name)}</h3><p className="mt-1 text-xs text-muted-foreground">{subject._count.notes} notes · {subject._count.papers} practice papers</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold">Explore <ArrowRight className="h-3.5 w-3.5" /></span></Link>; })}</div> : <div className="quest-panel mt-4 text-center"><GraduationMessage /><Link href="/setup" className="quest-button mt-4">Choose your class <ArrowRight className="h-4 w-4" /></Link></div>}
    </section>
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4">
      <section className="quest-panel"><div className="section-heading"><h2 className="font-display text-lg">Your latest milestones</h2><Trophy className="h-5 w-5 text-amber-500" /></div>{recent.length ? <div className="mt-4 divide-y">{recent.map(attempt => <Link key={attempt.id} href={`/dashboard/attempts/${attempt.id}`} className="flex items-center gap-3 py-3"><span className="activity-icon"><BookOpen className="h-4 w-4" /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{attempt.paper.title}</span><span className="text-xs text-muted-foreground">{shortSubjectName(attempt.paper.subject.name)} · Review your feedback</span></span><ChevronRight className="h-4 w-4" /></Link>)}</div> : <div className="mt-5 rounded-2xl bg-muted/60 p-5"><p className="font-bold text-sm">Your first milestone is waiting ✨</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Complete a practice paper and your feedback will appear here. Every start counts.</p></div>}</section>
      <section className="quest-panel daily-quest"><span className="context-chip"><Target className="h-4 w-4" /> A SMALL STEP FOR TODAY</span><h2 className="font-display mt-4 text-xl">Read. Try. Discover.</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Pick a subject, learn something new, then give a practice paper a go.</p><Link href="/dashboard/learn" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Find a lesson <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  </div>;
}
function GraduationMessage() { return <><BookOpen className="mx-auto h-8 w-8 text-primary" /><h3 className="font-display mt-3 text-xl">Make this space yours</h3><p className="mt-2 text-sm text-muted-foreground">Choose your class to unlock subjects and a learning journey made for you.</p></>; }
