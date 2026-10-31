"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultSubjectSlug, shortSubjectName } from "@/lib/taxonomy";

export type JumpClass = {
  slug: string;
  shortName: string;
  subjects: { slug: string; name: string }[];
};

export function JumpBar({ classes, homeSlug }: { classes: JumpClass[]; homeSlug?: string | null }) {
  const path = usePathname();
  const match = path.match(/^\/dashboard\/classes\/([^/]+)(?:\/([^/]+))?/);
  const known = match?.[1] && classes.some((cls) => cls.slug === match[1]) ? match[1] : null;
  const classSlug = known || homeSlug || classes[0]?.slug;
  const current = classes.find((cls) => cls.slug === classSlug) || classes[0];
  const subjectSlug = known ? match?.[2] : undefined;
  const learn =
    path === "/dashboard" ||
    path.startsWith("/dashboard/learn") ||
    path.startsWith("/dashboard/classes") ||
    path.startsWith("/dashboard/notes") ||
    path.startsWith("/dashboard/papers") ||
    path.startsWith("/dashboard/library");
  if (!learn || !current) return null;

  return (
    <div className="sticky top-14 lg:top-0 z-30 -mx-4 md:-mx-8 px-4 md:px-8 py-2 border-b bg-[rgba(247,241,230,0.94)] backdrop-blur-xl space-y-2">
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {classes.map((cls) => {
          const keep = subjectSlug && cls.subjects.some((subject) => subject.slug === subjectSlug)
            ? subjectSlug
            : defaultSubjectSlug(cls.slug, cls.subjects);
          const href = keep ? `/dashboard/classes/${cls.slug}/${keep}` : `/dashboard/classes/${cls.slug}`;
          const on = cls.slug === current.slug;
          return (
            <Link
              key={cls.slug}
              href={href}
              className={`rounded-full px-3 py-1.5 text-sm font-bold whitespace-nowrap ${on ? "bg-primary text-white" : "bg-white border"}`}
            >
              {cls.shortName}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {current.subjects.map((subject) => (
          <Link
            key={subject.slug}
            href={`/dashboard/classes/${current.slug}/${subject.slug}`}
            className={`rounded-full px-3 py-1.5 text-sm font-bold whitespace-nowrap ${
              subject.slug === subjectSlug ? "bg-[var(--ink)] text-white" : "bg-white border"
            }`}
          >
            {shortSubjectName(subject.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}
