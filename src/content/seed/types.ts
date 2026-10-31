export type QuestionType =
  | "MULTIPLE_CHOICE"
  | "FILL_BLANK"
  | "SHORT_ANSWER"
  | "NUMERIC"
  | "TRUE_FALSE"
  | "MATCHING"
  | "COMPREHENSION"
  | "LONG_ANSWER"
  | "DRAWING";

export type QuestionSeed = {
  type: QuestionType;
  prompt: string;
  options?: string[];
  answer: string | string[] | number | boolean | [string, string][];
  accepted?: string[];
  explanation?: string | string[];
  markingGuide?: string;
  points?: number;
  tolerance?: number;
  stimulus?: string;
  requiresTeacher?: boolean;
};

export type NoteSeed = {
  slug?: string;
  title: string;
  summary: string;
  minutes?: number;
  content: string;
};

export type TopicContent = {
  topic: string; // topic slug within the subject
  notes?: NoteSeed[];
  quiz?: { title?: string; description?: string; questions: QuestionSeed[] };
};

export type SubjectContent = { subject: string; topics: TopicContent[] };
export type ClassContent = { class: string; subjects: SubjectContent[] };

// ── Terse authoring helpers ──────────────────────────────────────────────────
export const mcq = (prompt: string, options: string[], answer: string, explanation?: string, points = 1): QuestionSeed => ({
  type: "MULTIPLE_CHOICE", prompt, options, answer, explanation, points,
});
export const fill = (prompt: string, answer: string | string[], explanation?: string, points = 1): QuestionSeed => ({
  type: "FILL_BLANK", prompt, answer: Array.isArray(answer) ? answer[0] : answer, accepted: Array.isArray(answer) ? answer.slice(1) : undefined, explanation, points,
});
export const num = (prompt: string, answer: number, explanation?: string, tolerance = 0, points = 2): QuestionSeed => ({
  type: "NUMERIC", prompt, answer, tolerance, explanation, points,
});
export const short = (prompt: string, answer: string | string[], explanation?: string, points = 2): QuestionSeed => ({
  type: "SHORT_ANSWER", prompt, answer: Array.isArray(answer) ? answer[0] : answer, accepted: Array.isArray(answer) ? answer.slice(1) : undefined, explanation, points,
});
export const tf = (prompt: string, answer: boolean, explanation?: string): QuestionSeed => ({
  type: "TRUE_FALSE", prompt, options: ["True", "False"], answer, explanation, points: 1,
});
export const long = (prompt: string, markingGuide: string, points = 4, stimulus?: string): QuestionSeed => ({
  type: "LONG_ANSWER", prompt, answer: markingGuide, markingGuide, points, stimulus,
});
export const comp = (stimulus: string, prompt: string, answer: string, accepted?: string[], points = 2): QuestionSeed => ({
  type: "COMPREHENSION", stimulus, prompt, answer, accepted, points, markingGuide: answer,
});
export const draw = (prompt: string, markingGuide: string, points = 2): QuestionSeed => ({
  type: "DRAWING", prompt, answer: markingGuide, markingGuide, points, requiresTeacher: false,
});
export const match = (prompt: string, pairs: [string, string][], explanation?: string): QuestionSeed => ({
  type: "MATCHING", prompt, answer: pairs, explanation, points: pairs.length,
});
