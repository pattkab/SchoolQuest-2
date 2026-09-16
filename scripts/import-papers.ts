import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function importPapers() {
  console.log("=== STARTING IMPORT OF UGANDAN PAST PAPERS ===");
  const papersDir = path.resolve(process.cwd(), "../schoolquest/processed_papers/papers");
  
  if (!fs.existsSync(papersDir)) {
    console.error(`❌ Directory not found: ${papersDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(papersDir).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} paper JSON files to import.`);

  for (const file of files) {
    const rawData = fs.readFileSync(path.join(papersDir, file), "utf-8");
    const data = JSON.parse(rawData);
    
    console.log(`\nImporting: ${data.title}`);
    
    // Determine level Name based on standard mapping or raw string
    let levelName = data.level || "Primary";
    if (levelName.includes("P") || levelName.includes("Primary")) levelName = "Primary";
    else if (levelName.includes("S") || levelName.includes("Secondary")) levelName = "Secondary O-Level";
    
    const level = await prisma.level.upsert({
      where: { name: levelName },
      update: {},
      create: { name: levelName, order: levelName === "Primary" ? 2 : 3 }
    });

    const subjectName = data.subject || "General";
    
    // Upsert Subject
    const subject = await prisma.subject.upsert({
      where: { name_levelId: { name: subjectName, levelId: level.id } },
      update: {},
      create: { name: subjectName, levelId: level.id }
    });

    const yearInt = parseInt(data.year) || new Date().getFullYear();

    // Create Paper
    const paper = await prisma.paper.create({
      data: {
        title: data.title || file.replace(".json", ""),
        year: yearInt,
        subjectId: subject.id,
      }
    });

    // Create Questions
    const questionsToCreate = [];
    let order = 1;
    for (const q of (data.questions || [])) {
      if (!q.questionText || q.questionText.trim() === "") continue;

      let type = "SHORT_ANSWER";
      if (q.questionType === "multiple_choice") type = "MULTIPLE_CHOICE";
      else if (q.questionType === "fill_blank") type = "FILL_BLANK";
      else if (q.questionText.toLowerCase().includes("draw")) type = "DRAWING";

      questionsToCreate.push({
        paperId: paper.id,
        type: type,
        prompt: `(${q.questionNumber || order}) ${q.questionText}`,
        options: q.options && q.options.length > 0 ? JSON.stringify(q.options) : null,
        correctAnswer: q.correctAnswer ? JSON.stringify(q.correctAnswer) : '""',
        points: q.marks ? parseInt(q.marks) || 1 : 1,
        order: order++
      });
    }

    if (questionsToCreate.length > 0) {
      for (const qData of questionsToCreate) {
        await prisma.question.create({ data: qData });
      }
      console.log(`✅ Imported paper: ${paper.title} with ${questionsToCreate.length} questions.`);
    } else {
      console.log(`⚠️ Skipped paper ${paper.title} (No valid questions).`);
    }
  }
  
  console.log("\n=== IMPORT COMPLETE ===");
}

importPapers()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
