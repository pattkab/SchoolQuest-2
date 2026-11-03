import { spawnSync } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { isQuestionPaperWithAnswers } from "../src/lib/fresh-teacher-catalog";
import { examQuestionText, questionsFromPaperText, schemeCollection, schemeMatchKey, schemeRole, schemeStatus, type MarkingSchemeFile } from "../src/lib/marking-scheme";

const root = process.cwd();
const library = path.join(root, "data", "fresh-teacher", "library");
const schemes = path.join(root, "data", "fresh-teacher", "schemes");

type IndexEntry = {
  path: string;
  collection: string;
  classSlug: string | null;
  subjectSlug: string | null;
  year: number | null;
  repository: string;
  revision: string;
  sourcePath: string;
  saved: boolean;
};

function pdfText(file: string) {
  const result = spawnSync("python3", ["-c", `
import sys
from pypdf import PdfReader
reader = PdfReader(sys.argv[1])
parts = []
for page in reader.pages[:12]:
    parts.append(page.extract_text() or "")
sys.stdout.write("\\n".join(parts))
`, file], { encoding: "utf8", maxBuffer: 8_000_000 });
  return result.status === 0 ? result.stdout : "";
}

async function main() {
  const limit = Number(process.argv.find((arg) => arg.startsWith("--limit="))?.split("=")[1] || 40);
  const index = JSON.parse(await readFile(path.join(root, "data", "fresh-teacher", "library-index.json"), "utf8")) as { files: Record<string, IndexEntry> };
  const guidesIndex = JSON.parse(await readFile(path.join(root, "data", "fresh-teacher", "guides-index.json"), "utf8").catch(() => "{\"files\":{}}")) as { files: Record<string, IndexEntry> };
  const files = { ...guidesIndex.files, ...index.files };
  await mkdir(schemes, { recursive: true });
  const existing = new Set(await readdir(schemes).catch(() => []));
  const guides = new Map<string, string>();
  const papers: [string, IndexEntry][] = [];
  for (const [blob, file] of Object.entries(files)) {
    if (!file.saved) continue;
    if (schemeRole(file.path, file.collection) === "guide") {
      const key = schemeMatchKey(file.path);
      guides.set(`${file.classSlug || ""}:${key}`, blob);
      if (!guides.has(`*:${key}`)) guides.set(`*:${key}`, blob);
    } else papers.push([blob, file]);
  }
  const guideFor = (file: IndexEntry) => {
    const key = schemeMatchKey(file.path);
    return guides.get(`${file.classSlug || ""}:${key}`) || guides.get(`*:${key}`) || null;
  };
  papers.sort(([, left], [, right]) => {
    const score = (file: IndexEntry) => (guideFor(file) ? 2 : 0) + (isQuestionPaperWithAnswers(file.path) ? 1 : 0);
    return score(right) - score(left);
  });
  let written = 0;
  let ready = 0;
  for (const [blob, file] of papers) {
    if (written >= limit) break;
    if (existing.has(`${blob}.json`)) continue;
    const guideBlob = guideFor(file);
    const paperText = pdfText(path.join(library, `${blob}.pdf`));
    const guideText = guideBlob ? pdfText(path.join(library, `${guideBlob}.pdf`)) : null;
    const prepared = examQuestionText(paperText);
    const questions = questionsFromPaperText(prepared.text, guideText);
    const scheme: MarkingSchemeFile = {
      version: 1,
      gitBlob: blob,
      sourcePath: file.path,
      sourceUrl: `https://raw.githubusercontent.com/${file.repository}/${file.revision}/${file.sourcePath.split("/").map(encodeURIComponent).join("/")}`,
      classSlug: file.classSlug,
      subjectSlug: file.subjectSlug,
      collection: schemeCollection(file.path, file.collection),
      title: path.posix.basename(file.path).replace(/\.pdf$/i, ""),
      year: file.year,
      durationMinutes: prepared.durationMinutes,
      guideBlob,
      status: schemeStatus(questions),
      questions,
    };
    await writeFile(path.join(schemes, `${blob}.json`), JSON.stringify(scheme, null, 2));
    written += 1;
    if (scheme.status === "ready") ready += 1;
  }
  for (const [blob, file] of Object.entries(files)) {
    if (written >= limit) break;
    if (!file.saved || schemeRole(file.path, file.collection) !== "guide" || existing.has(`${blob}.json`)) continue;
    const prepared = examQuestionText(pdfText(path.join(library, `${blob}.pdf`)));
    const questions = questionsFromPaperText(prepared.text, null);
    if (schemeStatus(questions) !== "ready") continue;
    const scheme: MarkingSchemeFile = {
      version: 1,
      gitBlob: blob,
      sourcePath: file.path,
      sourceUrl: `https://raw.githubusercontent.com/${file.repository}/${file.revision}/${file.sourcePath.split("/").map(encodeURIComponent).join("/")}`,
      classSlug: file.classSlug,
      subjectSlug: file.subjectSlug,
      collection: schemeCollection(file.path, file.collection),
      title: path.posix.basename(file.path).replace(/\.pdf$/i, ""),
      year: file.year,
      durationMinutes: prepared.durationMinutes,
      guideBlob: blob,
      status: "ready",
      questions,
    };
    await writeFile(path.join(schemes, `${blob}.json`), JSON.stringify(scheme, null, 2));
    written += 1;
    ready += 1;
  }
  console.log(`schemes written ${written}, ready ${ready}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
