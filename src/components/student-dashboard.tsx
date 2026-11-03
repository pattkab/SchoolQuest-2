import { GettingStarted } from "@/components/getting-started";
import Link from 'next/link';
import Image from 'next/image';
import { LearnerExtras } from "@/components/learner-extras";
import { db } from '@/lib/db';
import { requireUser } from '@/lib/session';
import { classWithTerm, shortSubjectName } from '@/lib/taxonomy';
import { KitoMascot } from '@/components/kito-mascot';
import { ArrowRight, BookOpen, Flame, Sparkles, Trophy, ChevronRight, Calculator, FlaskConical, Languages, Globe, Compass } from 'lucide-react';

const subjectIcons = [Calculator, Languages, FlaskConical, Globe, BookOpen, Compass];
export default async function StudentDashboard() {
  const user = await requireUser();
  const [subjects, completed, recent, continuing, quiz] = await Promise.all([
    user.classGradeId ? db.subject.findMany({ where: { classGradeId: user.classGradeId }, orderBy: { order: 'asc' }, include: { _count: { select: { notes: { where: { status: 'PUBLISHED' } }, papers: { where: { status: 'PUBLISHED' } } } }, notes: { where: { status: 'PUBLISHED' }, orderBy: { order: 'asc' }, take: 1, select: { id: true, title: true } }, papers: { where: { status: 'PUBLISHED' }, take: 1, select: { id: true } } } }) : [],
    db.attempt.count({ where: { userId: user.id, completedAt: { not: null } } }),
    db.attempt.findMany({ where: { userId: user.id, completedAt: { not: null } }, orderBy: { completedAt: 'desc' }, take: 3, include: { paper: { include: { subject: true } } } }),
    db.attempt.findFirst({ where: { userId: user.id, status: 'IN_PROGRESS', completedAt: null, paper: { status: 'PUBLISHED' } }, orderBy: { startedAt: 'desc' }, include: { paper: true } }),
    user.classGradeId ? db.paper.findFirst({ where: { classGradeId: user.classGradeId, status: 'PUBLISHED', kind: 'TOPIC_QUIZ' }, orderBy: { title: 'asc' }, select: { id: true, title: true } }) : null,
  ]);
  const firstNote = subjects.find(subject => subject.notes.length)?.notes[0];
  const nextHref = continuing ? `/dashboard/papers/${continuing.paperId}` : firstNote ? `/dashboard/notes/${firstNote.id}` : '/dashboard/learn';
  const libraryClass = user.classGrade?.freshTeacherKey;
  const libraryKinds = [["LESSON_NOTES", "Lesson notes"], ["PAST_PAPER", "Past papers"], ["SCHEME_OF_WORK", "Schemes"], ["HOLIDAY_PACKAGE", "Holiday"]] as const;
  return <div className="space-y-4">
    <div className="flex items-center justify-between gap-3"><h1 className="font-display">Hey, {user.name?.split(' ')[0] || 'explorer'}</h1><span className="context-chip shrink-0">{classWithTerm(user.classGrade?.shortName)}</span></div>
    <section className="learner-quest" aria-labelledby="learner-quest-title">
      <div className="min-w-0">
        <p className="learner-quest-kicker">Meet Kito, your quest guide</p>
        <h2 id="learner-quest-title" className="font-display text-3xl">{continuing ? "Ready to keep going?" : "What shall we explore today?"}</h2>
        <p className="mt-2">Read something new, practise a topic, or see how far you’ve come.</p>
        <Link href={nextHref} data-button-tone="gold" className="quest-button quest-button-light mt-4">{continuing ? "Continue your practice" : "Start learning"}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        <nav aria-label="Explore more activities" className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          <a href="#educational-videos" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">Watch videos</a>
          <a href="#edutainment" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">Learn through play</a>
        </nav>
      </div>
      <KitoMascot />
    </section>
    <section className="learner-discovery" aria-labelledby="learner-discovery-title">
      <Image src="/illustrations/quest-read-together.webp" width={768} height={512} alt="" unoptimized
        className="learner-discovery-image" />
      <div className="learner-discovery-content">
        <h2 id="learner-discovery-title" className="font-display text-2xl">Pick your next adventure</h2>
        <p className="mb-4 mt-1 text-sm text-muted-foreground">What would you like to do today?</p>
        <div className="learner-activities">
          {[
            { title: "Read notes", detail: "Learn something new", href: "/dashboard/learn?mode=notes", icon: BookOpen, tone: "mint" },
            { title: quiz ? "Play a quiz" : "Practise a topic", detail: quiz ? "Try a quick challenge" : "Find practice for your class", href: quiz ? `/dashboard/papers/${quiz.id}` : "/dashboard/learn?mode=paper", icon: Sparkles, tone: "lilac" },
            { title: "My progress", detail: "See what you’ve done", href: "/dashboard/progress", icon: Trophy, tone: "peach" },
          ].map(({ title, detail, href, icon: Icon, tone }) => <Link key={title} href={href} className={`learner-activity tone-${tone}`}>
            <Icon aria-hidden="true" className="h-6 w-6" /><strong>{title}</strong><span>{detail}</span>
          </Link>)}
        </div>
      </div>
    </section>
    {user.role === "STUDENT" && !completed && !continuing && <GettingStarted title="Your first steps as a learner" steps={[
      { title: "Explore your class", detail: "Find notes and activities for the class you’re in.", href: "/dashboard/learn" },
      { title: "Try a quiz", detail: "Practise a topic and see what to work on next.", href: quiz ? `/dashboard/papers/${quiz.id}` : "/dashboard/learn" },
      { title: "See your progress", detail: "Come back after practising to find your results and streak.", href: "/dashboard/progress" },
    ]} />}
    {quiz && <Link href={`/dashboard/papers/${quiz.id}`} className="flex items-center justify-between rounded-3xl border bg-white px-4 py-3"><span><span className="block text-xs font-bold uppercase tracking-widest text-primary">Short quiz</span><span className="font-bold">{quiz.title}</span></span><span className="font-bold text-primary">Play</span></Link>}
    <section aria-label="Your learning progress" className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {[{ icon: Flame, value: user.currentStreak, label: 'Day streak', tone: 'peach' }, { icon: Sparkles, value: user.xp, label: 'Learning XP', tone: 'lilac' }, { icon: Trophy, value: completed, label: 'Papers completed', tone: 'mint' }].map(({ icon: Icon, value, label, tone }) => <Link href="/dashboard/progress" key={label} className={`metric-card tone-${tone}`}><span className="metric-icon"><Icon className="h-5 w-5" /></span><strong>{value.toLocaleString()}</strong><span>{label}</span></Link>)}
    </section>
    <section><div className="section-heading"><h2 className="font-display text-xl">Subjects</h2><Link href="/dashboard/learn" className="text-xs font-bold text-primary inline-flex items-center gap-1">All <ChevronRight className="h-4 w-4" /></Link></div>
      {subjects.length ? <div className="stagger grid grid-cols-2 lg:grid-cols-3 gap-3 mt-4">{subjects.slice(0, 6).map((subject, index) => { const Icon = subjectIcons[index % subjectIcons.length]; return <Link key={subject.id} href={`/dashboard/learn?class=${user.classGrade?.slug}&subject=${subject.slug}&mode=notes`} className={`subject-tile subject-tone-${index % 4}`}><span className="subject-icon"><Icon className="h-6 w-6" /></span><h3 className="mt-4 text-sm sm:text-base font-extrabold">{shortSubjectName(subject.name)}</h3><p className="mt-1 text-xs text-muted-foreground">{subject._count.notes} notes · {subject._count.papers} practice papers</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold">Explore <ArrowRight className="h-3.5 w-3.5" /></span></Link>; })}</div> : <div className="quest-panel mt-4 text-center"><BookOpen className="mx-auto h-8 w-8 text-primary" /><h3 className="font-display mt-3 text-xl">Choose your class</h3><Link href="/setup" className="quest-button mt-4">Choose your class <ArrowRight className="h-4 w-4" /></Link></div>}
    </section>
    {libraryClass && <section className="space-y-2"><h2 className="font-display text-xl">Library</h2><div className="flex gap-2 overflow-x-auto no-scrollbar">{libraryKinds.map(([kind, label]) => <Link key={kind} href={`/dashboard/library?class=${libraryClass}&kind=${kind}`} className="rounded-full border bg-white px-3.5 py-2 text-sm font-bold whitespace-nowrap">{label}</Link>)}</div></section>}
    <LearnerExtras quizId={quiz?.id} />
    {recent.length > 0 && <section className="quest-panel"><h2 className="font-display text-lg">Recent papers</h2><div className="mt-2 divide-y">{recent.map(attempt => <Link key={attempt.id} href={`/dashboard/attempts/${attempt.id}`} className="flex items-center gap-3 py-3"><span className="min-w-0 flex-1 truncate text-sm font-bold">{attempt.paper.title}</span><ChevronRight className="h-4 w-4" /></Link>)}</div></section>}
  </div>;
}
