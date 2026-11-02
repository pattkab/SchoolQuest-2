"use server";

import { after } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import type { ExtractedQuestion } from "@/lib/gemini";
import { isAccreditedTeacher } from "@/lib/session";
import { redirect } from "next/navigation";
import { topicIdForTitle } from "@/lib/topics";
import { advanceJob, enqueueDigitization } from "@/lib/digitization-jobs";

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

  const buffer = Buffer.from(await file.arrayBuffer());
  const year = Number(formData.get("year"));
  const job = await enqueueDigitization({
    userId: user.id,
    buffer,
    fileName: file.name || "paper.pdf",
    mime: file.type || "application/pdf",
    subjectId: String(formData.get("subjectId") || "") || null,
    title: String(formData.get("title") || file.name || "Paper"),
    year: Number.isFinite(year) && year > 0 ? year : null,
  });
  after(() => {
    void import("@/lib/digitization-ai")
      .then((mod) => advanceJob(job.id, mod.extractWithGemini))
      .catch(() => undefined);
  });
  return { jobId: job.id };
}

interface SavePaperPayload {
  title: string;
  year: number;
  subjectId: string;
  pdfUrl?: string;
  questions: ExtractedQuestion[];
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
      status: "DRAFT",
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
