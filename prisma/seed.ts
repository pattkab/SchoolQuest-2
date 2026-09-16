export {};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Levels
  const levels = [
    { name: 'Nursery', order: 1 },
    { name: 'Primary', order: 2 },
    { name: 'Secondary O-Level', order: 3 },
    { name: 'Secondary A-Level', order: 4 },
    { name: 'University', order: 5 },
  ];

  const createdLevels = [];
  for (const l of levels) {
    const lvl = await prisma.level.upsert({
      where: { name: l.name },
      update: {},
      create: l,
    });
    createdLevels.push(lvl);
  }
  console.log('Seeded levels');

  // Find Primary level
  const primaryLvl = createdLevels.find(l => l.name === 'Primary');
  if (!primaryLvl) return;

  // 2. Subjects under Primary
  const mathSubject = await prisma.subject.upsert({
    where: { name_levelId: { name: 'Mathematics', levelId: primaryLvl.id } },
    update: {},
    create: {
      name: 'Mathematics',
      levelId: primaryLvl.id
    }
  });

  const englishSubject = await prisma.subject.upsert({
    where: { name_levelId: { name: 'English', levelId: primaryLvl.id } },
    update: {},
    create: {
      name: 'English',
      levelId: primaryLvl.id
    }
  });
  console.log('Seeded Primary subjects');

  // 3. Papers under Mathematics
  const paperMath2022 = await prisma.paper.create({
    data: {
      title: 'PLE Mathematics 2022',
      year: 2022,
      subjectId: mathSubject.id,
    }
  });

  const paperEng2022 = await prisma.paper.create({
    data: {
      title: 'PLE English 2022',
      year: 2022,
      subjectId: englishSubject.id,
    }
  });
  console.log('Seeded past papers');

  // 4. Questions for PLE Mathematics 2022
  const questionsMath = [
    {
      type: 'MULTIPLE_CHOICE',
      prompt: 'Work out: 24 + 13',
      options: JSON.stringify(['37', '38', '27', '47']),
      correctAnswer: JSON.stringify('37'),
      points: 1,
      order: 1
    },
    {
      type: 'MULTIPLE_CHOICE',
      prompt: 'What is the place value of 5 in the number 4,532?',
      options: JSON.stringify(['Ones', 'Tens', 'Hundreds', 'Thousands']),
      correctAnswer: JSON.stringify('Hundreds'),
      points: 1,
      order: 2
    },
    {
      type: 'FILL_BLANK',
      prompt: 'Complete the sentence: A triangle has _____ sides.',
      correctAnswer: JSON.stringify(['three', '3']),
      points: 2,
      order: 3
    },
    {
      type: 'FILL_BLANK',
      prompt: 'Work out the product of 4 and 5:',
      correctAnswer: JSON.stringify(['20', 'twenty']),
      points: 2,
      order: 4
    }
  ];

  for (const q of questionsMath) {
    await prisma.question.create({
      data: {
        paperId: paperMath2022.id,
        ...q
      }
    });
  }

  // 5. Questions for PLE English 2022
  const questionsEng = [
    {
      type: 'MULTIPLE_CHOICE',
      prompt: 'Choose the correct word to complete the sentence: She is _____ than her sister.',
      options: JSON.stringify(['tall', 'taller', 'tallest', 'more tall']),
      correctAnswer: JSON.stringify('taller'),
      points: 1,
      order: 1
    },
    {
      type: 'FILL_BLANK',
      prompt: 'Use the correct form of the word in bracket: The boys have ______ (go) to school.',
      correctAnswer: JSON.stringify('gone'),
      points: 2,
      order: 2
    }
  ];

  for (const q of questionsEng) {
    await prisma.question.create({
      data: {
        paperId: paperEng2022.id,
        ...q
      }
    });
  }

  console.log('Seeded questions');
}

main()
  .catch((e: any) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
