import { createHash } from "node:crypto";
import { pdfHasText } from "@/lib/ingest";

export const DAILY_JOB_CAP = 20;
export const DAILY_TOKEN_CAP = 20_000;
export const MAX_ATTEMPTS = 2;
export const BLOCKING = new Set(["missing-prompt", "missing-marks", "duplicate", "unsupported-answer", "unconfirmed-diagram", "invalid-type"]);

const QUESTION_TYPES = new Set([
  "MULTIPLE_CHOICE", "MULTI_SELECT", "FILL_BLANK", "SHORT_ANSWER", "NUMERIC", "CALCULATION",
  "TRUE_FALSE", "MATCHING", "ORDERING", "DIAGRAM_LABEL", "COMPREHENSION", "LONG_ANSWER", "DRAWING",
]);

export type DraftLabel = { id: string; x: number; y: number; prompt: string; accept: string; confirmed: boolean };
export type DraftQuestion = {
  type: string;
  prompt: string;
  options: string[] | null;
  correctAnswer: string;
  points: number | null;
  explanation: string | null;
  page: number | null;
  number: string | null;
  parentNumber: string | null;
  imagePage: number | null;
  labels: DraftLabel[];
  issues: string[];
};
export type DraftPaper = { title: string; year: number | null; questions: DraftQuestion[]; issues: string[]; confidence: number };

export function sourceFingerprint(buffer: Buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

export function classifySource(buffer: Buffer, mime: string) {
  if (mime.startsWith("image/")) return "SCAN";
  if (buffer.subarray(0, 5).toString() !== "%PDF-") return "SCAN";
  return pdfHasText(buffer) ? "PDF" : "SCAN";
}

export function chooseModel(kind: string) {
  if (kind === "SCAN") return process.env.DIGITIZATION_SCAN_MODEL || "gemini-2.5-flash";
  return process.env.DIGITIZATION_TEXT_MODEL || "gemini-2.5-flash";
}

export function validateUpload(buffer: Buffer, mime: string) {
  if (buffer.length === 0) return "The file is empty.";
  if (buffer.length > 15_000_000) return "File is over 15 MB.";
  const allowed = mime === "application/pdf" || mime.startsWith("image/");
  if (!allowed && buffer.subarray(0, 5).toString() !== "%PDF-") return "Upload a PDF or a scan.";
  return null;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeDraft(raw: unknown, fallbackTitle: string): DraftPaper {
  const source = raw && typeof raw === "object" ? raw as { title?: unknown; year?: unknown; questions?: unknown } : {};
  const rows = Array.isArray(source.questions) ? source.questions : Array.isArray(raw) ? raw : [];
  const seen = new Set<string>();
  const questions: DraftQuestion[] = rows.map((row) => {
    const item = row && typeof row === "object" ? row as Record<string, unknown> : {};
    const type = QUESTION_TYPES.has(String(item.type)) ? String(item.type) : "INVALID";
    const prompt = text(item.prompt);
    const points = typeof item.points === "number" && item.points > 0 ? item.points : null;
    const options = Array.isArray(item.options) ? item.options.map(String) : null;
    const correct = item.correctAnswer === undefined || item.correctAnswer === null ? "" : String(item.correctAnswer);
    const labels = Array.isArray(item.labels) ? item.labels.flatMap((label) => {
      if (!label || typeof label !== "object") return [];
      const entry = label as Record<string, unknown>;
      const x = Number(entry.x);
      const y = Number(entry.y);
      if (!entry.id || Number.isNaN(x) || Number.isNaN(y)) return [];
      return [{ id: String(entry.id), x, y, prompt: text(entry.prompt) || String(entry.id), accept: text(entry.accept), confirmed: false }];
    }) : [];
    const issues: string[] = [];
    if (!prompt || prompt.length < 8) issues.push("missing-prompt");
    if (type === "INVALID") issues.push("invalid-type");
    if (points === null) issues.push("missing-marks");
    const key = prompt.toLowerCase();
    if (key && seen.has(key)) issues.push("duplicate");
    if (key) seen.add(key);
    const open = type === "LONG_ANSWER" || type === "COMPREHENSION" || type === "DRAWING";
    if (!open && type !== "DIAGRAM_LABEL" && type !== "INVALID" && !correct) issues.push("unsupported-answer");
    if (type === "DIAGRAM_LABEL") issues.push("unconfirmed-diagram");
    return {
      type,
      prompt,
      options,
      correctAnswer: correct,
      points,
      explanation: text(item.explanation) || text(item.markingGuide) || null,
      page: typeof item.page === "number" ? item.page : null,
      number: text(item.number) || null,
      parentNumber: text(item.parentNumber) || null,
      imagePage: typeof item.imagePage === "number" ? item.imagePage : null,
      labels,
      issues,
    };
  });
  const blocking = questions.reduce((sum, question) => sum + question.issues.filter((issue) => BLOCKING.has(issue)).length, 0);
  const confidence = questions.length ? Math.max(0, 1 - blocking / questions.length) : 0;
  return {
    title: text(source.title) || fallbackTitle,
    year: typeof source.year === "number" ? source.year : null,
    questions,
    issues: questions.length ? [] : ["no-questions"],
    confidence,
  };
}

export function blockingIssues(draft: DraftPaper) {
  const issues = [...draft.issues];
  for (const question of draft.questions) {
    for (const issue of question.issues) if (BLOCKING.has(issue)) issues.push(issue);
  }
  return issues;
}

export function recheckQuestion(draft: DraftPaper, index: number) {
  const question = draft.questions[index];
  if (!question) return draft;
  const issues: string[] = question.issues.filter((issue) => issue === "invalid-type" || issue === "unconfirmed-diagram");
  if (!question.prompt || question.prompt.length < 8) issues.push("missing-prompt");
  if (question.points === null || question.points <= 0) issues.push("missing-marks");
  const key = question.prompt.toLowerCase();
  if (key && draft.questions.some((other, otherIndex) => otherIndex !== index && other.prompt.toLowerCase() === key)) issues.push("duplicate");
  const open = question.type === "LONG_ANSWER" || question.type === "COMPREHENSION" || question.type === "DRAWING";
  if (!open && question.type !== "DIAGRAM_LABEL" && question.type !== "INVALID" && !question.correctAnswer) issues.push("unsupported-answer");
  if (question.type === "DIAGRAM_LABEL") {
    const ready = question.labels.length > 0 && question.labels.every((label) => label.confirmed && label.accept);
    const without = issues.filter((issue) => issue !== "unconfirmed-diagram");
    question.issues = ready ? without : [...without, "unconfirmed-diagram"];
    return draft;
  }
  question.issues = issues;
  return draft;
}

export function confirmLabels(draft: DraftPaper, index: number, accepted: Record<string, string>) {
  const question = draft.questions[index];
  if (!question) return draft;
  question.labels = question.labels.map((label) => ({ ...label, accept: (accepted[label.id] || label.accept).trim(), confirmed: Boolean((accepted[label.id] || label.accept).trim()) }));
  const ready = question.labels.length > 0 && question.labels.every((label) => label.confirmed);
  question.issues = question.issues.filter((issue) => issue !== "unconfirmed-diagram");
  if (!ready) question.issues.push("unconfirmed-diagram");
  return draft;
}
