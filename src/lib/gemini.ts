import { GoogleGenAI } from "@google/genai";
import { reportOps } from "@/lib/ops-log";

export const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) return new GoogleGenAI({ apiKey });
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  const location = process.env.GOOGLE_CLOUD_LOCATION === "global" ? "us-central1" : process.env.GOOGLE_CLOUD_LOCATION;
  if (!project) throw new Error("AI marking is not configured.");
  return new GoogleGenAI({
    vertexai: true,
    project,
    location: location || "us-central1",
  });
};

export interface ExtractedQuestion {
  type: "MULTIPLE_CHOICE" | "FILL_BLANK" | "MATCHING" | "ORDERING" | "SHORT_ANSWER" | "COMPREHENSION" | "DRAWING";
  prompt: string;
  options: string[] | null;
  correctAnswer: string | string[] | number;
  points: number;
}

export async function extractQuestionsFromPDF(pdfBuffer: Buffer): Promise<ExtractedQuestion[]> {
  return readDocument(pdfBuffer, "application/pdf", "practice");
}

export async function readDocument(buffer: Buffer, mime: string, output: "practice" | "notes") {
  const ai = getGeminiClient();
  const prompt = output === "practice"
    ? `You turn Ugandan exam papers into practice questions.
The file may be a scanned page, a searchable PDF, or a GitHub paper. Read it either way.
Return a JSON array only. Each item:
{"type":"MULTIPLE_CHOICE"|"FILL_BLANK"|"SHORT_ANSWER"|"NUMERIC"|"COMPREHENSION"|"LONG_ANSWER","prompt":"","options":["A","B"] or null,"correctAnswer":"","explanation":"","points":1}
Use MULTIPLE_CHOICE, FILL_BLANK, SHORT_ANSWER, or NUMERIC when the answer is exact.
Use COMPREHENSION or LONG_ANSWER when a teacher or AI must judge the writing.
Fix OCR mistakes. Keep the original question order.`
    : `You turn a Ugandan exam or notes file into revision notes.
The file may be a scan, a searchable PDF, or a GitHub paper.
Return JSON only: {"title":"","summary":"","markdown":""}
markdown uses short headings and bullets a learner can revise from. Do not invent questions.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ inlineData: { data: buffer.toString("base64"), mimeType: mime } }, prompt],
  });
  const cleaned = (response.text || "").replace(/```json/g, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error("The file was read, but the result was not usable. Try a clearer scan or PDF.");
  }
}

export interface GradingResult {
  score: number;
  explanation: string;
}

/**
 * AI-Assisted Grading for Open-Ended Answers (Comprehension & Short Answer)
 */
export async function gradeOpenAnswer(
  prompt: string,
  studentAnswer: string,
  correctAnswerRubric: string,
  maxPoints: number
): Promise<GradingResult> {
  const ai = getGeminiClient();

  const query = `
    You are an expert examiner for the Ugandan curriculum.
    Evaluate the student's answer against the question prompt and the correct answer rubric.
    Be encouraging but fair. Provide partial credit if they understand the concept but got details wrong.

    Question Prompt: "${prompt}"
    Student's Answer: "${studentAnswer}"
    Correct Answer/Rubric: "${correctAnswerRubric}"
    Maximum Points Available: ${maxPoints}

    Provide the result as a raw valid JSON object match this schema:
    {
      "score": number (0 to ${maxPoints}),
      "explanation": "A short, clear 1-2 sentence explanation to the student of why they received this score, highlighting any mistakes or what was good."
    }

    Do not wrap inside markdown code blocks. Give ONLY the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
    });

    const cleaned = (response.text || "").replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned) as GradingResult;
  } catch {
    reportOps("marking.ai_failed", { kind: "open" });
    return {
      score: 0,
      explanation: "AI was unable to evaluate this question dynamically. A teacher will review it."
    };
  }
}

/**
 * AI Vision Grading for Drawing Canvas submissions
 */
export async function gradeDrawingAnswer(
  prompt: string,
  canvasBase64: string,
  maxPoints: number
): Promise<GradingResult> {
  const ai = getGeminiClient();

  // Strip prefix (e.g. data:image/png;base64,) if present
  const base64Data = canvasBase64.replace(/^data:image\/\w+;base64,/, "");

  const query = `
    You are an expert art/diagram examiner for primary & secondary schools.
    Evaluate the student's drawing against the question prompt.
    Prompt: "${prompt}"
    Max points: ${maxPoints}

    Assess whether the drawing correctly depicts what was asked (e.g. if asked to draw a bucket, is there a bucket shape? If asked to draw a circle, is there a circular shape?).
    Be lenient with drawing quality since students use low-end touchscreens.
    
    Provide the result as a raw valid JSON object match this schema:
    {
      "score": number (0 to ${maxPoints}),
      "explanation": "A short 1-2 sentence feedback explaining why they got this grade."
    }

    Do not wrap inside markdown code blocks. Give ONLY the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: "image/png"
          }
        },
        query
      ],
    });

    const cleaned = (response.text || "").replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned) as GradingResult;
  } catch {
    reportOps("marking.ai_failed", { kind: "drawing" });
    return {
      score: 0,
      explanation: "Unable to run Vision grading on this drawing. Saved for Teacher review."
    };
  }
}
