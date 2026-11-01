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
    path.startsWith("/dashboard/learn") ||
    path.startsWith("/dashboard/classes") ||
    path.startsWith("/dashboard/notes") ||
    path.startsWith("/dashboard/papers") ||
    path.startsWith("/dashboard/library");
  if (!learn || !current) return null;

  return (
    <div className="sticky top-16 lg:top-0 z-30 px-4 md:px-8 py-2 border-b bg-white/95 backdrop-blur-xl space-y-2">
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
              className={`rounded-full px-3.5 py-2 text-base font-bold whitespace-nowrap transition-transform active:scale-95 ${on ? "bg-primary text-white" : "bg-white border hover:-translate-y-0.5"}`}
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
            className={`rounded-full px-3.5 py-2 text-base font-bold whitespace-nowrap transition-transform active:scale-95 ${
              subject.slug === subjectSlug ? "bg-[var(--ink)] text-white" : "bg-white border hover:-translate-y-0.5"
            }`}
          >
            {shortSubjectName(subject.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}
