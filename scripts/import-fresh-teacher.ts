import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { z } from "zod";
import { db } from "../src/lib/db";
import { advanceJob, enqueueDigitization } from "../src/lib/digitization-jobs";

const repo = "Fresh-Teacher/fresh-teacher.github.io";
const sha = z.string().regex(/^[a-f0-9]{40}$/);
const inventorySchema = z.object({
  repository: z.literal(repo),
  revision: sha,
  documents: z.array(z.object({
    gitBlob: sha,
    bytes: z.number().int().positive(),
    paths: z.array(z.string()).nonempty(),
  })),
});

async function main() {
  const { values } = parseArgs({
    options: {
      inventory: { type: "string", default: "data/fresh-teacher/inventory.json" },
      approvals: { type: "string" },
      admin: { type: "string" },
      extract: { type: "boolean" },
      "review-only": { type: "boolean" },
    },
  });
  if (!values.approvals || !values.admin) {
    throw new Error("Supply --approvals <json> and --admin <admin email>.");
  }
  const [inventoryText, approvalsText, admin] = await Promise.all([
    readFile(values.inventory, "utf8"),
    readFile(values.approvals, "utf8"),
    db.user.findUnique({ where: { email: values.admin }, select: { id: true, role: true } }),
  ]);
  if (admin?.role !== "ADMIN" && admin?.role !== "SUPER_ADMIN") throw new Error("An administrator is required.");
  const inventory = inventorySchema.parse(JSON.parse(inventoryText));
  const approvals = z.array(z.object({
    gitBlob: sha,
    permission: z.string().trim().min(1).max(2000).optional(),
    subjectId: z.string().min(1),
  })).min(1).max(20).parse(JSON.parse(approvalsText));
  if (!values["review-only"] && approvals.some((approval) => !approval.permission)) {
    throw new Error("Record permission for every source or use --review-only for private drafts.");
  }
  const byBlob = new Map(inventory.documents.map((document) => [document.gitBlob, document]));
  const extractor = values.extract ? (await import("../src/lib/digitization-ai")).extractWithGemini : null;

  for (const approval of approvals) {
    const document = byBlob.get(approval.gitBlob);
    if (!document || document.bytes > 15_000_000) throw new Error(`Missing or oversized PDF: ${approval.gitBlob}`);
    await db.subject.findUniqueOrThrow({ where: { id: approval.subjectId }, select: { id: true } });
    const sourcePath = document.paths[0];
    const segments = sourcePath.split("/");
    if (segments.some((segment) => !segment || segment === "." || segment === "..") || !/\.pdf$/i.test(sourcePath)) {
      throw new Error("Invalid PDF path.");
    }
    const url = `https://raw.githubusercontent.com/${repo}/${inventory.revision}/${segments.map(encodeURIComponent).join("/")}`;
    const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(60_000) });
    if (!response.ok || !response.body) throw new Error(`Download failed: HTTP ${response.status}`);
    const chunks: Uint8Array[] = [];
    let length = 0;
    for await (const chunk of response.body as unknown as AsyncIterable<Uint8Array>) {
      length += chunk.length;
      if (length > document.bytes) throw new Error("PDF exceeded inventory size.");
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const hash = createHash("sha1").update(`blob ${buffer.length}\0`).update(buffer).digest("hex");
    if (hash !== document.gitBlob || buffer.subarray(0, 5).toString() !== "%PDF-") {
      throw new Error(`PDF verification failed: ${sourcePath}`);
    }
    const job = await enqueueDigitization({
      userId: admin.id,
      subjectId: approval.subjectId,
      fileName: path.posix.basename(sourcePath),
      mime: "application/pdf",
      buffer,
      importedSource: { gitBlob: document.gitBlob, url, permission: values["review-only"] ? null : approval.permission ?? null },
    });
    const result = extractor ? await advanceJob(job.id, extractor) : job;
    console.log(`${result.status} /dashboard/teacher/digitization/${result.id}`);
    if (result.errorMessage) throw new Error(result.errorMessage);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}).finally(() => db.$disconnect());
