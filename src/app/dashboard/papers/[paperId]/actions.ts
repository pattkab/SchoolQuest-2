"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { gradeOpenAnswer, gradeDrawingAnswer } from "@/lib/gemini";
import { redirect } from "next/navigation";

interface SubmitExamPayload {
  paperId: string;
  answers: Record<string, string>; // questionId -> studentAnswer
}

export async function submitExam(payload: SubmitExamPayload) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Verify trial/subscription
  const user = await db.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const now = new Date();
  const hasActiveTrial = user.trialEndsAt && user.trialEndsAt > now;
  const hasActiveSubscription = user.subscriptionEndsAt && user.subscriptionEndsAt > now;

  if (!hasActiveTrial && !hasActiveSubscription) {
    redirect("/dashboard/subscribe");
  }

  const { paperId, answers } = payload;

  const questions = await db.question.findMany({
    where: { paperId }
  });

  let totalScore = 0;
  const answersToCreate: any[] = [];

  for (const question of questions) {
    const studentAns = (answers[question.id] || "").trim();
    let isCorrect = false;
    let pointsAwarded = 0;
    let explanation = "";

    // Parse the correct answer
    let parsedCorrectAnswer: any = null;
    try {
      parsedCorrectAnswer = JSON.parse(question.correctAnswer);
    } catch {
      parsedCorrectAnswer = question.correctAnswer;
    }

    if (question.type === "MULTIPLE_CHOICE") {
      isCorrect = studentAns.toLowerCase() === String(parsedCorrectAnswer).toLowerCase();
      pointsAwarded = isCorrect ? question.points : 0;
    } else if (question.type === "FILL_BLANK") {
      if (Array.isArray(parsedCorrectAnswer)) {
        isCorrect = parsedCorrectAnswer.some(
          (ans: string) => ans.trim().toLowerCase() === studentAns.toLowerCase()
        );
      } else {
        isCorrect = String(parsedCorrectAnswer).trim().toLowerCase() === studentAns.toLowerCase();
      }
      pointsAwarded = isCorrect ? question.points : 0;
    } else if (question.type === "SHORT_ANSWER" || question.type === "COMPREHENSION") {
      // AI Grading
      if (studentAns) {
        const result = await gradeOpenAnswer(
          question.prompt,
          studentAns,
          String(parsedCorrectAnswer),
          question.points
        );
        pointsAwarded = result.score;
        isCorrect = pointsAwarded > 0;
        explanation = result.explanation;
      } else {
        pointsAwarded = 0;
        isCorrect = false;
        explanation = "No answer provided.";
      }
    } else if (question.type === "DRAWING") {
      // Vision AI Grading
      if (studentAns && studentAns.startsWith("data:image")) {
        const result = await gradeDrawingAnswer(
          question.prompt,
          studentAns,
          question.points
        );
        pointsAwarded = result.score;
        isCorrect = pointsAwarded > 0;
        explanation = result.explanation;
      } else {
        pointsAwarded = 0;
        isCorrect = false;
        explanation = "No drawing submitted.";
      }
    }

    totalScore += pointsAwarded;

    answersToCreate.push({
      questionId: question.id,
      studentAnswer: studentAns,
      isCorrect,
      pointsAwarded,
      teacherNote: explanation
    });
  }

  // Create Attempt and Answers transactionally
  const attempt = await db.attempt.create({
    data: {
      userId,
      paperId,
      score: totalScore,
      completedAt: new Date(),
      answers: {
        create: answersToCreate.map(a => ({
          questionId: a.questionId,
          studentAnswer: JSON.stringify(a.studentAnswer),
          isCorrect: a.isCorrect,
          pointsAwarded: a.pointsAwarded,
          teacherNote: a.teacherNote
        }))
      }
    }
  });

  return {
    attemptId: attempt.id,
    score: totalScore,
    totalQuestions: questions.length,
    maxPoints: questions.reduce((sum, q) => sum + q.points, 0)
  };
}
