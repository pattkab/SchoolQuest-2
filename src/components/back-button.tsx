"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

function parentHref(pathname: string) {
  if (typeof window !== "undefined" && /^\/dashboard\/(notes|papers|attempts)\//.test(pathname)) {
    const saved = sessionStorage.getItem("sq-learn");
    if (saved) return `/dashboard/learn?${saved}`;
  }
  if (/^\/dashboard\/(notes|papers|attempts|classes)\//.test(pathname)) return "/dashboard/learn";
  if (pathname.startsWith("/dashboard/school/students/")) return "/dashboard/school";
  if (pathname.startsWith("/dashboard/admin/") && pathname !== "/dashboard/admin") return "/dashboard/admin";
  if (pathname.startsWith("/dashboard/teacher/") && pathname !== "/dashboard/teacher") return "/dashboard/teacher";
  if (pathname.startsWith("/dashboard/school/") && pathname !== "/dashboard/school") return "/dashboard/school";
  return "/dashboard";
}

export function BackButton({ roots }: { roots: string[] }) {
  const pathname = usePathname();
  if (roots.includes(pathname)) return null;
  const href = parentHref(pathname);
  if (href === pathname) return null;
  return (
    <Link href={href} className="icon-button" aria-label="Back">
      <ChevronLeft className="h-5 w-5" />
    </Link>
  );
}
