import Link from "next/link";
import { signOut } from "@/auth";
import { db } from "@/lib/db";
import { pathwayForRole } from "@/lib/pathways";
import { splitSubjects } from "@/lib/taxonomy";
import { JumpBar } from "@/components/jump-bar";
import { AppNavigation, type NavigationItem } from '@/components/app-navigation';
import { GraduationCap, LogOut, Sparkles, ArrowUpRight } from 'lucide-react';

type ShellUser = { id: string; name: string | null; phone: string | null; role: string; teacherProfile?: { status: string; fullName: string } | null; classGrade?: { slug?: string; shortName: string; name: string } | null };

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return <Link href="/dashboard" aria-label="SchoolQuest dashboard" className="flex items-center gap-2.5 shrink-0">
    <div className="brand-mark h-10 w-10 rounded-[14px] bg-primary text-white grid place-items-center"><GraduationCap className="h-6 w-6" strokeWidth={1.8} /></div>
    {!compact && <div><p className="brand-wordmark">SCHOOL<span>QUEST</span></p><p className="mt-0.5 text-[8px] font-extrabold uppercase tracking-[0.12em] whitespace-nowrap text-muted-foreground">Little steps. Big futures.</p></div>}
  </Link>;
}

export async function DashboardShell({ user, children }: { user: ShellUser; children: React.ReactNode }) {
  const pathway = pathwayForRole(user.role);
  const links: NavigationItem[] = pathway.id === 'school' ? [
    { href: '/dashboard/school', label: 'Dashboard', icon: 'dashboard' }, { href: '/dashboard/school/fees', label: 'Fees', icon: 'fees' }, { href: '/dashboard/school/attendance', label: 'Attendance', icon: 'attendance' },
  ] : pathway.id === 'teacher' ? [
    { href: '/dashboard/teacher', label: 'Dashboard', icon: 'dashboard' }, { href: '/dashboard/teacher/marking', label: 'Marking', icon: 'marking' }, { href: '/dashboard/learn', label: 'Teach', icon: 'learn' }, { href: '/dashboard/school/attendance', label: 'Attendance', icon: 'attendance' },
  ] : pathway.id === 'site' ? [
    { href: '/dashboard/admin', label: 'Dashboard', icon: 'dashboard' }, { href: '/dashboard/admin/analytics', label: 'People', icon: 'users' }, { href: '/dashboard/admin/library', label: 'Content', icon: 'library' },
  ] : [
    { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' }, { href: '/dashboard/learn', label: 'Learn', icon: 'learn' }, { href: '/dashboard/library', label: 'Library', icon: 'library' }, { href: '/dashboard/progress', label: 'Progress', icon: 'progress' },
  ];
  links.push({ href: '/dashboard/profile', label: 'Profile', icon: 'profile' });
  const grades = await db.classGrade.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, select: { slug: true, shortName: true, subjects: { orderBy: { order: 'asc' }, select: { slug: true, name: true } } } });
  const classes = grades.map(grade => { const { core, more } = splitSubjects(grade.slug, grade.subjects); return { slug: grade.slug, shortName: grade.shortName, subjects: [...core, ...more] }; });
  const initials = (user.name || 'SQ').split(' ').slice(0, 2).map(part => part[0]).join('');
  return <div className="mobile-navigation-page min-h-screen">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <aside className="quest-sidebar hidden lg:flex">
      <BrandMark />
      <div className="mt-9 mb-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {pathway.label} space</div>
      <AppNavigation items={links} desktop />
      <Link href="/dashboard/curriculum" className="sidebar-discover mt-8"><Sparkles className="h-6 w-6 text-primary" /><p className="mt-3 font-extrabold text-sm">A world to discover</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Explore the curriculum, one curious question at a time.</p><span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-primary">Explore subjects <ArrowUpRight className="h-4 w-4" /></span></Link>
      <div className="mt-auto pt-6"><Link href="/dashboard/profile" className="flex items-center gap-3 rounded-2xl border bg-white p-3"><span className="quest-avatar">{initials}</span><span className="min-w-0"><span className="block truncate text-sm font-bold">{user.name || 'Your profile'}</span><span className="block text-xs text-muted-foreground">{user.classGrade?.shortName || pathway.label}</span></span></Link>
        <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }); }}><button className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-xs font-bold text-muted-foreground"><LogOut className="h-3.5 w-3.5" /> Sign out</button></form>
      </div>
    </aside>
    <div className="mobile-app-frame lg:pl-[260px] min-h-screen flex flex-col">
      <header className="mobile-app-bar lg:hidden px-4 flex items-center justify-between"><BrandMark /><Link href="/dashboard/profile" className="quest-avatar" aria-label="Open your profile">{initials}</Link></header>
      <div className="hidden lg:flex items-center justify-between border-b bg-white/70 px-9 py-4"><span className="text-sm font-semibold text-muted-foreground">Your space to learn, grow, and make a difference.</span><span className="context-chip"><GraduationCap className="h-4 w-4" /> {user.classGrade?.name || pathway.label}</span></div>
      <JumpBar classes={classes} homeSlug={user.classGrade?.slug} />
      <main id="main-content" className="page-rise px-4 py-6 md:px-8 md:py-8 max-w-6xl mx-auto w-full flex-1">{children}</main>
      <p className="py-5 text-center text-[10px] font-semibold tracking-wide text-muted-foreground">SCHOOLQUEST · MADE FOR YOUR NEXT CHAPTER</p>
      <AppNavigation items={links} />
    </div>
  </div>;
}
