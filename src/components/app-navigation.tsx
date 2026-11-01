"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, Library, ChartNoAxesCombined, UserRound, Users, ClipboardCheck, Wallet, ScanLine, Upload, ShieldCheck } from "lucide-react";

const icons = { dashboard: LayoutDashboard, learn: BookOpen, library: Library, progress: ChartNoAxesCombined, profile: UserRound, users: Users, marking: ClipboardCheck, fees: Wallet, attendance: ScanLine, upload: Upload, admin: ShieldCheck };
export type NavigationItem = { href: string; label: string; icon: keyof typeof icons };

export function AppNavigation({ items, desktop = false }: { items: NavigationItem[]; desktop?: boolean }) {
  const pathname = usePathname();
  const routeSection = /^\/dashboard\/(classes|notes|papers|subjects|levels|curriculum)(\/|$)/.test(pathname) ? 'learn' : pathname.startsWith('/dashboard/attempts/') ? 'progress' : null;
  const current = (routeSection && items.find(item => item.icon === routeSection)?.href) || items.filter(item => pathname === item.href || (item.href !== '/dashboard' && item.href !== '/' && pathname.startsWith(item.href + '/'))).sort((a, b) => b.href.length - a.href.length)[0]?.href;
  return <nav aria-label={desktop ? 'Sidebar navigation' : 'Main navigation'} className={desktop ? 'space-y-1.5' : 'mobile-bottom-nav lg:hidden flex justify-around gap-1'}>
    {items.map(item => {
      const Icon = icons[item.icon];
      const active = current === item.href;
      return <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}
        className={desktop ? `sidebar-link ${active ? 'is-active' : ''}` : `bottom-nav-link ${active ? 'is-active' : ''}`}>
        <Icon aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={active ? 2.5 : 1.8} />
        <span>{item.label}</span>
        {desktop && active && <span className="ml-auto h-2 w-2 rounded-full bg-primary" />}
      </Link>;
    })}
  </nav>;
}
