import Link from "next/link";
import { signOut } from "@/auth";
import { db } from "@/lib/db";
import { pathwayForRole } from "@/lib/pathways";
import { splitSubjects } from "@/lib/taxonomy";
import { JumpBar } from "@/components/jump-bar";
import { SiteFooter } from "@/components/site-footer";
import {
  BookOpen,
  GraduationCap,
  Home,
  Library,
  LogOut,
  ScanLine,
  Shield,
  Sparkles,
  UserRound,
  Users,
  Wallet,
  ShoppingBag,
} from "lucide-react";

type ShellUser = {
  id: string;
  name: string | null;
  phone: string | null;
  role: string;
  teacherProfile?: { status: string; fullName: string } | null;
  classGrade?: { shortName: string; name: string } | null;
};

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5">
      <div className="brand-mark h-10 w-10 rounded-2xl bg-primary text-white grid place-items-center shadow-md">
        <GraduationCap className="h-5 w-5" />
      </div>
      {!compact && (
        <div>
          <p className="font-display text-xl leading-none">School Quest</p>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Uganda</p>
        </div>
      )}
    </Link>
  );
}

function NavLink({ href, icon: Icon, label }: { href: string; icon: typeof Home; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-base font-semibold text-foreground/80 hover:bg-white hover:text-primary transition-all hover:translate-x-1"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export async function DashboardShell({
  user,
  children,
}: {
  user: ShellUser & { classGrade?: { slug?: string; shortName: string; name: string } | null };
  children: React.ReactNode;
}) {
  const teacher = user.role === "TEACHER";
  const teacherPending = teacher && user.teacherProfile?.status !== "ACCREDITED";
  const pathway = pathwayForRole(user.role);
  const links =
    pathway.id === "school"
      ? [
          { href: "/dashboard/school", label: "Students", icon: Users },
          { href: "/dashboard/school/fees", label: "Fees", icon: Wallet },
          { href: "/dashboard/school/attendance", label: "Attend", icon: ScanLine },
          { href: "/dashboard/learn", label: "Learn", icon: Home },
        ]
      : pathway.id === "teacher"
        ? [
            { href: "/dashboard/teacher", label: "Desk", icon: BookOpen },
            { href: "/dashboard/school/attendance", label: "Attend", icon: ScanLine },
            { href: "/dashboard/learn", label: "Learn", icon: Home },
            { href: "/dashboard/progress", label: "Marks", icon: Sparkles },
          ]
        : pathway.id === "site"
          ? [
              { href: "/dashboard/admin", label: "Admin", icon: Shield },
              { href: "/dashboard/admin/analytics", label: "Users", icon: Sparkles },
              { href: "/dashboard/admin/engine", label: "Engine", icon: BookOpen },
              { href: "/dashboard/learn", label: "Learn", icon: Home },
            ]
          : [
              { href: "/dashboard", label: "Learn", icon: Home },
              { href: "/dashboard/school", label: "School", icon: GraduationCap },
              { href: "/dashboard/library", label: "Library", icon: Library },
              { href: "/dashboard/progress", label: "Marks", icon: Sparkles },
            ];
  const grades = await db.classGrade.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: {
      slug: true,
      shortName: true,
      subjects: { orderBy: { order: "asc" }, select: { slug: true, name: true } },
    },
  });
  const classes = grades.map((grade) => {
    const { core, more } = splitSubjects(grade.slug, grade.subjects);
    return { slug: grade.slug, shortName: grade.shortName, subjects: [...core, ...more] };
  });
  return (
    <div className="min-h-screen">
      <aside className="hidden lg:flex w-[270px] flex-col fixed inset-y-0 left-0 border-r bg-[rgba(255,248,236,0.86)] backdrop-blur-xl p-5">
        <BrandMark />
        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-primary">{pathway.label}</p>
        <div className="mt-3 space-y-1">
          {links.map((item) => (
            <NavLink key={item.href} href={item.href} icon={item.icon} label={item.label} />
          ))}
          <NavLink href="/dashboard/store" icon={ShoppingBag} label="Store" />
          <NavLink href="/setup" icon={UserRound} label="Profile" />
        </div>
        <div className="mt-auto rounded-3xl bg-white/80 border p-4 space-y-3">
          <p className="text-sm font-bold">{user.name || user.phone}</p>
          <p className="text-xs text-muted-foreground">
            {pathway.label}
            {user.role === "STUDENT" && user.classGrade?.shortName ? ` · ${user.classGrade.shortName}` : ""}
            {teacherPending ? " · pending" : ""}
          </p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit" className="w-full rounded-2xl h-10 border bg-white font-semibold inline-flex items-center justify-center gap-2">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="lg:pl-[270px] min-h-screen flex flex-col">
        <header className="lg:hidden sticky top-0 z-40 border-b bg-[rgba(247,241,230,0.92)] backdrop-blur-xl px-4 py-3 flex items-center justify-between">
          <BrandMark compact />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {pathway.label}
          </span>
        </header>
        <JumpBar classes={classes} homeSlug={user.classGrade?.slug} />
        <div className="lg:hidden px-4 pt-3 text-right"><Link href="/dashboard/store" className="text-sm font-bold text-primary inline-flex items-center gap-2"><ShoppingBag className="h-4 w-4"/> SchoolQuest Store</Link></div>
        <main className="page-rise px-4 py-6 md:px-8 md:py-8 max-w-6xl mx-auto w-full flex-1">{children}</main>
        <div className="mb-16 lg:mb-0">
          <SiteFooter />
        </div>
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-[rgba(247,241,230,0.96)] backdrop-blur-xl px-2 py-2 grid grid-cols-4 gap-1">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 py-2 text-xs font-bold text-foreground/70 active:scale-95">
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
