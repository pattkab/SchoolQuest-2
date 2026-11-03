import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { db } from "../src/lib/db";
import { paperKindFor, type MarkingSchemeFile } from "../src/lib/marking-scheme";

async function main() {
  const directory = path.join(process.cwd(), "data", "fresh-teacher", "schemes");
  const names = (await readdir(directory).catch(() => [])).filter((name) => name.endsWith(".json"));
  let imported = 0;
  let skipped = 0;
  for (const name of names) {
    const scheme = JSON.parse(await readFile(path.join(directory, name), "utf8")) as MarkingSchemeFile;
    if (scheme.status !== "ready" || !scheme.classSlug || !scheme.subjectSlug || scheme.questions.length < 2) {
      skipped += 1;
      continue;
    }
    const subject = await db.subject.findFirst({
      where: { slug: scheme.subjectSlug, classGrade: { slug: scheme.classSlug } },
      select: { id: true, classGradeId: true },
    });
    if (!subject) {
      skipped += 1;
      continue;
    }
    const existing = await db.paper.findUnique({ where: { externalId: scheme.gitBlob }, select: { id: true } });
    if (existing) {
      skipped += 1;
      continue;
    }
    await db.paper.create({
      data: {
        title: scheme.title,
        kind: paperKindFor(scheme.collection),
        year: scheme.year,
        subjectId: subject.id,
        classGradeId: subject.classGradeId,
        externalId: scheme.gitBlob,
        sourceType: "FRESH_TEACHER",
        sourceUrl: scheme.sourceUrl,
        attribution: "Fresh Teacher’s Library",
        status: "PUBLISHED",
        questions: {
          create: scheme.questions.map((question, index) => ({
            type: question.type,
            displayNumber: question.number,
            prompt: question.prompt,
            options: question.options ? JSON.stringify(question.options) : null,
            correctAnswer: JSON.stringify(question.correctAnswer),
            acceptedAnswers: question.acceptedAnswers.length ? JSON.stringify(question.acceptedAnswers) : null,
            markingGuide: question.markingGuide,
            points: question.points,
            order: index + 1,
            requiresTeacher: question.type === "LONG_ANSWER",
          })),
        },
      },
    });
    imported += 1;
    console.log(`${scheme.classSlug} ${scheme.subjectSlug} ${scheme.title}`);
  }
  console.log(`imported ${imported}, skipped ${skipped}`);
  await db.$disconnect();
}

main().catch(async (error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  await db.$disconnect();
  process.exitCode = 1;
});
