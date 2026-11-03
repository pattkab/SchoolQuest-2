import { createHash } from "node:crypto";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { classifyFreshTeacherPath, collectionFor, isAnswerKey, isQuestionPaperWithAnswers, learningKind, LIBRARY_COLLECTIONS } from "../src/lib/fresh-teacher-catalog";

const root = process.cwd();
const guidesOnly = process.argv.includes("--guides");
const learningOnly = process.argv.includes("--learning");
const library = path.join(root, "data", "fresh-teacher", learningOnly ? "learning" : "library");
const indexPath = path.join(root, "data", "fresh-teacher", learningOnly ? "learning-index.json" : guidesOnly ? "guides-index.json" : "library-index.json");

type InventoryDocument = {
  gitBlob: string;
  bytes: number;
  paths: string[];
  source?: { repository: string; revision: string; path: string };
};

type IndexEntry = {
  path: string;
  bytes: number;
  collection: string;
  classSlug: string | null;
  subjectSlug: string | null;
  year: number | null;
  repository: string;
  revision: string;
  sourcePath: string;
  saved: boolean;
  error?: string;
};

async function loadIndex(): Promise<{ revision: string; files: Record<string, IndexEntry> }> {
  try {
    return JSON.parse(await readFile(indexPath, "utf8"));
  } catch {
    return { revision: "", files: {} };
  }
}

async function saveIndex(index: { revision: string; files: Record<string, IndexEntry> }) {
  const temporary = `${indexPath}.tmp`;
  await writeFile(temporary, JSON.stringify(index));
  await rename(temporary, indexPath);
}

async function main() {
  const inventory = JSON.parse(await readFile(path.join(root, "data", "fresh-teacher", "inventory.json"), "utf8")) as {
    repository: string;
    revision: string;
    documents: InventoryDocument[];
  };
  await mkdir(library, { recursive: true });
  const index = await loadIndex();
  index.revision = inventory.revision;
  const selected = inventory.documents.flatMap((document) => {
    const filePath = document.paths[0] || "";
    const classified = classifyFreshTeacherPath(filePath);
    const collection = collectionFor(filePath, classified.kind);
    if (document.bytes > 15_000_000 || document.bytes < 1000) return [];
    if (learningOnly) {
      const learning = learningKind(filePath);
      if (!learning) return [];
      return [{ document, filePath, classified, collection: learning }];
    }
    if (guidesOnly) {
      const markingSource = isAnswerKey(filePath) || isQuestionPaperWithAnswers(filePath);
      if (!markingSource || /interview/.test(filePath) || queuedByPaperPull(filePath)) return [];
      return [{ document, filePath, classified, collection: isAnswerKey(filePath) ? "guide" : collection }];
    }
    if (!LIBRARY_COLLECTIONS.has(collection)) return [];
    return [{ document, filePath, classified, collection }];
  });
  console.log(`selected ${selected.length} files`);
  let cursor = 0;
  let saved = 0;
  const workers = Array.from({ length: 4 }, async () => {
    while (cursor < selected.length) {
      const item = selected[cursor];
      cursor += 1;
      const blob = item.document.gitBlob;
      const destination = path.join(library, `${blob}.pdf`);
      const existing = index.files[blob];
      if (existing?.saved) {
        try {
          const info = await stat(destination);
          if (info.size === item.document.bytes) continue;
        } catch { /* download again */ }
      }
      const source = item.document.source ?? { repository: inventory.repository, revision: inventory.revision, path: item.filePath };
      const entry: IndexEntry = {
        path: item.filePath,
        bytes: item.document.bytes,
        collection: item.collection,
        classSlug: item.classified.classSlug,
        subjectSlug: item.classified.subjectSlug,
        year: item.classified.year,
        repository: source.repository,
        revision: source.revision,
        sourcePath: source.path,
        saved: false,
      };
      try {
        const segments = source.path.split("/");
        if (segments.some((segment) => !segment || segment === "." || segment === "..") || !/^Fresh-Teacher\/[A-Za-z0-9_.-]+$/.test(source.repository)) {
          throw new Error("Invalid source path.");
        }
        const url = `https://raw.githubusercontent.com/${source.repository}/${source.revision}/${segments.map(encodeURIComponent).join("/")}`;
        const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(90_000) });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const buffer = Buffer.from(await response.arrayBuffer());
        const hash = createHash("sha1").update(`blob ${buffer.length}\0`).update(buffer).digest("hex");
        if (hash !== blob || buffer.subarray(0, 5).toString() !== "%PDF-") throw new Error("The download did not match the inventory.");
        await writeFile(destination, buffer);
        entry.saved = true;
        entry.bytes = buffer.length;
        saved += 1;
      } catch (error) {
        entry.error = error instanceof Error ? error.message : "Download failed.";
      }
      index.files[blob] = entry;
      if (saved % 20 === 0) {
        await saveIndex(index);
        const done = Object.values(index.files).filter((file) => file.saved).length;
        console.log(`saved ${done}/${selected.length}`);
      }
    }
  });
  await Promise.all(workers);
  await saveIndex(index);
  const done = Object.values(index.files).filter((file) => file.saved).length;
  console.log(`library ready: ${done} pdfs in data/fresh-teacher/library`);
}

/** The paper pull already running selected these with the earlier filename rules. */
function queuedByPaperPull(filePath: string) {
  const text = filePath.toLowerCase().replace(/[_./-]+/g, " ");
  if (/marking guide|mark scheme|marking scheme|with answers|answer sheet/.test(text)) return true;
  if (/lesson note|\bnotes\b|scheme of work|\bschemes\b/.test(text)) return false;
  return /holiday|past paper|\bple\b|\buneb\b|\bexam\b|end of term|\beoy\b|\beot\b|\bbot\b|\bmock\b|\bset\b/.test(text);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
