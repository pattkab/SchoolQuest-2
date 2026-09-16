import { PrismaClient } from "@prisma/client";
import { GoogleGenAI } from "@google/genai";

const prisma = new PrismaClient();

const getGeminiClient = () => {
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  const location = process.env.GOOGLE_CLOUD_LOCATION === "global" ? "us-central1" : process.env.GOOGLE_CLOUD_LOCATION;
  
  return new GoogleGenAI({
    vertexai: true,
    project: project || "project-dfb75504-d961-4f08-8a8",
    location: location || "us-central1",
  });
};

async function solvePapers() {
  console.log("=== STARTING AI SOLVER ENGINE FOR PAST PAPERS ===");
  const ai = getGeminiClient();

  // Find papers that have questions with empty/null/"" correct answers
  const papers = await prisma.paper.findMany({
    include: {
      questions: {
        orderBy: { order: "asc" }
      }
    }
  });

  console.log(`Found ${papers.length} total papers to audit.`);

  for (const paper of papers) {
    const emptyQuestions = paper.questions.filter(
      (q) => q.correctAnswer === '""' || q.correctAnswer === "" || q.correctAnswer === null
    );

    if (emptyQuestions.length === 0) {
      console.log(`✅ Paper "${paper.title}" already has all answers pre-wired.`);
      continue;
    }

    console.log(`\nSolving paper: "${paper.title}" (${emptyQuestions.length} unsolved questions)...`);

    // Group questions into batches of 30 to stay within token/rate limits
    const batchSize = 30;
    for (let i = 0; i < emptyQuestions.length; i += batchSize) {
      const batch = emptyQuestions.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(emptyQuestions.length / batchSize)}...`);

      const questionsList = batch.map((q) => ({
        id: q.id,
        prompt: q.prompt,
        type: q.type,
        options: q.options ? JSON.parse(q.options) : null
      }));

      const systemPrompt = `
        You are an elite academic examiner for the Uganda National Examinations Board (UNEB).
        Solve the following questions for the exam paper "${paper.title}".
        For multiple-choice, return the exact text of the correct option.
        For fill-in-the-blank or short answers, return a highly accurate, brief answer.
        
        Provide the output as a single valid JSON object mapping each questionId to its correct answer:
        {
          "questionId": "correct_answer_string"
        }

        Do not wrap in markdown \`\`\`json blocks. Give ONLY the raw JSON object.
      `;

      try {
        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: [
            JSON.stringify(questionsList),
            systemPrompt
          ],
        });

        const cleaned = (response.text || "").replace(/```json/g, "").replace(/```/g, "").trim();
        const answersMap = JSON.parse(cleaned) as Record<string, string>;

        for (const [qId, ans] of Object.entries(answersMap)) {
          await prisma.question.update({
            where: { id: qId },
            data: {
              correctAnswer: JSON.stringify(ans)
            }
          });
        }
        console.log(`Successfully solved and updated ${Object.keys(answersMap).length} questions.`);
      } catch (err) {
        console.error(`❌ Failed to solve batch for paper "${paper.title}":`, err);
      }
    }
  }

  console.log("\n=== AI SOLVER ENGINE SYSTEM COMPLETE ===");
}

solvePapers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
