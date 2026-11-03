"use server";

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { after } from "next/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { classifyFreshTeacherPath, type CatalogKind } from "@/lib/fresh-teacher-catalog";
import { advanceJob, enqueueDigitization } from "@/lib/digitization-jobs";
import { requireUser, isAdmin } from "@/lib/session";

const inventoryPath = path.join(process.cwd(), "data", "fresh-teacher", "inventory.json");

type InventoryDocument = {
  gitBlob: string;
  bytes: number;
  paths: string[];
  source?: { repository: string; revision: string; path: string };
};

export async function queueFreshTeacherAction(formData: FormData) {
  const user = await requireUser();
  if (!isAdmin(user.role)) throw new Error("Site admin only.");
  const classSlug = String(formData.get("classSlug") || "");
  const subjectSlug = String(formData.get("subjectSlug") || "");
  const kind = String(formData.get("kind") || "paper") as CatalogKind;
  const limit = Math.min(5, Math.max(1, Number(formData.get("limit") || 3)));
  if (!/^[a-z0-9-]+$/.test(classSlug) || !/^[a-z0-9-]+$/.test(subjectSlug)) throw new Error("Choose a class and a subject.");
  if (!["paper", "guide", "notes"].includes(kind)) throw new Error("Choose papers, guides, or notes.");

  const subject = await db.subject.findFirst({
    where: { slug: subjectSlug, classGrade: { slug: classSlug } },
    select: { id: true },
  });
  if (!subject) throw new Error("That class does not have this subject yet.");

  const inventory = JSON.parse(await readFile(inventoryPath, "utf8")) as {
    repository: string;
    revision: string;
    documents: InventoryDocument[];
  };
  const known = new Set((await db.digitizationSource.findMany({ select: { gitBlob: true } })).map((row) => row.gitBlob));
  const candidates = inventory.documents
    .map((document) => {
      const filePath = document.paths[0] || "";
      const classified = classifyFreshTeacherPath(`${filePath} ${document.paths.slice(1, 3).join(" ")}`);
      return { document, filePath, ...classified };
    })
    .filter((item) => item.classSlug === classSlug && item.subjectSlug === subjectSlug && item.kind === kind && item.document.bytes <= 8_000_000 && !known.has(item.document.gitBlob))
    .sort((a, b) => a.document.bytes - b.document.bytes)
    .slice(0, limit);

  if (!candidates.length) throw new Error("No new files match that class and subject. Try another subject, or the inventory already queued them.");

  let queued = 0;
  for (const item of candidates) {
    const source = item.document.source ?? {
      repository: inventory.repository,
      revision: inventory.revision,
      path: item.filePath,
    };
    const segments = source.path.split("/");
    if (segments.some((segment) => !segment || segment === "." || segment === "..") || !/\.pdf$/i.test(source.path)) continue;
    if (!/^Fresh-Teacher\/[A-Za-z0-9_.-]+$/.test(source.repository)) continue;
    const url = `https://raw.githubusercontent.com/${source.repository}/${source.revision}/${segments.map(encodeURIComponent).join("/")}`;
    const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(60_000) });
    if (!response.ok) continue;
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length !== item.document.bytes || buffer.subarray(0, 5).toString() !== "%PDF-") continue;
    const hash = createHash("sha1").update(`blob ${buffer.length}\0`).update(buffer).digest("hex");
    if (hash !== item.document.gitBlob) continue;
    const job = await enqueueDigitization({
      userId: user.id,
      subjectId: subject.id,
      fileName: path.posix.basename(source.path),
      mime: "application/pdf",
      buffer,
      title: path.posix.basename(source.path).replace(/\.pdf$/i, ""),
      year: item.year,
      importedSource: { gitBlob: item.document.gitBlob, url, permission: null },
    });
    queued += 1;
    after(() => {
      void import("@/lib/digitization-ai")
        .then((mod) => advanceJob(job.id, mod.extractWithGemini))
        .catch(() => undefined);
    });
  }
  if (!queued) throw new Error("The matching files could not be downloaded. Try again in a moment.");
  redirect(`/dashboard/teacher/digitization?queued=${queued}`);
}
