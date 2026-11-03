"use client";

import { ProfileAvatar } from "./profile-avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, Library, ChartNoAxesCombined, UserRound, Users, ClipboardCheck, Wallet, ScanLine, Upload, ShieldCheck, Settings, Tv, Gamepad2 } from "lucide-react";

const icons = { dashboard: LayoutDashboard, learn: BookOpen, library: Library, progress: ChartNoAxesCombined, profile: UserRound, users: Users, marking: ClipboardCheck, fees: Wallet, attendance: ScanLine, upload: Upload, admin: ShieldCheck, settings: Settings, video: Tv, game: Gamepad2 };
export type NavigationItem = { href: string; label: string; icon: keyof typeof icons; image?: string | null; avatar?: string | null; name?: string | null };

export function AppNavigation({ items, desktop = false, onNavigate }: { items: NavigationItem[]; desktop?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const routeSection = /^\/dashboard\/(classes|notes|papers|subjects|levels|curriculum)(\/|$)/.test(pathname) ? 'learn' : pathname.startsWith('/dashboard/attempts/') ? 'progress' : null;
  const current = (routeSection && items.find(item => item.icon === routeSection)?.href) || items.filter(item => pathname === item.href || (item.href !== '/dashboard' && item.href !== '/' && pathname.startsWith(item.href + '/'))).sort((a, b) => b.href.length - a.href.length)[0]?.href;
  return <nav aria-label={desktop ? 'Sidebar navigation' : 'Main navigation'} className={desktop ? 'space-y-1.5' : 'mobile-bottom-nav lg:hidden flex justify-around gap-1'}>
    {items.map(item => {
      const Icon = icons[item.icon];
      const active = current === item.href;
      return <Link key={item.href} href={item.href} onNavigate={onNavigate} aria-current={active ? 'page' : undefined}
        className={desktop ? `sidebar-link ${active ? 'is-active' : ''}` : `bottom-nav-link ${active ? 'is-active' : ''}`}>
        {item.icon === "profile" ? <ProfileAvatar name={item.name} image={item.image} avatar={item.avatar} className="bottom-nav-photo inline-grid place-items-center" /> : <Icon aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={active ? 2.5 : 1.8} />}
        <span>{item.label}</span>
        {desktop && active && <span className="ml-auto h-2 w-2 rounded-full bg-primary" />}
      </Link>;
    })}
  </nav>;
}
