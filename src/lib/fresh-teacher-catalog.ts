export type CatalogKind = "paper" | "guide" | "notes" | "other";

export type ClassifiedDocument = {
  gitBlob: string;
  bytes: number;
  path: string;
  repository: string;
  revision: string;
  sourcePath: string;
  classSlug: string | null;
  subjectSlug: string | null;
  kind: CatalogKind;
  year: number | null;
};

const CLASS_RULES: [RegExp, string][] = [
  [/\bbaby\b|\bnursery\b|\bnurseriez\b/, "baby"],
  [/\bmiddle\b/, "middle"],
  [/\btop class\b|\btop\b/, "top"],
  [/\bp\s*7\b|\bprimary\s+seven\b|\bple\b/, "p7"],
  [/\bp\s*6\b|\bprimary\s+six\b/, "p6"],
  [/\bp\s*5\b|\bprimary\s+five\b/, "p5"],
  [/\bp\s*4\b|\bprimary\s+four\b/, "p4"],
  [/\bp\s*3\b|\bprimary\s+three\b/, "p3"],
  [/\bp\s*2\b|\bprimary\s+two\b/, "p2"],
  [/\bp\s*1\b|\bprimary\s+one\b/, "p1"],
  [/\bs\s*6\b|\buace\b/, "s6"],
  [/\bs\s*5\b/, "s5"],
  [/\bs\s*4\b|\buce\b/, "s4"],
  [/\bs\s*3\b/, "s3"],
  [/\bs\s*2\b/, "s2"],
  [/\bs\s*1\b/, "s1"],
];

const SUBJECT_RULES: [RegExp, string][] = [
  [/\bbiology\b|\bbio\b/, "biology"],
  [/\bchemistry\b|\bchem\b/, "chemistry"],
  [/\bphysics\b/, "physics"],
  [/\bmathematics\b|\bmaths\b|\bmtc\b/, "mathematics"],
  [/\benglish\b|\beng\b/, "english"],
  [/\bkiswahili\b|\bswahili\b/, "kiswahili"],
  [/\bsocial studies\b|\bsst\b/, "social-studies"],
  [/\breligious\b|\bcre\b|\bire\b/, "religious-education"],
  [/\bintegrated science\b|\bscience\b|\bsci\b/, "science"],
  [/\bhistory\b|\bhist\b/, "history"],
  [/\bgeography\b|\bgeog\b/, "geography"],
  [/\bagric/, "agriculture"],
  [/\bict\b|\bcomputer\b/, "ict"],
  [/\beconomics\b|\becon\b/, "economics"],
  [/\bliterature\b/, "literature"],
  [/\bcommerce\b/, "commerce"],
  [/\bentrepreneur/, "entrepreneurship"],
];

export const FACTORY_CLASSES = [
  ["baby", "Baby"], ["middle", "Middle"], ["top", "Top"],
  ["p1", "P.1"], ["p2", "P.2"], ["p3", "P.3"], ["p4", "P.4"], ["p5", "P.5"], ["p6", "P.6"], ["p7", "P.7"],
  ["s1", "S.1"], ["s2", "S.2"], ["s3", "S.3"], ["s4", "S.4"], ["s5", "S.5"], ["s6", "S.6"],
] as const;

export const FACTORY_SUBJECTS = [
  ["mathematics", "Maths"], ["english", "English"], ["science", "Science"], ["social-studies", "SST"],
  ["religious-education", "RE"], ["kiswahili", "Kiswahili"], ["ict", "ICT"], ["biology", "Biology"],
  ["chemistry", "Chemistry"], ["physics", "Physics"], ["history", "History"], ["geography", "Geography"],
  ["agriculture", "Agriculture"], ["economics", "Economics"],
] as const;

export function classifyFreshTeacherPath(filePath: string) {
  const text = filePath.toLowerCase().replace(/[_./-]+/g, " ");
  const classSlug = CLASS_RULES.find(([pattern]) => pattern.test(text))?.[1] ?? null;
  const subjectSlug = SUBJECT_RULES.find(([pattern]) => pattern.test(text))?.[1] ?? null;
  const yearMatch = text.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? Number(yearMatch[0]) : null;
  let kind: CatalogKind = "other";
  if (/marking guide|mark scheme|marking scheme|with answers|answer sheet/.test(text)) kind = "guide";
  else if (/lesson note|\bnotes\b|scheme of work|\bschemes\b/.test(text)) kind = "notes";
  else if (/syllabus|curriculum/.test(text)) kind = "other";
  else if (classSlug || subjectSlug) kind = "paper";
  return { classSlug, subjectSlug, kind, year };
}

export function classifyInventoryDocument(document: {
  gitBlob: string;
  bytes: number;
  paths: string[];
  source?: { repository: string; revision: string; path: string };
}, revision: string): ClassifiedDocument {
  const path = document.paths[0] || document.source?.path || "";
  const classified = classifyFreshTeacherPath(`${path} ${document.paths.slice(1, 4).join(" ")}`);
  return {
    gitBlob: document.gitBlob,
    bytes: document.bytes,
    path,
    repository: document.source?.repository || "Fresh-Teacher/fresh-teacher.github.io",
    revision: document.source?.revision || revision,
    sourcePath: document.source?.path || path,
    ...classified,
  };
}

export function summarizeCatalog(documents: ClassifiedDocument[], pathCount: number, revision: string) {
  const byKind: Record<CatalogKind, number> = { paper: 0, guide: 0, notes: 0, other: 0 };
  const byClass: Record<string, Record<CatalogKind, number>> = {};
  for (const document of documents) {
    byKind[document.kind] += 1;
    if (!document.classSlug) continue;
    const row = byClass[document.classSlug] || { paper: 0, guide: 0, notes: 0, other: 0 };
    row[document.kind] += 1;
    byClass[document.classSlug] = row;
  }
  return { revision, documents: documents.length, paths: pathCount, byKind, byClass };
}
