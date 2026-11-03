export type TopicLink = { id: string; title: string };

export type LinkedTopic = {
  id: string;
  name: string;
  term: number | null;
  notes: TopicLink[];
  papers: TopicLink[];
};

function words(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** True when an uploaded title is the topic, or contains the topic as whole words. */
export function titlesMatch(title: string, topicName: string) {
  const left = words(title);
  const right = words(topicName);
  if (!left || !right) return false;
  if (left === right) return true;
  const escaped = right.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (new RegExp(`(?:^| )${escaped}(?: |$)`).test(left)) return true;
  return right.length >= 12 && (left.includes(right) || right.includes(left));
}

export async function topicIdForTitle(subjectId: string, title: string) {
  const { db } = await import("@/lib/db");
  const topics = await db.topic.findMany({ where: { subjectId }, select: { id: true, name: true } });
  return topics.find((topic) => titlesMatch(title, topic.name))?.id ?? null;
}

export function attachLoose<T extends LinkedTopic>(topics: T[], notes: TopicLink[], papers: TopicLink[]) {
  const usedNotes = new Set<string>();
  const usedPapers = new Set<string>();
  return topics.map((topic) => {
    const nextNotes = [...topic.notes];
    const nextPapers = [...topic.papers];
    for (const note of notes) {
      if (!usedNotes.has(note.id) && titlesMatch(note.title, topic.name)) {
        nextNotes.push(note);
        usedNotes.add(note.id);
      }
    }
    for (const paper of papers) {
      if (!usedPapers.has(paper.id) && titlesMatch(paper.title, topic.name)) {
        nextPapers.push(paper);
        usedPapers.add(paper.id);
      }
    }
    return { ...topic, notes: nextNotes, papers: nextPapers };
  });
}

export const PRIMARY_SUBJECTS = [
  { slug: "mathematics", label: "Maths" },
  { slug: "english", label: "English" },
  { slug: "literacy-1", label: "Lit I" },
  { slug: "literacy-2", label: "Lit II" },
  { slug: "science", label: "Science" },
  { slug: "social-studies", label: "SST" },
  { slug: "religious-education", label: "RE" },
  { slug: "local-language", label: "Local lang." },
  { slug: "creative-arts-and-pe", label: "Arts & PE" },
] as const;

export const PREPRIMARY_SUBJECTS = [
  { slug: "language-development", label: "Language" },
  { slug: "mathematical-concepts", label: "Maths" },
  { slug: "reading", label: "Reading" },
  { slug: "writing", label: "Writing" },
  { slug: "health-habits", label: "Health" },
  { slug: "social-development", label: "Social" },
] as const;

export const PREPRIMARY_CLASS_SLUGS = ["baby", "middle", "top"] as const;
export const PRIMARY_CLASS_SLUGS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"] as const;
