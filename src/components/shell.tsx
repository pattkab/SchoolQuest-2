import Link from "next/link";
import { signOut } from "@/auth";
import { db } from "@/lib/db";
import { pathwayForRole } from "@/lib/pathways";
import { classWithTerm, splitSubjects } from "@/lib/taxonomy";
import { JumpBar } from "@/components/jump-bar";
import { AppNavigation, type NavigationItem } from '@/components/app-navigation';
import { SpaceMenu } from "@/components/space-menu";
import { BackButton } from '@/components/back-button';
import { Engagement } from '@/components/engagement';
import { COMPANY_LINE } from '@/lib/company';
import { ProfileAvatar } from '@/components/profile-avatar';
import { GraduationCap, LogOut, Settings } from 'lucide-react';

type ShellUser = { id: string; name: string | null; image?: string | null; avatarSeed?: string | null; phone: string | null; role: string; teacherProfile?: { status: string; fullName: string } | null; classGrade?: { slug?: string; shortName: string; name: string } | null };

export function BrandMark({ compact = false, href = "/dashboard" }: { compact?: boolean; href?: "/" | "/dashboard" }) {
  return <Link href={href} aria-label={href === "/" ? "School Quest home" : "School Quest dashboard"} className="flex items-center gap-2.5 shrink-0">
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
  links.push({ href: '/dashboard/profile', label: 'Profile', icon: 'profile', image: user.image, avatar: user.avatarSeed, name: user.name });
  const extraLinks: NavigationItem[] = pathway.id === "teacher" ? [
    { href: "/dashboard/teacher/upload", label: "Upload a paper", icon: "upload" },
  ] : pathway.id === "site" ? [
    { href: "/dashboard/admin/teachers", label: "Teacher approvals", icon: "users" },
    { href: "/dashboard/admin/engine", label: "Content tools", icon: "admin" },
  ] : pathway.id === "student" ? [
    { href: "/dashboard#educational-videos", label: "Educational videos", icon: "video" },
    { href: "/dashboard#edutainment", label: "Edutainment", icon: "game" },
    { href: "/dashboard/subscribe", label: "Subscription", icon: "fees" },
  ] : [];
  const menuLinks: NavigationItem[] = [...links, ...extraLinks, { href: "/start", label: "Getting started", icon: "dashboard" }, { href: "/dashboard/settings", label: "Settings", icon: "settings" }];
  const grades = await db.classGrade.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, select: { slug: true, shortName: true, subjects: { orderBy: { order: 'asc' }, select: { slug: true, name: true } } } });
  const classes = grades.map(grade => { const { core, more } = splitSubjects(grade.slug, grade.subjects); return { slug: grade.slug, shortName: grade.shortName, subjects: [...core, ...more] }; });
  return <div data-space={pathway.id} className="mobile-navigation-page min-h-screen">
    <aside className="quest-sidebar hidden lg:flex">
      <BrandMark />
      <p className="space-label mb-4 mt-8">{pathway.label} space</p>
      <AppNavigation items={menuLinks} desktop />
      <div className="mt-auto pt-6"><Link href="/dashboard/profile" className="flex items-center gap-3 rounded-2xl border bg-white p-3"><ProfileAvatar name={user.name} image={user.image} avatar={user.avatarSeed} className="quest-avatar" /><span className="min-w-0"><span className="block truncate text-sm font-bold">{user.name || 'Your profile'}</span><span className="block text-xs text-muted-foreground">{user.classGrade ? classWithTerm(user.classGrade.shortName) : pathway.label}</span></span></Link>
        <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }); }}><button className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-xs font-bold text-muted-foreground"><LogOut className="h-3.5 w-3.5" /> Sign out</button></form>
      </div>
    </aside>
    <div className="mobile-app-frame lg:pl-[260px] min-h-screen flex flex-col">
      <header className="mobile-app-bar space-mobile-bar lg:hidden px-3">
        <div className="flex w-full min-w-0 items-center justify-between gap-2">
          <SpaceMenu label={pathway.label} items={menuLinks} />
          <p className="space-label">{pathway.label} space</p>
          <Link href="/dashboard/profile" aria-label="Open your profile"><ProfileAvatar name={user.name} image={user.image} avatar={user.avatarSeed} className="quest-avatar" /></Link>
        </div>
      </header>
      <div className="space-desktop-bar hidden lg:flex items-center justify-between gap-3 border-b px-9 py-3">
        <BackButton home={pathway.home} />
        <span className="ml-auto flex items-center gap-3">
          {user.classGrade && <span className="context-chip"><GraduationCap aria-hidden="true" className="h-4 w-4" /> {classWithTerm(user.classGrade.shortName)}</span>}
          <Link href="/dashboard/settings" className="icon-button" aria-label="Settings"><Settings aria-hidden="true" className="h-5 w-5" /></Link>
          <Link href="/dashboard/profile" aria-label="Open your profile"><ProfileAvatar name={user.name} image={user.image} avatar={user.avatarSeed} className="quest-avatar" /></Link>
        </span>
      </div>
      <JumpBar classes={classes} homeSlug={user.classGrade?.slug} />
      <main id="main-content" tabIndex={-1} className="page-rise px-4 py-3 md:px-8 md:py-8 max-w-6xl mx-auto w-full flex-1"><div className="mb-2 empty:hidden lg:hidden"><BackButton home={pathway.home} /></div><Engagement />{children}</main>
      <p className="hidden px-4 py-4 text-center text-[11px] leading-snug text-muted-foreground md:block">{COMPANY_LINE}</p>
      <AppNavigation items={links} />
    </div>
  </div>;
}
