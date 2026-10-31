/**
 * Deterministic marking engine.
 *
 * Ported from the original School Quest mobile app (markingEngine.ts) and
 * extended for the web platform. Handles every question type that can be
 * marked without a human or an LLM. Anything it cannot decide is returned with
 * `status: "PENDING"` so the caller can route it to AI grading or a teacher.
 */

export type GradingStatus = "UNANSWERED" | "AUTO" | "AI" | "PENDING_TEACHER" | "TEACHER_MARKED";

export interface MarkableQuestion {
  id: string;
  type: string;
  prompt: string;
  options: string | null;
  correctAnswer: string; // JSON
  acceptedAnswers: string | null; // JSON string[]
  markingGuide: string | null;
  explanation: string | null;
  numericTolerance: number | null;
  caseSensitive: boolean;
  requiresTeacher: boolean;
  points: number;
}

export interface MarkResult {
  status: "AUTO" | "PENDING" | "UNANSWERED";
  isCorrect: boolean | null;
  points: number;
  feedback: string;
}

export const DETERMINISTIC_TYPES = new Set(["MULTIPLE_CHOICE", "FILL_BLANK", "SHORT_ANSWER", "NUMERIC", "TRUE_FALSE", "MATCHING"]);
export const OPEN_TYPES = new Set(["COMPREHENSION", "LONG_ANSWER", "DRAWING"]);

export function parseJson<T = unknown>(raw: string | null | undefined, fallback: T): T {
  if (raw === null || raw === undefined || raw === "") return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return (raw as unknown) as T;
  }
}

export function parseOptions(raw: string | null): string[] {
  const v = parseJson<unknown>(raw, []);
  return Array.isArray(v) ? v.map(String) : [];
}

/** All strings that count as a correct answer for text-type questions. */
export function correctAnswerList(q: Pick<MarkableQuestion, "correctAnswer" | "acceptedAnswers">): string[] {
  const primary = parseJson<unknown>(q.correctAnswer, "");
  const accepted = parseJson<unknown>(q.acceptedAnswers, []);
  const out: string[] = [];
  const push = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(push);
    else if (v !== null && v !== undefined && String(v).trim() !== "") out.push(String(v));
  };
  push(primary);
  push(accepted);
  return out;
}

export function normalizeText(t: string, caseSensitive = false): string {
  let s = t.trim();
  if (!caseSensitive) s = s.toLowerCase();
  return s
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/^[("'\s]+|[.,!?;:)"'\s]+$/g, "")
    .trim();
}

// ─────────────────────────────────────────────────────────────────────────────

export function markAnswer(q: MarkableQuestion, rawAnswer: string | null | undefined): MarkResult {
  const answer = (rawAnswer ?? "").trim();
  const max = q.points;

  if (!answer) {
    return { status: "UNANSWERED", isCorrect: false, points: 0, feedback: "No answer given." };
  }

  if (q.requiresTeacher) {
    return pending(q);
  }

  switch (q.type) {
    case "MULTIPLE_CHOICE":
      return markMcq(q, answer, max);
    case "TRUE_FALSE":
      return markTrueFalse(q, answer, max);
    case "NUMERIC":
      return markNumeric(q, answer, max);
    case "MATCHING":
      return markMatching(q, answer, max);
    case "FILL_BLANK":
    case "SHORT_ANSWER":
      return markText(q, answer, max);
    case "COMPREHENSION":
      // Try exact/accepted match first (fast & free); otherwise AI / teacher.
      return markText(q, answer, max, true);
    default:
      return pending(q);
  }
}

function pending(q: MarkableQuestion): MarkResult {
  return { status: "PENDING", isCorrect: null, points: 0, feedback: q.type === "DRAWING" ? "Your drawing is awaiting marking." : "Your answer is awaiting marking." };
}

function hit(max: number, correct: string, explanation: string | null, note = ""): MarkResult {
  return { status: "AUTO", isCorrect: true, points: max, feedback: `Correct!${note} ${explanation ? explanation : `The answer is ${correct}.`}`.trim() };
}

function miss(max: number, correct: string, explanation: string | null): MarkResult {
  void max;
  return { status: "AUTO", isCorrect: false, points: 0, feedback: `Not quite. The correct answer is ${correct}.${explanation ? ` ${explanation}` : ""}` };
}

// ── MCQ ──────────────────────────────────────────────────────────────────────
function markMcq(q: MarkableQuestion, answer: string, max: number): MarkResult {
  const options = parseOptions(q.options);
  const correct = String(parseJson<unknown>(q.correctAnswer, ""));
  if (!correct) return pending(q);

  const letters = "ABCDEFGH";
  const norm = (s: string) => normalizeText(s);
  const resolve = (v: string): string => {
    // Accept a letter (A/B/C), an index, or the option text.
    const t = v.trim();
    if (/^[A-Ha-h]$/.test(t) && options.length) {
      const idx = letters.indexOf(t.toUpperCase());
      if (idx >= 0 && idx < options.length) return options[idx];
    }
    if (/^\d+$/.test(t) && options.length && Number(t) <= options.length && Number(t) >= 1 && !options.some((o) => norm(o) === norm(t))) {
      return options[Number(t) - 1];
    }
    const found = options.find((o) => norm(o) === norm(t));
    return found ?? t;
  };

  const isCorrect = norm(resolve(answer)) === norm(resolve(correct));
  return isCorrect ? hit(max, correct, q.explanation) : miss(max, correct, q.explanation);
}

// ── True / False ─────────────────────────────────────────────────────────────
function markTrueFalse(q: MarkableQuestion, answer: string, max: number): MarkResult {
  const raw = parseJson<unknown>(q.correctAnswer, "");
  const correctBool = typeof raw === "boolean" ? raw : /^(true|t|yes|y)$/i.test(String(raw));
  const given = /^(true|t|yes|y)$/i.test(answer) ? true : /^(false|f|no|n)$/i.test(answer) ? false : null;
  if (given === null) return { status: "AUTO", isCorrect: false, points: 0, feedback: "Please answer True or False." };
  const correctLabel = correctBool ? "True" : "False";
  return given === correctBool ? hit(max, correctLabel, q.explanation) : miss(max, correctLabel, q.explanation);
}

// ── Numeric ──────────────────────────────────────────────────────────────────
export function extractNumber(raw: string): number | null {
  const cleaned = raw.replace(/,/g, "").replace(/ugx|shs?\.?|sh|=|≈|km|cm|mm|m²|cm²|m|kg|g|l|ml|%|°|degrees?|hours?|hrs?|minutes?|mins?|days?|years?|yrs?|pupils?|litres?|liters?/gi, " ");
  // Fractions like 3/4 or mixed 1 1/2
  const mixed = cleaned.match(/(-?\d+)\s+(\d+)\s*\/\s*(\d+)/);
  if (mixed) {
    const whole = Number(mixed[1]);
    const frac = Number(mixed[2]) / Number(mixed[3]);
    return whole < 0 ? whole - frac : whole + frac;
  }
  const frac = cleaned.match(/(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
  if (frac && Number(frac[2]) !== 0) return Number(frac[1]) / Number(frac[2]);
  const m = cleaned.match(/-?\d+(?:\.\d+)?/);
  return m ? Number(m[0]) : null;
}

function markNumeric(q: MarkableQuestion, answer: string, max: number): MarkResult {
  const raw = parseJson<unknown>(q.correctAnswer, null);
  const correct = typeof raw === "number" ? raw : extractNumber(String(raw ?? ""));
  if (correct === null || Number.isNaN(correct)) return pending(q);
  const given = extractNumber(answer);
  if (given === null) return { status: "AUTO", isCorrect: false, points: 0, feedback: "Please enter a number." };
  const tol = q.numericTolerance ?? 0;
  const ok = Math.abs(given - correct) <= tol + 1e-9;
  const label = formatNumber(correct);
  return ok ? hit(max, label, q.explanation) : miss(max, label, q.explanation);
}

function formatNumber(n: number): string {
  return Number.isInteger(n) ? n.toLocaleString("en-UG") : String(Math.round(n * 1000) / 1000);
}

// ── Matching ─────────────────────────────────────────────────────────────────
function markMatching(q: MarkableQuestion, answer: string, max: number): MarkResult {
  const pairs = parseJson<unknown>(q.correctAnswer, []);
  if (!Array.isArray(pairs) || pairs.length === 0) return pending(q);
  const expected = new Map<string, string>();
  for (const p of pairs as unknown[]) {
    if (Array.isArray(p) && p.length >= 2) expected.set(normalizeText(String(p[0])), normalizeText(String(p[1])));
  }
  const given = parseJson<unknown>(answer, null);
  let correctCount = 0;
  if (given && typeof given === "object" && !Array.isArray(given)) {
    for (const [k, v] of Object.entries(given as Record<string, string>)) {
      if (expected.get(normalizeText(k)) === normalizeText(String(v))) correctCount++;
    }
  } else if (Array.isArray(given)) {
    for (const p of given) if (Array.isArray(p) && expected.get(normalizeText(String(p[0]))) === normalizeText(String(p[1]))) correctCount++;
  } else {
    return pending(q);
  }
  const per = max / expected.size;
  const pts = Math.round(correctCount * per * 10) / 10;
  const all = correctCount === expected.size;
  return {
    status: "AUTO",
    isCorrect: all,
    points: pts,
    feedback: all ? "Correct! All pairs matched." : `${correctCount} of ${expected.size} pairs matched.${q.explanation ? ` ${q.explanation}` : ""}`,
  };
}

// ── Text (fill in / short answer) ────────────────────────────────────────────
function markText(q: MarkableQuestion, answer: string, max: number, fallbackPending = false): MarkResult {
  const candidates = correctAnswerList(q);
  if (candidates.length === 0) return pending(q);

  const cs = q.caseSensitive;
  const normStudent = normalizeText(answer, cs);
  const normCandidates = candidates.map((c) => normalizeText(c, cs));
  const primary = candidates[0];

  // 1. Exact match
  if (normCandidates.includes(normStudent)) return hit(max, primary, q.explanation);

  // 2. Numeric equivalence (e.g. "3/4" vs "0.75", "2,000" vs "2000")
  const sNum = extractNumber(normStudent);
  if (sNum !== null && /\d/.test(normStudent) && !/[a-z]{3,}/i.test(normStudent)) {
    for (const c of normCandidates) {
      const cNum = extractNumber(c);
      if (cNum !== null && !/[a-z]{3,}/i.test(c) && Math.abs(cNum - sNum) < 1e-9) return hit(max, primary, q.explanation);
    }
  }

  // 3. Unordered set / list equivalence  {2,4,6} == {6,4,2}
  if (normCandidates.some((c) => unorderedSetEquivalent(normStudent, c))) return hit(max, primary, q.explanation);

  // 4. Article / punctuation-insensitive containment for short phrases
  const strip = (s: string) => s.replace(/\b(the|a|an|is|are|was|were|it|to|of)\b/g, " ").replace(/[^a-z0-9 ]/gi, " ").replace(/\s+/g, " ").trim();
  const ss = strip(normStudent);
  for (const c of normCandidates) {
    const cc = strip(c);
    if (!cc) continue;
    if (ss === cc) return hit(max, primary, q.explanation);
    // Student wrote a full sentence containing the expected short answer.
    if (cc.length >= 3 && cc.split(" ").length <= 4 && ss.split(" ").length <= 14 && wordBoundaryIncludes(ss, cc)) {
      return hit(max, primary, q.explanation);
    }
  }

  // 5. Spelling tolerance (Levenshtein)
  for (const c of normCandidates) {
    if (spellingClose(normStudent, c)) return hit(max, primary, q.explanation, " (minor spelling)");
  }

  // 6. Marking-guide keywords → partial credit (only when a guide exists)
  if (q.markingGuide && q.type !== "FILL_BLANK") {
    const kw = keywordScore(answer, q.markingGuide);
    if (kw.total > 0 && kw.hits > 0) {
      const pts = Math.round((kw.hits / kw.total) * max * 2) / 2;
      if (pts > 0) {
        return { status: "AUTO", isCorrect: pts >= max, points: Math.min(pts, max), feedback: pts >= max ? "Correct!" : `Partly correct — you mentioned: ${kw.found.join(", ")}. Expected: ${primary}.` };
      }
    }
  }

  if (fallbackPending) return pending(q);
  return miss(max, primary, q.explanation);
}

function wordBoundaryIncludes(hay: string, needle: string): boolean {
  const re = new RegExp(`(^|\\s)${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`);
  return re.test(hay);
}

// ── Helpers ──────────────────────────────────────────────────────────────────
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const dp: number[] = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? dp[j - 1] : 1 + Math.min(dp[j], dp[j - 1], prev);
      prev = temp;
    }
  }
  return dp[b.length];
}

export function spellingClose(a: string, b: string): boolean {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen < 4) return false;
  // Never fuzzy-match pure numbers or very different lengths
  if (/^\d+$/.test(a) || /^\d+$/.test(b)) return false;
  const allowed = Math.max(1, Math.floor(maxLen / 5));
  return levenshtein(a, b) <= allowed;
}

export function unorderedSetEquivalent(a: string, b: string): boolean {
  const parse = (value: string): string[] | null => {
    const hasSetSyntax = /[{},]/.test(value);
    const stripped = value.replace(/[{}[\]]/g, " ").trim();
    const looksLikeNumberList = /^-?\d+(?:\s+-?\d+){1,}$/.test(stripped);
    if (!hasSetSyntax && !looksLikeNumberList) return null;
    const values = stripped.split(/[\s,]+/).filter(Boolean);
    if (values.length < 2 || values.some((item) => !/^-?[a-z0-9./]+$/i.test(item))) return null;
    return Array.from(new Set(values)).sort();
  };
  const left = parse(a);
  const right = parse(b);
  return Boolean(left && right && left.length === right.length && left.every((v, i) => v === right[i]));
}

/** Score an answer against a marking guide: keywords separated by / , ; or newlines. */
export function keywordScore(answer: string, guide: string): { hits: number; total: number; found: string[] } {
  const text = normalizeText(answer);
  const keywords = guide
    .split(/\n|;|\/|,|·|•/)
    .map((k) => normalizeText(k.replace(/\(\d+\)|\d+\s*marks?/gi, "")))
    .filter((k) => k.length >= 3 && k.split(" ").length <= 6 && !/^(any|award|marks?|each|with|explanation|one|two|three|four)\b/.test(k));
  const found = keywords.filter((k) => text.includes(k));
  return { hits: found.length, total: keywords.length, found };
}

/** Human readable label for question types. */
export function questionTypeLabel(type: string): string {
  switch (type) {
    case "MULTIPLE_CHOICE": return "Multiple choice";
    case "FILL_BLANK": return "Fill in the blank";
    case "SHORT_ANSWER": return "Short answer";
    case "NUMERIC": return "Work out";
    case "TRUE_FALSE": return "True or false";
    case "MATCHING": return "Matching";
    case "COMPREHENSION": return "Comprehension";
    case "LONG_ANSWER": return "Written answer";
    case "DRAWING": return "Drawing";
    default: return "Question";
  }
}
