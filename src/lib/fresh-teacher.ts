import feeds from "@/content/fresh-teacher-feeds.json";
import { db } from "@/lib/db";

export const FRESH_TEACHER_ORIGIN = "https://fresh-teacher.github.io";
export const FRESH_TEACHER_HOME = "https://fresh-teacher.github.io/";

export type FeedKind = "PAST_PAPER" | "LESSON_NOTES" | "SCHEME_OF_WORK" | "HOLIDAY_PACKAGE";

export type FeedDef = {
  feed: string;
  classKey: string;
  subjectKey: string;
  kind: FeedKind | string;
};

export type FreshTeacherItem = {
  title?: string;
  description?: string;
  price?: string;
  pdfUrl?: string;
  url?: string;
  link?: string;
  year?: string | number;
  term?: string | number;
};

export const FRESH_TEACHER_FEEDS = feeds as FeedDef[];

export function feedUrl(feed: string) {
  return `${FRESH_TEACHER_ORIGIN}/${feed}.json`;
}

export function feedsForClass(classKey: string) {
  return FRESH_TEACHER_FEEDS.filter((f) => f.classKey === classKey);
}

export function feedsForSubject(classKey: string, subjectKeys: string[] = []) {
  const keys = new Set(subjectKeys.map((k) => k.toLowerCase()));
  return FRESH_TEACHER_FEEDS.filter((f) => {
    if (f.classKey !== classKey) return false;
    if (!keys.size) return true;
    return keys.has(f.subjectKey.toLowerCase()) || f.subjectKey === "All";
  });
}

function itemUrl(item: FreshTeacherItem) {
  return (item.pdfUrl || item.url || item.link || "").trim();
}

function itemTitle(item: FreshTeacherItem, fallback: string) {
  const title = (item.title || "").trim();
  if (title) return title;
  const url = itemUrl(item);
  if (!url) return fallback;
  try {
    const name = decodeURIComponent(url.split("/").pop() || fallback);
    return name.replace(/\.pdf$/i, "").replace(/[_+]+/g, " ");
  } catch {
    return fallback;
  }
}

export async function fetchFeed(feed: string): Promise<FreshTeacherItem[]> {
  const res = await fetch(feedUrl(feed), {
    next: { revalidate: 3600, tags: [`ft:${feed}`] },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Fresh Teacher feed ${feed} returned ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? (data as FreshTeacherItem[]) : [];
}

export async function listLibrary(options: {
  classKey?: string;
  subjectKeys?: string[];
  kind?: string;
  limit?: number;
}) {
  const selected = FRESH_TEACHER_FEEDS.filter((f) => {
    if (options.classKey && f.classKey !== options.classKey) return false;
    if (options.kind && f.kind !== options.kind) return false;
    if (options.subjectKeys?.length) {
      const keys = options.subjectKeys.map((k) => k.toLowerCase());
      if (!keys.includes(f.subjectKey.toLowerCase()) && f.subjectKey !== "All") return false;
    }
    return true;
  }).slice(0, 12);

  const settled = await Promise.allSettled(
    selected.map(async (def) => {
      const items = await fetchFeed(def.feed);
      return items
        .map((item, index) => {
          const url = itemUrl(item);
          if (!url) return null;
          return {
            feed: def.feed,
            classKey: def.classKey,
            subjectKey: def.subjectKey,
            kind: def.kind,
            title: itemTitle(item, `${def.feed} ${index + 1}`),
            description: item.description || "",
            pdfUrl: url,
            year: item.year ? Number(item.year) || null : null,
            term: item.term ? Number(item.term) || null : null,
          };
        })
        .filter(Boolean) as Array<{
          feed: string;
          classKey: string;
          subjectKey: string;
          kind: string;
          title: string;
          description: string;
          pdfUrl: string;
          year: number | null;
          term: number | null;
        }>;
    })
  );

  const items = settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
  return items.slice(0, options.limit ?? 48);
}

export async function syncFeeds(options?: { classKey?: string; triggeredById?: string }) {
  const selected = FRESH_TEACHER_FEEDS.filter((f) => !options?.classKey || f.classKey === options.classKey);
  const classGrades = await db.classGrade.findMany({ select: { id: true, freshTeacherKey: true } });
  const subjects = await db.subject.findMany({
    select: { id: true, freshTeacherKey: true, classGradeId: true, name: true },
  });

  let newCount = 0;
  let itemCount = 0;

  for (const def of selected) {
    const classGrade = classGrades.find((c) => c.freshTeacherKey === def.classKey);
    const subject = subjects.find((s) => {
      if (!classGrade || s.classGradeId !== classGrade.id) return false;
      const keys = (s.freshTeacherKey || "").split(",").map((k) => k.trim().toLowerCase());
      return keys.includes(def.subjectKey.toLowerCase());
    });

    try {
      const items = await fetchFeed(def.feed);
      let feedNew = 0;
      for (const [index, item] of items.entries()) {
        const url = itemUrl(item);
        if (!url) continue;
        itemCount += 1;
        const existing = await db.externalResource.findUnique({ where: { pdfUrl: url } });
        if (existing) {
          await db.externalResource.update({
            where: { id: existing.id },
            data: { lastSeenAt: new Date(), title: itemTitle(item, existing.title) },
          });
          continue;
        }
        await db.externalResource.create({
          data: {
            source: "FRESH_TEACHER",
            kind: def.kind,
            feed: def.feed,
            classGradeId: classGrade?.id,
            subjectId: subject?.id,
            subjectKey: def.subjectKey,
            title: itemTitle(item, `${def.feed} ${index + 1}`),
            description: item.description || null,
            pdfUrl: url,
            year: item.year ? Number(item.year) || null : null,
            term: item.term ? Number(item.term) || null : null,
            status: "LISTED",
          },
        });
        feedNew += 1;
        newCount += 1;
      }
      await db.syncLog.create({
        data: {
          source: "FRESH_TEACHER",
          feed: def.feed,
          itemCount: items.length,
          newCount: feedNew,
          status: items.length ? "OK" : "EMPTY",
          triggeredById: options?.triggeredById,
        },
      });
    } catch (error) {
      await db.syncLog.create({
        data: {
          source: "FRESH_TEACHER",
          feed: def.feed,
          status: "ERROR",
          message: error instanceof Error ? error.message : "Unknown error",
          triggeredById: options?.triggeredById,
        },
      });
    }
  }

  return { feeds: selected.length, itemCount, newCount };
}
