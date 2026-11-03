import { publicDiagramTargets } from "@/lib/exam-session";

export type SourceQuestion = {
  id: string;
  type: string;
  prompt: string;
  stimulus?: string | null;
  imageUrl?: string | null;
  displayNumber?: string | null;
  unit?: string | null;
  options: string | null;
  correctAnswer: string;
  points: number;
};

export type PublicQuestion = {
  id: string;
  type: string;
  prompt: string;
  stimulus: string | null;
  imageUrl: string | null;
  displayNumber: string | null;
  unit: string | null;
  options: string | null;
  labelTargets: { id: string; x: number; y: number; prompt: string }[];
  points: number;
};

function publicMatchOptions(correctAnswer: string, options: string | null) {
  try {
    const pairs = JSON.parse(correctAnswer) as unknown[];
    if (Array.isArray(pairs) && pairs.length && Array.isArray(pairs[0])) {
      const rights = Array.from(new Set(pairs.map((pair) => String((pair as unknown[])[1])))).sort();
      return JSON.stringify(pairs.map((pair) => [String((pair as unknown[])[0]), rights]));
    }
  } catch {
    return options;
  }
  return options;
}

/** Learner-facing question. Marking keys never leave the server. */
export function toPublicQuestion(question: SourceQuestion): PublicQuestion {
  return {
    id: question.id,
    type: question.type,
    prompt: question.prompt,
    stimulus: question.stimulus ?? null,
    imageUrl: question.imageUrl ?? null,
    displayNumber: question.displayNumber ?? null,
    unit: question.unit ?? null,
    options: question.type === "MATCHING" ? publicMatchOptions(question.correctAnswer, question.options) : question.options,
    labelTargets: question.type === "DIAGRAM_LABEL" ? publicDiagramTargets(question.correctAnswer) : [],
    points: question.points,
  };
}
