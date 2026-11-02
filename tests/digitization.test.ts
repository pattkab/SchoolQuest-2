import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { unlink } from "node:fs/promises";
import test from "node:test";
import { blockingIssues, chooseModel, classifySource, normalizeDraft, validateUpload } from "../src/lib/digitization";

const digital = Buffer.from("%PDF-1.4\n/Font\n(Hello) Tj");
const scan = Buffer.from("%PDF-1.4\nscan only");

test("a text PDF and a scan are classified differently", () => {
  assert.equal(classifySource(digital, "application/pdf"), "PDF");
  assert.equal(classifySource(scan, "application/pdf"), "SCAN");
  assert.equal(classifySource(Buffer.from("not a pdf"), "image/jpeg"), "SCAN");
});

test("model choice stays on the configured flash model unless an override is set", () => {
  delete process.env.DIGITIZATION_SCAN_MODEL;
  delete process.env.DIGITIZATION_TEXT_MODEL;
  assert.equal(chooseModel("PDF"), "gemini-2.5-flash");
  assert.equal(chooseModel("SCAN"), "gemini-2.5-flash");
  process.env.DIGITIZATION_SCAN_MODEL = "gemini-2.5-pro";
  assert.equal(chooseModel("SCAN"), "gemini-2.5-pro");
  delete process.env.DIGITIZATION_SCAN_MODEL;
});

test("a draft with missing marks or an unconfirmed diagram cannot be approved", () => {
  const missing = normalizeDraft({ questions: [{ type: "SHORT_ANSWER", prompt: "Name the longest river", correctAnswer: "Nile" }] }, "Science");
  assert.ok(blockingIssues(missing).includes("missing-marks"));
  const diagram = normalizeDraft({
    questions: [{ type: "DIAGRAM_LABEL", prompt: "Label the parts of the heart", points: 2, labels: [{ id: "a", x: 0.2, y: 0.3, prompt: "Aorta" }] }],
  }, "Science");
  assert.ok(blockingIssues(diagram).includes("unconfirmed-diagram"));
  assert.equal(validateUpload(Buffer.alloc(0), "application/pdf"), "The file is empty.");
});

test("the queue does not import the model client", () => {
  const queue = readFileSync(new URL("../src/lib/digitization-jobs.ts", import.meta.url), "utf8");
  const upload = readFileSync(new URL("../src/app/dashboard/teacher/upload/actions.ts", import.meta.url), "utf8");
  assert.equal(queue.includes("@/lib/gemini"), false);
  assert.equal(queue.includes("extractQuestionsFromPDF"), false);
  assert.equal(upload.includes("extractQuestionsFromPDF"), false);
  assert.equal(upload.includes("enqueueDigitization"), true);
});

async function database() {
  if (!process.env.DATABASE_URL) {
    try {
      const file = readFileSync(new URL("../.env", import.meta.url), "utf8");
      const match = file.match(/^DATABASE_URL=(.*)$/m);
      if (match) process.env.DATABASE_URL = match[1].trim().replace(/^["']|["']$/g, "");
    } catch {
      return null;
    }
  }
  if (!process.env.DATABASE_URL?.startsWith("postgres")) return null;
  const { db } = await import("../src/lib/db");
  return db;
}

test("a queued paper is processed by the stub, stays unpublished, and can be cancelled or retried", async () => {
  const db = await database();
  if (!db) return;
  const { advanceJob, approveJob, cancelJob, enqueueDigitization, publishJob } = await import("../src/lib/digitization-jobs");
  const subject = await db.subject.findFirst();
  assert.ok(subject);
  const user = await db.user.create({ data: { role: "TEACHER", name: "Digitization test", accountKind: "TEST", email: `digitize-${Date.now()}@example.com` } });
  const ids: string[] = [];
  let paperId: string | null = null;
  const calls = { count: 0 };
  const good = async () => {
    calls.count += 1;
    return {
      tokens: 12,
      model: "stub",
      raw: {
        title: "Nile paper",
        questions: [
          { type: "COMPREHENSION", prompt: "Read the passage about the Nile river", points: 2, number: "1" },
          { type: "SHORT_ANSWER", prompt: "Name the longest river", correctAnswer: "Nile", points: 1, number: "1a", parentNumber: "1" },
        ],
      },
    };
  };
  try {
    const queued = await enqueueDigitization({ userId: user.id, buffer: digital, fileName: "nile.pdf", mime: "application/pdf", subjectId: subject.id, title: "Nile" });
    ids.push(queued.id);
    assert.equal(queued.status, "QUEUED");
    assert.equal(calls.count, 0);
    const again = await enqueueDigitization({ userId: user.id, buffer: digital, fileName: "nile.pdf", mime: "application/pdf", subjectId: subject.id });
    assert.equal(again.id, queued.id);

    const reviewed = await advanceJob(queued.id, good);
    assert.equal(reviewed.status, "AWAITING_REVIEW");
    assert.equal(calls.count, 1);
    const approved = await approveJob(queued.id, user.id);
    assert.equal(approved.status, "APPROVED");
    paperId = approved.paperId;
    const paper = await db.paper.findUnique({ where: { id: paperId! }, include: { questions: { orderBy: { order: "asc" } } } });
    assert.equal(paper?.status, "DRAFT");
    assert.equal(paper?.questions[1].parentId, paper?.questions[0].id);
    const published = await publishJob(queued.id, user.id);
    assert.equal(published.status, "PUBLISHED");
    assert.equal((await db.paper.findUnique({ where: { id: paperId! } }))?.status, "PUBLISHED");

    const broken = Buffer.from("%PDF-1.4\n/Font\n(marks) Tj broken");
    const needs = await enqueueDigitization({ userId: user.id, buffer: broken, fileName: "broken.pdf", mime: "application/pdf", subjectId: subject.id });
    ids.push(needs.id);
    const corrected = await advanceJob(needs.id, async () => ({ tokens: 3, model: "stub", raw: { questions: [{ type: "SHORT_ANSWER", prompt: "Name the longest river", correctAnswer: "Nile" }] } }));
    assert.equal(corrected.status, "NEEDS_CORRECTION");
    await assert.rejects(() => approveJob(needs.id, user.id), /Correct the paper/);

    const diagram = Buffer.from("%PDF-1.4\n/Font\n(heart) Tj diagram");
    const labels = await enqueueDigitization({ userId: user.id, buffer: diagram, fileName: "heart.pdf", mime: "application/pdf", subjectId: subject.id });
    ids.push(labels.id);
    await advanceJob(labels.id, async () => ({
      tokens: 4,
      model: "stub",
      raw: { questions: [{ type: "DIAGRAM_LABEL", prompt: "Label the parts of the heart", points: 2, labels: [{ id: "a", x: 0.2, y: 0.3, prompt: "Aorta" }] }] },
    }));
    await assert.rejects(() => approveJob(labels.id, user.id), /Correct the paper/);

    const waiting = Buffer.from("%PDF-1.4\n/Font\n(cancel) Tj");
    const toCancel = await enqueueDigitization({ userId: user.id, buffer: waiting, fileName: "cancel.pdf", mime: "application/pdf" });
    ids.push(toCancel.id);
    await db.digitizationJob.update({ where: { id: toCancel.id }, data: { cancelRequested: true } });
    let cancelledCalls = 0;
    const cancelled = await advanceJob(toCancel.id, async () => {
      cancelledCalls += 1;
      return { tokens: 1, model: "stub", raw: { questions: [] } };
    });
    assert.equal(cancelled.status, "CANCELLED");
    assert.equal(cancelledCalls, 0);
    await cancelJob(labels.id, user.id).catch(() => undefined);

    const flaky = Buffer.from("%PDF-1.4\n/Font\n(retry) Tj");
    const retry = await enqueueDigitization({ userId: user.id, buffer: flaky, fileName: "retry.pdf", mime: "application/pdf" });
    ids.push(retry.id);
    let failures = 0;
    const fail = async () => {
      failures += 1;
      throw new Error("provider unavailable");
    };
    const first = await advanceJob(retry.id, fail);
    assert.equal(first.status, "QUEUED");
    const second = await advanceJob(retry.id, fail);
    assert.equal(second.status, "FAILED");
    assert.equal(second.errorClass, "PROVIDER");
    const third = await advanceJob(retry.id, fail);
    assert.equal(third.status, "FAILED");
    assert.equal(failures, 2);
  } finally {
    if (paperId) await db.paper.delete({ where: { id: paperId } }).catch(() => undefined);
    for (const id of ids) await unlink(`data/digitization/${id}.bin`).catch(() => undefined);
    await db.user.delete({ where: { id: user.id } }).catch(() => undefined);
  }
});
