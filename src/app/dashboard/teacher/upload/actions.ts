"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { extractQuestionsFromPDF, ExtractedQuestion } from "@/lib/gemini";
import { isAccreditedTeacher } from "@/lib/session";
import { uploadFileToFirebase } from "@/lib/firebase";
import { redirect } from "next/navigation";
import { topicIdForTitle } from "@/lib/topics";

export async function parseUploadedPDF(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { teacherProfile: true },
  });

  if (!user || !isAccreditedTeacher(user)) {
    throw new Error("Access denied: accredited teachers and admins only.");
  }

  const file = formData.get("pdf") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 1. Upload original PDF to Firebase Storage
  let pdfUrl = "";
  try {
    const storagePath = `papers/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    pdfUrl = await uploadFileToFirebase(buffer, storagePath, "application/pdf");
  } catch (err) {
    console.warn("Could not upload PDF to Firebase Storage, continuing with local parse...", err);
  }

  // 2. Perform OCR and extract questions
  const questions = await extractQuestionsFromPDF(buffer);
  
  return {
    questions,
    pdfUrl
  };
}

interface SavePaperPayload {
  title: string;
  year: number;
  subjectId: string;
  pdfUrl?: string;
  questions: Array<{
    type: string;
    prompt: string;
    options: string[] | null;
    correctAnswer: any;
    points: number;
  }>;
}

export async function saveParsedPaper(payload: SavePaperPayload) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { teacherProfile: true },
  });

  if (!user || !isAccreditedTeacher(user)) {
    throw new Error("Access denied: accredited teachers and admins only.");
  }

  const { title, year, subjectId, pdfUrl, questions } = payload;
  const subject = await db.subject.findUnique({ where: { id: subjectId } });
  const topicId = await topicIdForTitle(subjectId, title);

  const paper = await db.paper.create({
    data: {
      title,
      year: Number(year),
      subjectId,
      classGradeId: subject?.classGradeId,
      topicId,
      pdfUrl: pdfUrl || null,
      kind: "PAST_PAPER",
      sourceType: "UPLOAD",
      authorId: user.id,
      status: "PUBLISHED",
    }
  });

  // Create questions
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    await db.question.create({
      data: {
        paperId: paper.id,
        type: q.type,
        prompt: q.prompt,
        options: q.options ? JSON.stringify(q.options) : null,
        correctAnswer: JSON.stringify(q.correctAnswer),
        points: q.points,
        topicId,
        order: i + 1,
      }
    });
  }

  redirect(`/dashboard/papers/${paper.id}`);
}
