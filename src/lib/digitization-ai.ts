import { readDocument } from "@/lib/gemini";
import type { Extractor } from "@/lib/digitization-jobs";

export const extractWithGemini: Extractor = async ({ buffer, mime, model }) => {
  const raw = await readDocument(buffer, mime, "practice");
  const questions = Array.isArray(raw) ? raw : raw?.questions;
  if (!Array.isArray(questions)) throw new Error("The paper could not be read into questions.");
  return { raw: { questions }, tokens: Math.ceil(buffer.length / 4), model };
};
