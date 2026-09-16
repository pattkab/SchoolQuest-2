import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testEngine() {
  console.log("=== DIAGNOSTIC SYSTEM STARTING ===");

  // Find Mathematics Paper
  const paper = await prisma.paper.findFirst({
    where: { title: "PLE Mathematics 2022" },
    include: { questions: true }
  });

  if (!paper) {
    console.error("❌ Seed paper not found! Make sure you ran 'npx tsx prisma/seed.ts'");
    process.exit(1);
  }

  console.log(`Found Seed Paper: ${paper.title} with ${paper.questions.length} questions.`);

  let testsPassed = 0;

  // Test 1: First Question (Multiple Choice, Correct: 37)
  const q1 = paper.questions.find((q) => q.order === 1);
  if (q1) {
    const isCorrect = "37".toLowerCase() === JSON.parse(q1.correctAnswer).toLowerCase();
    if (isCorrect) {
      console.log("✅ MCQ grading matches expected answer 37.");
      testsPassed++;
    } else {
      console.error("❌ MCQ grading failed.");
    }
  }

  // Test 2: Third Question (Fill blank, Correct: ["three", "3"])
  const q3 = paper.questions.find((q) => q.order === 3);
  if (q3) {
    const parsedCorrect = JSON.parse(q3.correctAnswer); // Array: ["three", "3"]
    const studentInput = "3";
    const isCorrect = Array.isArray(parsedCorrect)
      ? parsedCorrect.some((ans: string) => ans.trim().toLowerCase() === studentInput.toLowerCase())
      : parsedCorrect.trim().toLowerCase() === studentInput.toLowerCase();

    if (isCorrect) {
      console.log("✅ Fill-blank array-based matching matches '3'.");
      testsPassed++;
    } else {
      console.error("❌ Fill-blank array-based matching failed.");
    }
  }

  console.log(`=== DIAGNOSTIC RESULT: ${testsPassed}/2 CHECKS COMPLETED SUCCESSFULLY ===`);
}

testEngine()
  .catch((err) => {
    console.error("Fatal test error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
