"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Library, UserRound } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard/learn", label: "Learn", icon: BookOpen },
  { href: "/dashboard/library", label: "Library", icon: Library },
  { href: "/login", label: "Sign in", icon: UserRound },
];

export function PublicMobileNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="mobile-bottom-nav lg:hidden grid grid-cols-4 gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined}
            className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-xs font-bold ${active ? "bg-primary/10 text-primary" : "text-foreground/70"}`}>
            <Icon aria-hidden="true" className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
