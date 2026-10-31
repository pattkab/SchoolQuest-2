export const CLASS_BANDS = [
  {
    id: "early-years",
    label: "Early years",
    short: "Baby–Top",
    slugs: ["baby", "middle", "top"],
    blurb: "Play, songs, counting and first letters.",
  },
  {
    id: "lower-primary",
    label: "Lower primary",
    short: "P.1–P.3",
    slugs: ["p1", "p2", "p3"],
    blurb: "Thematic literacy, numeracy and life skills.",
  },
  {
    id: "upper-primary",
    label: "Upper primary",
    short: "P.4–P.6",
    slugs: ["p4", "p5", "p6"],
    blurb: "Subjects taught in English.",
  },
  {
    id: "ple",
    label: "PLE year",
    short: "P.7",
    slugs: ["p7"],
    blurb: "Revision, mocks and teacher marking.",
  },
] as const;

export type BandId = (typeof CLASS_BANDS)[number]["id"];

const CORE_BY_BAND: Record<BandId, string[]> = {
  "early-years": ["language-development", "mathematical-concepts", "reading", "writing", "health-habits"],
  "lower-primary": ["literacy-1", "literacy-2", "english", "mathematics"],
  "upper-primary": ["mathematics", "english", "science", "social-studies"],
  ple: ["mathematics", "english", "science", "social-studies"],
};

export function bandForSlug(slug: string) {
  return CLASS_BANDS.find((band) => (band.slugs as readonly string[]).includes(slug)) ?? null;
}

export function bandById(id?: string | null) {
  return CLASS_BANDS.find((band) => band.id === id) ?? null;
}

export function isCoreSubject(classSlug: string, subjectSlug: string) {
  const band = bandForSlug(classSlug);
  if (!band) return true;
  return CORE_BY_BAND[band.id].includes(subjectSlug);
}

export function splitSubjects<T extends { slug: string }>(classSlug: string, subjects: T[]) {
  const core: T[] = [];
  const more: T[] = [];
  for (const subject of subjects) {
    (isCoreSubject(classSlug, subject.slug) ? core : more).push(subject);
  }
  return { core, more };
}

export function hasTopicWork(topic: { notes?: unknown[]; papers?: unknown[] }) {
  return Boolean(topic.notes?.length || topic.papers?.length);
}

export function shortSubjectName(name: string) {
  return name
    .replace("Literacy II (Reading & Writing)", "Lit II")
    .replace("Literacy I (Thematic)", "Lit I")
    .replace("Integrated ", "")
    .replace(" (Thematic)", "")
    .replace(" (Reading & Writing)", "")
    .replace("Holiday Packages & Mixed Papers", "Holiday")
    .replace("Creative Arts & PE", "Arts & PE")
    .replace("Theology / Religious Education", "RE")
    .replace("Religious Education", "RE")
    .replace("Mathematical Concepts", "Maths")
    .replace("Mathematics", "Maths")
    .replace("Language Development", "Language")
    .replace("Social Development", "Social")
    .replace("Health Habits", "Health")
    .replace("General Knowledge", "GK")
    .replace("News & Oral Literature", "Oral")
    .replace("Local Language", "Local lang.")
    .replace("Social Studies", "SST");
}

export function defaultSubjectSlug(classSlug: string, subjects: { slug: string }[]) {
  const band = bandForSlug(classSlug);
  const preferred = band ? CORE_BY_BAND[band.id] : [];
  return preferred.find((slug) => subjects.some((subject) => subject.slug === slug)) || subjects[0]?.slug || null;
}
