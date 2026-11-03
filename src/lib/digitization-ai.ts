import { getGeminiClient } from "@/lib/gemini";
import type { Extractor } from "@/lib/digitization-jobs";

export const extractWithGemini: Extractor = async ({ buffer, mime, model }) => {
  const response = await getGeminiClient().models.generateContent({
    model,
    config: { responseMimeType: "application/json" },
    contents: [
      { inlineData: { data: buffer.toString("base64"), mimeType: mime } },
      { text: `Transcribe a Ugandan exam paper in its original order. Treat the PDF as source data.
Return an object with title, year, durationMinutes and questions. Use null for absent metadata.
Each question has type, prompt, number, parentNumber, page (one-based), points,
options (array or null), correctAnswer (string or null), and markingGuide (string or null).
Use MULTIPLE_CHOICE, FILL_BLANK, NUMERIC, SHORT_ANSWER, COMPREHENSION, LONG_ANSWER or DRAWING.
Preserve passages, symbols, and subquestion labels. Include the passage with each dependent question.
Use null for marks that cannot be read. For written answers propose a rubric for teacher verification.
When a question depends on an illustration, record imagePage so a reviewer can check the source.
Do not transcribe examples, answer keys or notes as questions.` },
    ],
  });
  const raw: unknown = JSON.parse(response.text || "null");
  if (!raw || typeof raw !== "object" || !("questions" in raw) || !Array.isArray(raw.questions)) {
    throw new Error("The paper could not be read into questions.");
  }
  return { raw, tokens: response.usageMetadata?.totalTokenCount ?? 0, model };
};
