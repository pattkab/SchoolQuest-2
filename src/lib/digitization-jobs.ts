import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";
import {
  blockingIssues,
  chooseModel,
  classifySource,
  DAILY_JOB_CAP,
  DAILY_TOKEN_CAP,
  MAX_ATTEMPTS,
  normalizeDraft,
  sourceFingerprint,
  validateUpload,
  type DraftPaper,
} from "@/lib/digitization";

export type Extraction = { raw: unknown; tokens: number; model: string };
export type Extractor = (input: { buffer: Buffer; mime: string; kind: string; model: string }) => Promise<Extraction>;

const store = path.join(process.cwd(), "data", "digitization");

function fileFor(id: string) {
  return path.join(store, `${id}.bin`);
}

async function logEvent(jobId: string, stage: string, message: string, actorId?: string) {
  await db.digitizationEvent.create({ data: { jobId, stage, message, actorId: actorId || null } });
}

export async function enqueueDigitization(input: { userId: string; buffer: Buffer; fileName: string; mime: string; subjectId?: string | null; title?: string | null; year?: number | null }) {
  const invalid = validateUpload(input.buffer, input.mime);
  if (invalid) throw new Error(invalid);
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const [today, tokens] = await Promise.all([
    db.digitizationJob.count({ where: { createdById: input.userId, createdAt: { gte: since } } }),
    db.digitizationJob.aggregate({ where: { createdById: input.userId, createdAt: { gte: since } }, _sum: { tokensUsed: true } }),
  ]);
  if (today >= DAILY_JOB_CAP) throw new Error("Today's paper processing limit has been reached.");
  if ((tokens._sum.tokensUsed || 0) >= DAILY_TOKEN_CAP) throw new Error("Today's processing allowance has been used.");
  const sourceHash = sourceFingerprint(input.buffer);
  const existing = await db.digitizationJob.findFirst({
    where: { createdById: input.userId, sourceHash, status: { in: ["QUEUED", "PROCESSING", "AWAITING_REVIEW", "NEEDS_CORRECTION", "APPROVED"] } },
  });
  if (existing) return existing;
  const kind = classifySource(input.buffer, input.mime);
  const job = await db.digitizationJob.create({
    data: {
      createdById: input.userId,
      sourceHash,
      sourceKind: kind,
      fileName: input.fileName,
      mime: input.mime,
      byteSize: input.buffer.length,
      subjectId: input.subjectId || null,
      title: input.title || null,
      year: input.year || null,
      model: chooseModel(kind),
      maxAttempts: MAX_ATTEMPTS,
    },
  });
  await mkdir(store, { recursive: true });
  await writeFile(fileFor(job.id), input.buffer);
  await logEvent(job.id, "queued", "Paper is queued. Learners cannot see it yet.", input.userId);
  return job;
}

export async function advanceJob(jobId: string, extract: Extractor) {
  const job = await db.digitizationJob.findUnique({ where: { id: jobId } });
  if (!job) throw new Error("Processing job not found.");
  if (job.cancelRequested && job.status === "QUEUED") {
    return db.digitizationJob.update({ where: { id: jobId }, data: { status: "CANCELLED", stage: "cancelled", progress: 100 } });
  }
  if (!["QUEUED", "FAILED"].includes(job.status) || job.attempts >= job.maxAttempts) return job;
  const claimed = await db.digitizationJob.updateMany({
    where: { id: jobId, status: { in: ["QUEUED", "FAILED"] }, attempts: { lt: job.maxAttempts } },
    data: { status: "PROCESSING", stage: "reading", progress: 15, attempts: { increment: 1 } },
  });
  if (claimed.count === 0) return db.digitizationJob.findUniqueOrThrow({ where: { id: jobId } });
  try {
    const buffer = await readFile(fileFor(jobId));
    if (job.cancelRequested) return db.digitizationJob.update({ where: { id: jobId }, data: { status: "CANCELLED", stage: "cancelled", progress: 100 } });
    await db.digitizationJob.update({ where: { id: jobId }, data: { stage: "extracting", progress: 45 } });
    const extracted = await extract({ buffer, mime: job.mime, kind: job.sourceKind, model: job.model });
    const draft = normalizeDraft(extracted.raw, job.title || job.fileName.replace(/\.pdf$/i, ""));
    const blocking = blockingIssues(draft);
    const status = blocking.length ? "NEEDS_CORRECTION" : "AWAITING_REVIEW";
    await logEvent(job.id, status, blocking.length ? `Needs a teacher: ${blocking.slice(0, 4).join(", ")}` : "Ready for teacher review.");
    return db.digitizationJob.update({
      where: { id: jobId },
      data: {
        status,
        stage: "review",
        progress: 100,
        tokensUsed: extracted.tokens,
        model: extracted.model,
        confidence: draft.confidence,
        draft: JSON.stringify(draft),
        errorClass: null,
        errorMessage: null,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Processing failed.";
    const errorClass = /quota|allowance/i.test(message) ? "QUOTA" : /unread|empty|pdf/i.test(message) ? "UNREADABLE" : "PROVIDER";
    const attempts = job.attempts + 1;
    await logEvent(job.id, "failed", message);
    return db.digitizationJob.update({
      where: { id: jobId },
      data: { status: attempts >= job.maxAttempts ? "FAILED" : "QUEUED", stage: "failed", errorClass, errorMessage: message },
    });
  }
}

export async function approveJob(jobId: string, actorId: string) {
  const job = await db.digitizationJob.findUnique({ where: { id: jobId } });
  if (!job) throw new Error("Processing job not found.");
  if (job.createdById !== actorId && job.reviewerId !== actorId) {
    const actor = await db.user.findUnique({ where: { id: actorId }, select: { role: true } });
    if (actor?.role !== "ADMIN" && actor?.role !== "SUPER_ADMIN") throw new Error("This paper belongs to another teacher.");
  }
  const draft = readDraft(job.draft);
  if (!draft || blockingIssues(draft).length || !draft.questions.length) throw new Error("Correct the paper before approval.");
  if (!job.subjectId) throw new Error("Choose a subject before approval.");
  const paper = await db.paper.create({
    data: {
      title: draft.title,
      year: draft.year,
      subjectId: job.subjectId,
      status: "DRAFT",
      sourceType: "UPLOAD",
      authorId: actorId,
      questions: {
        create: draft.questions.map((question, index) => ({
          type: question.type,
          prompt: question.prompt,
          displayNumber: question.number,
          options: question.options ? JSON.stringify(question.options) : null,
          correctAnswer: question.type === "DIAGRAM_LABEL"
            ? JSON.stringify({ labels: question.labels.map((label) => ({ id: label.id, x: label.x, y: label.y, prompt: label.prompt, accept: [label.accept] })) })
            : JSON.stringify(question.correctAnswer),
          explanation: question.explanation,
          markingGuide: question.explanation,
          points: question.points || 1,
          order: index + 1,
          requiresTeacher: question.type === "LONG_ANSWER" || question.type === "COMPREHENSION" || question.type === "DRAWING",
        })),
      },
    },
  });
  const created = await db.question.findMany({ where: { paperId: paper.id }, orderBy: { order: "asc" } });
  for (let index = 0; index < draft.questions.length; index += 1) {
    const parentNumber = draft.questions[index].parentNumber;
    if (!parentNumber) continue;
    const parentIndex = draft.questions.findIndex((question) => question.number === parentNumber);
    if (parentIndex >= 0 && created[parentIndex] && created[index]) {
      await db.question.update({ where: { id: created[index].id }, data: { parentId: created[parentIndex].id } });
    }
  }
  await logEvent(jobId, "approved", "Approved as a draft. It is not published.", actorId);
  return db.digitizationJob.update({ where: { id: jobId }, data: { status: "APPROVED", paperId: paper.id, reviewerId: actorId, reviewedAt: new Date() } });
}

export async function publishJob(jobId: string, actorId: string) {
  const job = await db.digitizationJob.findUnique({ where: { id: jobId } });
  if (!job || job.status !== "APPROVED" || !job.paperId) throw new Error("Approve the paper before publishing it.");
  await db.paper.update({ where: { id: job.paperId }, data: { status: "PUBLISHED" } });
  await logEvent(jobId, "published", "Published for learners.", actorId);
  return db.digitizationJob.update({ where: { id: jobId }, data: { status: "PUBLISHED", reviewerId: actorId, reviewedAt: new Date() } });
}

export async function cancelJob(jobId: string, actorId: string) {
  const job = await db.digitizationJob.findUnique({ where: { id: jobId } });
  if (!job) throw new Error("Processing job not found.");
  if (!["QUEUED", "FAILED"].includes(job.status)) throw new Error("This paper is already being read.");
  await logEvent(jobId, "cancelled", "The teacher cancelled this paper.", actorId);
  return db.digitizationJob.update({ where: { id: jobId }, data: { status: "CANCELLED", stage: "cancelled", progress: 100, cancelRequested: true, reviewerId: actorId } });
}

export async function rejectJob(jobId: string, actorId: string, reason: string) {
  if (!reason.trim()) throw new Error("Say why this paper is rejected.");
  await logEvent(jobId, "rejected", reason.trim(), actorId);
  return db.digitizationJob.update({ where: { id: jobId }, data: { status: "REJECTED", reviewerId: actorId, reviewedAt: new Date(), errorMessage: reason.trim() } });
}

export function readDraft(raw: string | null): DraftPaper | null {
  if (!raw) return null;
  try { return JSON.parse(raw) as DraftPaper; } catch { return null; }
}

export async function updateDraft(jobId: string, actorId: string, draft: DraftPaper, message: string) {
  const blocking = blockingIssues(draft);
  await logEvent(jobId, "edited", message, actorId);
  return db.digitizationJob.update({
    where: { id: jobId },
    data: { draft: JSON.stringify(draft), status: blocking.length ? "NEEDS_CORRECTION" : "AWAITING_REVIEW", reviewerId: actorId, reviewedAt: new Date() },
  });
}
