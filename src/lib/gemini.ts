import { GoogleGenAI } from "@google/genai";

// Initialize Gemini with Vertex AI
export const getGeminiClient = () => {
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  const location = process.env.GOOGLE_CLOUD_LOCATION === "global" ? "us-central1" : process.env.GOOGLE_CLOUD_LOCATION;
  
  return new GoogleGenAI({
    vertexai: true,
    project: project || "project-dfb75504-d961-4f08-8a8",
    location: location || "us-central1",
  });
};

export interface ExtractedQuestion {
  type: "MULTIPLE_CHOICE" | "FILL_BLANK" | "MATCHING" | "ORDERING" | "SHORT_ANSWER" | "COMPREHENSION" | "DRAWING";
  prompt: string;
  options: string[] | null;
  correctAnswer: any;
  points: number;
}

export async function extractQuestionsFromPDF(pdfBuffer: Buffer): Promise<ExtractedQuestion[]> {
  const ai = getGeminiClient();

  // Convert buffer to base64
  const pdfBase64 = pdfBuffer.toString("base64");

  const prompt = `
    You are an elite education-tech system specializing in the Ugandan curriculum (PLE, UCE, UACE).
    Analyze this exam paper PDF and extract all questions into a clean structured JSON array.
    
    Format the output as a valid JSON array, where each object matches this structure:
    {
      "type": "MULTIPLE_CHOICE" | "FILL_BLANK" | "MATCHING" | "ORDERING" | "SHORT_ANSWER" | "COMPREHENSION" | "DRAWING",
      "prompt": "The full, clear text of the question. Ensure any spelling mistakes from low-quality scans are corrected.",
      "options": ["Option A", "Option B", ...] or null,
      "correctAnswer": "The exact correct answer or list of acceptable correct answers. (For multiple choice, provide the exact correct text from options. For fill blanks, provide a string or an array of acceptable answers like ['3', 'three'])",
      "points": number (default 1 for multiple choice, 2 for fill blank/short answer)
    }

    Rules:
    1. Extract ALL questions sequentially.
    2. Maintain the integrity of the Ugandan curriculum topics.
    3. Correct any scanning/OCR errors directly in the text to make it readable.
    4. Provide only the JSON array back. Do not wrap in markdown \`\`\`json blocks.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: [
      {
        inlineData: {
          data: pdfBase64,
          mimeType: "application/pdf"
        }
      },
      prompt
    ],
  });

  const text = response.text || "";
  
  // Clean up any markdown code blocks
  const cleanedJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(cleanedJson) as ExtractedQuestion[];
  } catch (err) {
    console.error("Failed to parse extracted JSON from Gemini. Raw text:", text);
    throw new Error("Gemini returned invalid JSON structure.");
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
      model: "gemini-1.5-flash",
      contents: query,
    });

    const cleaned = (response.text || "").replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned) as GradingResult;
  } catch (err) {
    console.error("Failed to grade open answer with Gemini:", err);
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
      model: "gemini-1.5-flash",
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
  } catch (err) {
    console.error("Failed vision grading with Gemini:", err);
    return {
      score: 0,
      explanation: "Unable to run Vision grading on this drawing. Saved for Teacher review."
    };
  }
}
