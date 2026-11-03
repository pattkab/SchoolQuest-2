"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuestDoor } from "@/components/quest-door";
import { shortSubjectName } from "@/lib/taxonomy";

export type LearnItem = { id: string; title: string; term: number | null; kind: "note" | "paper"; href: string };
export type LearnSubject = { slug: string; name: string; items: LearnItem[] };
export type LearnClass = { slug: string; shortName: string; subjects: LearnSubject[] };

export function pinTitle(shortName: string, subjectName: string, term: string) {
  return `${shortName.replace(/\./g, "")} · Term ${term} · ${shortSubjectName(subjectName)}`;
}

export function LearnPicker({
  classes,
  classSlug,
  subjectSlug,
  term,
  mode,
}: {
  classes: LearnClass[];
  classSlug: string;
  subjectSlug: string;
  term: string;
  mode: "notes" | "paper";
}) {
  const router = useRouter();
  const currentClass = classes.find((item) => item.slug === classSlug) || classes[0];
  const currentSubject = currentClass?.subjects.find((item) => item.slug === subjectSlug) || currentClass?.subjects[0];
  const termNumber = Number(term);
  const kind = mode === "notes" ? "note" : "paper";
  const rows = (currentSubject?.items || []).filter((item) => item.kind === kind && item.term === termNumber);

  useEffect(() => {
    const query = new URLSearchParams({ class: classSlug, subject: subjectSlug, term, mode });
    sessionStorage.setItem("sq-learn", query.toString());
  }, [classSlug, subjectSlug, term, mode]);

  function go(next: { classSlug?: string; subjectSlug?: string; term?: string; mode?: "notes" | "paper" }) {
    const grade = classes.find((item) => item.slug === (next.classSlug || classSlug)) || currentClass;
    const subject = grade?.subjects.find((item) => item.slug === (next.subjectSlug || subjectSlug)) || grade?.subjects[0];
    const params = new URLSearchParams({
      class: grade?.slug || classSlug,
      subject: subject?.slug || subjectSlug,
      term: next.term || term,
      mode: next.mode || mode,
    });
    router.replace(`/dashboard/learn?${params.toString()}`, { scroll: false });
  }

  if (!currentClass || !currentSubject) return <p>No classes are ready yet.</p>;
  const title = pinTitle(currentClass.shortName, currentSubject.name, term);

  return (
    <div>
      <div className="learn-pin">
        <h1 className="font-display">{title}</h1>
        <div className="learn-filters">
          <label>Class
            <select aria-label="Class" value={currentClass.slug} onChange={(event) => go({ classSlug: event.target.value })}>
              {classes.map((item) => <option key={item.slug} value={item.slug}>{item.shortName}</option>)}
            </select>
          </label>
          <label>Subject
            <select aria-label="Subject" value={currentSubject.slug} onChange={(event) => go({ subjectSlug: event.target.value })}>
              {currentClass.subjects.map((item) => <option key={item.slug} value={item.slug}>{shortSubjectName(item.name)}</option>)}
            </select>
          </label>
          <label>Term
            <select aria-label="School term" value={term} onChange={(event) => go({ term: event.target.value })}>
              <option value="1">Term 1</option>
              <option value="2">Term 2</option>
              <option value="3">Term 3</option>
            </select>
          </label>
          <label>Open
            <select aria-label="Notes or practice" value={mode} onChange={(event) => go({ mode: event.target.value === "paper" ? "paper" : "notes" })}>
              <option value="notes">Notes</option>
              <option value="paper">Practice questions</option>
            </select>
          </label>
        </div>
      </div>
      {rows.length ? (
        <div className="quest-doors">
          {rows.map((item, index) => <QuestDoor key={item.id} tone={index} href={item.href} label={item.title} />)}
        </div>
      ) : (
        <p className="rounded-2xl border bg-white px-4 py-6 text-center font-bold">This door is locked. Try another term.</p>
      )}
    </div>
  );
}
