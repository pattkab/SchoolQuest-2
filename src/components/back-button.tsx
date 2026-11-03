"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function BackButton({ home }: { home: string }) {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === home || pathname === "/dashboard") return null;

  let href = home;
  if (/^\/dashboard\/(notes|papers|classes|subjects|levels|curriculum)\//.test(pathname)) href = "/dashboard/learn";
  else if (pathname.startsWith("/dashboard/attempts/")) href = "/dashboard/progress";
  else if (pathname.startsWith("/dashboard/school/students/")) href = "/dashboard/school";
  else if (pathname.startsWith("/dashboard/admin/")) href = "/dashboard/admin";
  else if (pathname.startsWith("/dashboard/teacher/")) href = "/dashboard/teacher";
  else if (pathname === "/dashboard/subscribe" || pathname === "/dashboard/settings") href = "/dashboard/profile";
  else if (pathname.startsWith("/dashboard/school/") && home === "/dashboard/school") href = home;

  return (
    <Link href={href} className="space-back" onNavigate={(event) => {
      if (href !== "/dashboard/learn") return;
      try {
        const saved = sessionStorage.getItem("sq-learn");
        if (!saved) return;
        event.preventDefault();
        router.push(`/dashboard/learn?${new URLSearchParams(saved)}`);
      } catch { /* Use the link destination if storage is unavailable. */ }
    }}>
      <ChevronLeft aria-hidden="true" className="h-5 w-5 shrink-0" /> Back
    </Link>
  );
}
