import { collectionFor, type PaperCollection } from "@/lib/fresh-teacher-catalog";

export type SchemeQuestion = {
  number: string;
  type: "MULTIPLE_CHOICE" | "SHORT_ANSWER" | "LONG_ANSWER";
  prompt: string;
  options: string[] | null;
  correctAnswer: string;
  acceptedAnswers: string[];
  markingGuide: string | null;
  points: number;
};

export type MarkingSchemeFile = {
  version: 1;
  gitBlob: string;
  sourcePath: string;
  sourceUrl: string;
  classSlug: string | null;
  subjectSlug: string | null;
  collection: Extract<PaperCollection, "past-paper" | "holiday" | "exam">;
  title: string;
  year: number | null;
  durationMinutes: number | null;
  guideBlob: string | null;
  status: "draft" | "ready";
  questions: SchemeQuestion[];
};

const questionStart = /(?:^|\n)\s*(?:question\s*)?(\d{1,2})\s*[.)]\s+/gi;
const optionLine = /^([A-D])[.)]\s+(.+)$/i;

export function schemeMatchKey(filePath: string) {
  return filePath
    .toLowerCase()
    .replace(/\.pdf$/i, "")
    .replace(/marking guide|mark scheme|marking scheme|with answers|answer sheet|answers?/gi, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const coverMark = /candidate|index\s*(?:no|number)|school\s*name|district|signature|for official use|do not write|random\s*number|centre\s*(?:no|number)|center\s*(?:no|number)|name of (?:the )?candidate/i;

export function readDurationMinutes(text: string) {
  const head = text.slice(0, 3000);
  const hours = head.match(/time(?:\s+allowed)?\s*[:\-]?\s*(\d+)\s*(?:hours?|hrs?)(?:\s*(\d+)\s*(?:minutes?|mins?))?/i);
  if (hours) return Number(hours[1]) * 60 + (hours[2] ? Number(hours[2]) : 0);
  const minutes = head.match(/time(?:\s+allowed)?\s*[:\-]?\s*(\d+)\s*(?:minutes?|mins?)/i);
  return minutes ? Number(minutes[1]) : null;
}

/** Drop the identifier cover so question numbering starts at the paper itself. */
export function examQuestionText(text: string) {
  const durationMinutes = readDurationMinutes(text);
  const match = text.match(/\n\s*(section\s+[a-z0-9]+\b|question\s+1\b|1\s*[.)]\s+\S)/i);
  if (!match || match.index == null || match.index < 40) return { text, durationMinutes };
  if (!coverMark.test(text.slice(0, match.index))) return { text, durationMinutes };
  return { text: text.slice(match.index).replace(/^\s+/, ""), durationMinutes };
}

export function questionsFromPaperText(paperText: string, guideText: string | null): SchemeQuestion[] {
  const split = splitAnswers(examQuestionText(paperText).text);
  const body = split.body;
  const answerText = [guideText, split.answers].filter(Boolean).join("\n");
  const answers = answerMap(answerText);
  const chunks = questionChunks(body);
  return chunks.slice(0, 40).map((chunk) => {
    const options = chunk.options;
    const rawAnswer = answers.get(chunk.number) || "";
    const letter = rawAnswer.trim().match(/^([A-D])\b/i)?.[1]?.toUpperCase();
    const correct = options && letter ? options[letter.charCodeAt(0) - 65] || letter : rawAnswer;
    const type = options && options.length >= 2 ? "MULTIPLE_CHOICE" : correct.trim().length > 120 ? "LONG_ANSWER" : "SHORT_ANSWER";
    return {
      number: chunk.number,
      type,
      prompt: chunk.prompt,
      options: options && options.length >= 2 ? options : null,
      correctAnswer: correct.trim(),
      acceptedAnswers: letter && correct !== letter ? [letter] : [],
      markingGuide: rawAnswer && rawAnswer !== correct ? rawAnswer : null,
      points: 1,
    };
  });
}

export function schemeStatus(questions: SchemeQuestion[]): "draft" | "ready" {
  if (questions.length < 2) return "draft";
  const answered = questions.filter((question) => question.correctAnswer.trim().length > 0).length;
  return answered === questions.length ? "ready" : "draft";
}

export function paperKindFor(collection: MarkingSchemeFile["collection"]) {
  if (collection === "holiday") return "HOLIDAY_PACKAGE";
  if (collection === "past-paper") return "PAST_PAPER";
  return "MOCK";
}

export function isLibraryPaper(filePath: string) {
  const collection = collectionFor(filePath);
  return collection === "past-paper" || collection === "holiday" || collection === "exam" || collection === "guide";
}

function splitAnswers(text: string) {
  const match = text.search(/\n\s*(answers?|marking guide|mark scheme)\b/i);
  if (match < 0) return { body: text, answers: "" };
  return { body: text.slice(0, match), answers: text.slice(match) };
}

function questionChunks(text: string) {
  const matches = [...text.matchAll(questionStart)];
  return matches.flatMap((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index ?? text.length : text.length;
    const chunk = text.slice(start, end).trim();
    if (chunk.length < 8) return [];
    const lines = chunk.split(/\n/).map((line) => line.trim()).filter(Boolean);
    const options = lines.flatMap((line) => {
      const found = line.match(optionLine);
      return found ? [found[2].trim()] : [];
    });
    const prompt = lines.filter((line) => !optionLine.test(line)).join(" ").replace(/\s+/g, " ").trim();
    if (prompt.length < 8) return [];
    return [{ number: match[1], prompt: prompt.slice(0, 2000), options }];
  });
}

function answerMap(text: string) {
  const answers = new Map<string, string>();
  for (const line of text.split(/\n/)) {
    const match = line.trim().match(/^(\d{1,2})\s*[.)\-]\s+(.{1,240})$/);
    if (match) answers.set(match[1], match[2].trim());
  }
  return answers;
}
