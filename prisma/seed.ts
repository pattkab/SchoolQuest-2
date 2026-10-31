import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { CLASSES, LEVELS, slugify } from "../src/content/curriculum";
import { SEED_CONTENT } from "../src/content/seed";

const prisma = new PrismaClient();

function encodeAnswer(value: unknown) {
  return JSON.stringify(value ?? "");
}

async function main() {
  const pin = bcrypt.hashSync("1234", 10);

  const levelRows = [];
  for (const level of LEVELS) {
    const row = await prisma.level.upsert({
      where: { slug: level.slug },
      update: { name: level.name, order: level.order, description: level.description },
      create: { slug: level.slug, name: level.name, order: level.order, description: level.description },
    });
    levelRows.push(row);
  }

  const classBySlug = new Map<string, { id: string }>();
  const subjectByKey = new Map<string, { id: string; classGradeId: string }>();
  const topicByKey = new Map<string, { id: string }>();

  for (const cls of CLASSES) {
    const level = levelRows.find((l) => l.slug === cls.level);
    if (!level) continue;
    const grade = await prisma.classGrade.upsert({
      where: { slug: cls.slug },
      update: {
        name: cls.name,
        shortName: cls.shortName,
        levelId: level.id,
        order: cls.order,
        phase: cls.phase,
        description: cls.description,
        color: cls.color,
        freshTeacherKey: cls.ftKey || null,
        isActive: cls.isActive,
      },
      create: {
        slug: cls.slug,
        name: cls.name,
        shortName: cls.shortName,
        levelId: level.id,
        order: cls.order,
        phase: cls.phase,
        description: cls.description,
        color: cls.color,
        freshTeacherKey: cls.ftKey || null,
        isActive: cls.isActive,
      },
    });
    classBySlug.set(cls.slug, grade);

    for (const [index, subject] of cls.subjects.entries()) {
      const row = await prisma.subject.upsert({
        where: { slug_classGradeId: { slug: subject.slug, classGradeId: grade.id } },
        update: {
          name: subject.name,
          color: subject.color,
          icon: subject.icon,
          order: index,
          description: subject.description,
          freshTeacherKey: subject.ftKeys?.join(",") || null,
          isExaminable: subject.isExaminable !== false,
        },
        create: {
          slug: subject.slug,
          name: subject.name,
          classGradeId: grade.id,
          color: subject.color,
          icon: subject.icon,
          order: index,
          description: subject.description,
          freshTeacherKey: subject.ftKeys?.join(",") || null,
          isExaminable: subject.isExaminable !== false,
        },
      });
      subjectByKey.set(`${cls.slug}:${subject.slug}`, row);

      for (const [tIndex, topic] of subject.topics.entries()) {
        const topicRow = await prisma.topic.upsert({
          where: { slug_subjectId: { slug: topic.slug, subjectId: row.id } },
          update: { name: topic.name, term: topic.term, order: tIndex, summary: topic.summary },
          create: {
            slug: topic.slug,
            name: topic.name,
            subjectId: row.id,
            term: topic.term,
            order: tIndex,
            summary: topic.summary,
          },
        });
        topicByKey.set(`${cls.slug}:${subject.slug}:${topic.slug}`, topicRow);
      }
    }
  }

  let notesCreated = 0;
  let quizzesCreated = 0;
  let questionsCreated = 0;

  for (const classContent of SEED_CONTENT) {
    for (const subjectContent of classContent.subjects) {
      const subject = subjectByKey.get(`${classContent.class}:${subjectContent.subject}`);
      if (!subject) continue;
      for (const topicContent of subjectContent.topics) {
        const topic = topicByKey.get(`${classContent.class}:${subjectContent.subject}:${topicContent.topic}`);
        for (const note of topicContent.notes || []) {
          const slug = note.slug || slugify(note.title);
          await prisma.note.upsert({
            where: { slug_subjectId: { slug, subjectId: subject.id } },
            update: {
              title: note.title,
              summary: note.summary,
              content: note.content,
              readingMinutes: note.minutes ?? 6,
              topicId: topic?.id,
              status: "PUBLISHED",
              sourceType: "LOCAL",
              attribution: "School Quest · NCDC-aligned notes",
            },
            create: {
              slug,
              title: note.title,
              subjectId: subject.id,
              topicId: topic?.id,
              summary: note.summary,
              content: note.content,
              readingMinutes: note.minutes ?? 6,
              status: "PUBLISHED",
              sourceType: "LOCAL",
              attribution: "School Quest · NCDC-aligned notes",
            },
          });
          notesCreated += 1;
        }

        if (topicContent.quiz?.questions?.length) {
          const externalId = `quiz:${classContent.class}:${subjectContent.subject}:${topicContent.topic}`;
          const title = topicContent.quiz.title || `${topic?.id ? "" : ""}${subjectContent.subject} practice`.replace(/^./, (c) => c.toUpperCase());
          const paper = await prisma.paper.upsert({
            where: { externalId },
            update: {
              title: topicContent.quiz.title || "Topic practice",
              description: topicContent.quiz.description,
              kind: "TOPIC_QUIZ",
              subjectId: subject.id,
              classGradeId: subject.classGradeId,
              topicId: topic?.id,
              status: "PUBLISHED",
              sourceType: "LOCAL",
              difficulty: "MEDIUM",
              durationMinutes: Math.max(8, topicContent.quiz.questions.length * 2),
            },
            create: {
              title: topicContent.quiz.title || "Topic practice",
              description: topicContent.quiz.description,
              kind: "TOPIC_QUIZ",
              subjectId: subject.id,
              classGradeId: subject.classGradeId,
              topicId: topic?.id,
              status: "PUBLISHED",
              sourceType: "LOCAL",
              externalId,
              difficulty: "MEDIUM",
              durationMinutes: Math.max(8, topicContent.quiz.questions.length * 2),
              attribution: "School Quest practice set",
            },
          });
          await prisma.question.deleteMany({ where: { paperId: paper.id } });
          for (const [index, question] of topicContent.quiz.questions.entries()) {
            const extraAccepted = Array.isArray(question.explanation) ? question.explanation : [];
            const explanationText = [
              typeof question.explanation === "string" ? question.explanation : "",
              typeof question.points === "string" ? question.points : "",
            ].filter(Boolean).join(" ");
            const accepted = [...(question.accepted || []), ...extraAccepted];
            const points = typeof question.points === "number" ? question.points : 1;
            await prisma.question.create({
              data: {
                paperId: paper.id,
                topicId: topic?.id,
                type: question.type,
                displayNumber: String(index + 1),
                stimulus: question.stimulus,
                prompt: question.prompt,
                options: question.options ? encodeAnswer(question.options) : null,
                correctAnswer: encodeAnswer(question.answer),
                acceptedAnswers: accepted.length ? encodeAnswer(accepted) : null,
                explanation: explanationText || null,
                markingGuide: question.markingGuide,
                numericTolerance: question.tolerance ?? null,
                requiresTeacher: Boolean(question.requiresTeacher),
                points,
                order: index + 1,
              },
            });
            questionsCreated += 1;
          }
          quizzesCreated += 1;
        }
      }
    }
  }

  const yearFromNow = new Date();
  yearFromNow.setFullYear(yearFromNow.getFullYear() + 1);

  const admin = await prisma.user.upsert({
    where: { phone: "0700000000" },
    update: { role: "SUPER_ADMIN", name: "School Quest Admin", passwordHash: pin, subscriptionEndsAt: yearFromNow },
    create: {
      phone: "0700000000",
      name: "School Quest Admin",
      role: "SUPER_ADMIN",
      passwordHash: pin,
      district: "Kampala",
      school: "School Quest HQ",
      trialStartsAt: new Date(),
      trialEndsAt: yearFromNow,
      subscriptionEndsAt: yearFromNow,
    },
  });

  const p7 = classBySlug.get("p7");
  const p4 = classBySlug.get("p4");
  const top = classBySlug.get("top");

  const teacher = await prisma.user.upsert({
    where: { phone: "0701111111" },
    update: { role: "TEACHER", name: "Nakato Grace", passwordHash: pin, subscriptionEndsAt: yearFromNow, classGradeId: p7?.id },
    create: {
      phone: "0701111111",
      name: "Nakato Grace",
      role: "TEACHER",
      passwordHash: pin,
      school: "St. Mary's Namagunga Demo",
      district: "Mukono",
      classGradeId: p7?.id,
      trialStartsAt: new Date(),
      trialEndsAt: yearFromNow,
      subscriptionEndsAt: yearFromNow,
    },
  });

  await prisma.teacherProfile.upsert({
    where: { userId: teacher.id },
    update: {
      fullName: "Nakato Grace",
      registrationNumber: "UTS/2018/44821",
      school: "St. Mary's Namagunga Demo",
      district: "Mukono",
      qualification: "Bachelor of Education (Primary)",
      yearsExperience: 9,
      subjects: encodeAnswer(["Mathematics", "Integrated Science"]),
      classes: encodeAnswer(["p6", "p7"]),
      bio: "Accredited primary teacher. Marks written work and PLE-style papers for School Quest classrooms.",
      status: "ACCREDITED",
      reviewedById: admin.id,
      reviewedAt: new Date(),
    },
    create: {
      userId: teacher.id,
      fullName: "Nakato Grace",
      registrationNumber: "UTS/2018/44821",
      nationalId: "CM8701234567",
      school: "St. Mary's Namagunga Demo",
      district: "Mukono",
      qualification: "Bachelor of Education (Primary)",
      yearsExperience: 9,
      subjects: encodeAnswer(["Mathematics", "Integrated Science"]),
      classes: encodeAnswer(["p6", "p7"]),
      bio: "Accredited primary teacher. Marks written work and PLE-style papers for School Quest classrooms.",
      status: "ACCREDITED",
      reviewedById: admin.id,
      reviewedAt: new Date(),
    },
  });

  const p7Student = await prisma.user.upsert({
    where: { phone: "0702222222" },
    update: { role: "STUDENT", name: "Okello Daniel", passwordHash: pin, classGradeId: p7?.id, subscriptionEndsAt: yearFromNow },
    create: {
      phone: "0702222222",
      name: "Okello Daniel",
      role: "STUDENT",
      passwordHash: pin,
      classGradeId: p7?.id,
      school: "Kampala Parents Demo",
      district: "Kampala",
      trialStartsAt: new Date(),
      trialEndsAt: yearFromNow,
      subscriptionEndsAt: yearFromNow,
      xp: 120,
      currentStreak: 3,
    },
  });

  await prisma.user.upsert({
    where: { phone: "0703333333" },
    update: { role: "STUDENT", name: "Achieng Sarah", passwordHash: pin, classGradeId: p4?.id, subscriptionEndsAt: yearFromNow },
    create: {
      phone: "0703333333",
      name: "Achieng Sarah",
      role: "STUDENT",
      passwordHash: pin,
      classGradeId: p4?.id,
      school: "Gayaza Junior Demo",
      district: "Wakiso",
      trialStartsAt: new Date(),
      trialEndsAt: yearFromNow,
      subscriptionEndsAt: yearFromNow,
    },
  });

  await prisma.user.upsert({
    where: { phone: "0704444444" },
    update: { role: "STUDENT", name: "Baby Class Demo", passwordHash: pin, classGradeId: top?.id, subscriptionEndsAt: yearFromNow },
    create: {
      phone: "0704444444",
      name: "Little Amina",
      role: "STUDENT",
      passwordHash: pin,
      classGradeId: top?.id,
      school: "Kampala Kindergarten Demo",
      district: "Kampala",
      trialStartsAt: new Date(),
      trialEndsAt: yearFromNow,
      subscriptionEndsAt: yearFromNow,
    },
  });

  if (p7) {
    const room = await prisma.classroom.upsert({
      where: { code: "SQ-P7-PLE" },
      update: { name: "P.7 PLE Champions", teacherId: teacher.id, classGradeId: p7.id, description: "Daily notes, topic quizzes and teacher marking for PLE candidates." },
      create: {
        name: "P.7 PLE Champions",
        code: "SQ-P7-PLE",
        teacherId: teacher.id,
        classGradeId: p7.id,
        description: "Daily notes, topic quizzes and teacher marking for PLE candidates.",
      },
    });
    await prisma.enrollment.upsert({
      where: { classroomId_userId: { classroomId: room.id, userId: p7Student.id } },
      update: {},
      create: { classroomId: room.id, userId: p7Student.id },
    });
  }

  if (p4) {
    await prisma.classroom.upsert({
      where: { code: "SQ-P4-SUN" },
      update: { name: "P.4 Sunshine Room", teacherId: teacher.id, classGradeId: p4.id },
      create: {
        name: "P.4 Sunshine Room",
        code: "SQ-P4-SUN",
        teacherId: teacher.id,
        classGradeId: p4.id,
        description: "Transition-year mathematics, English, science and SST.",
      },
    });
  }

  const schoolOwner = await prisma.user.upsert({
    where: { phone: "0705555555" },
    update: { role: "SCHOOL_ADMIN", name: "Kato Peter", passwordHash: pin, profileComplete: true, subscriptionEndsAt: yearFromNow },
    create: {
      phone: "0705555555",
      name: "Kato Peter",
      role: "SCHOOL_ADMIN",
      passwordHash: pin,
      profileComplete: true,
      school: "Kampala Parents Demo",
      district: "Kampala",
      trialStartsAt: new Date(),
      trialEndsAt: yearFromNow,
      subscriptionEndsAt: yearFromNow,
    },
  });
  const demoSchool = await prisma.school.upsert({
    where: { code: "SQ-DEMO" },
    update: { name: "Kampala Parents Demo", district: "Kampala", ownerId: schoolOwner.id },
    create: { name: "Kampala Parents Demo", code: "SQ-DEMO", district: "Kampala", ownerId: schoolOwner.id },
  });
  await prisma.user.update({ where: { id: schoolOwner.id }, data: { schoolId: demoSchool.id } });
  await prisma.user.update({
    where: { id: teacher.id },
    data: { schoolId: demoSchool.id, school: demoSchool.name, district: "Mukono" },
  });
  await prisma.user.update({
    where: { id: p7Student.id },
    data: { schoolId: demoSchool.id, school: demoSchool.name, studentNumber: "SQ-P7-0001", district: "Kampala" },
  });
  const billed = await prisma.feeCharge.findFirst({ where: { userId: p7Student.id, label: "Term 1 fees" } });
  if (!billed) {
    await prisma.feeCharge.create({ data: { schoolId: demoSchool.id, userId: p7Student.id, label: "Term 1 fees", amount: 450000 } });
  }
  const paid = await prisma.feePayment.findFirst({ where: { userId: p7Student.id, note: "Opening balance" } });
  if (!paid) {
    await prisma.feePayment.create({ data: { schoolId: demoSchool.id, userId: p7Student.id, amount: 200000, note: "Opening balance" } });
  }

  console.log(`Seeded ${levelRows.length} levels, ${classBySlug.size} classes, ${notesCreated} notes, ${quizzesCreated} quizzes, ${questionsCreated} questions.`);
  console.log("Demo logins (PIN 1234): admin 0700000000 · teacher 0701111111 · P7 0702222222 · P4 0703333333 · Top 0704444444 · school 0705555555");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
