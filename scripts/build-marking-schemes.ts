import { spawnSync } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { questionsFromPaperText, schemeMatchKey, schemeStatus, type MarkingSchemeFile } from "../src/lib/marking-scheme";

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
  await mkdir(schemes, { recursive: true });
  const existing = new Set(await readdir(schemes).catch(() => []));
  const papers = Object.entries(index.files).filter(([, file]) => file.saved && file.collection !== "guide");
  const guides = new Map<string, string>();
  for (const [blob, file] of Object.entries(index.files)) {
    if (file.saved && file.collection === "guide") guides.set(`${file.classSlug || ""}:${schemeMatchKey(file.path)}`, blob);
  }
  let written = 0;
  let ready = 0;
  for (const [blob, file] of papers) {
    if (written >= limit) break;
    if (existing.has(`${blob}.json`)) continue;
    const guideBlob = guides.get(`${file.classSlug || ""}:${schemeMatchKey(file.path)}`) || null;
    const paperText = pdfText(path.join(library, `${blob}.pdf`));
    const guideText = guideBlob ? pdfText(path.join(library, `${guideBlob}.pdf`)) : null;
    const questions = questionsFromPaperText(paperText, guideText);
    const scheme: MarkingSchemeFile = {
      version: 1,
      gitBlob: blob,
      sourcePath: file.path,
      sourceUrl: `https://raw.githubusercontent.com/${file.repository}/${file.revision}/${file.sourcePath.split("/").map(encodeURIComponent).join("/")}`,
      classSlug: file.classSlug,
      subjectSlug: file.subjectSlug,
      collection: file.collection as MarkingSchemeFile["collection"],
      title: path.posix.basename(file.path).replace(/\.pdf$/i, ""),
      year: file.year,
      guideBlob,
      status: schemeStatus(questions),
      questions,
    };
    await writeFile(path.join(schemes, `${blob}.json`), JSON.stringify(scheme, null, 2));
    written += 1;
    if (scheme.status === "ready") ready += 1;
  }
  console.log(`schemes written ${written}, ready ${ready}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
