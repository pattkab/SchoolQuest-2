"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { readDocument, type ExtractedQuestion } from "@/lib/gemini";
import { loadSource, type SourceKind } from "@/lib/ingest";
import { requireUser, isAdmin } from "@/lib/session";
import { topicIdForTitle } from "@/lib/topics";

export type BuiltQuestion = ExtractedQuestion & { explanation?: string };

async function adminUser() {
  const user = await requireUser();
  if (!isAdmin(user.role)) throw new Error("Site admin only.");
  return user;
}

function slugify(value: string) {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48);
  return `${slug || "item"}-${Date.now().toString(36)}`;
}

export async function buildContentAction(formData: FormData) {
  await adminUser();
  const output = String(formData.get("output") || "practice") === "notes" ? "notes" : "practice";
  const file = formData.get("file");
  const link = String(formData.get("link") || "");
  const source = await loadSource(file instanceof File ? file : null, link);
  const built = await readDocument(source.buffer, source.mime, output);
  if (output === "practice" && !Array.isArray(built)) throw new Error("No questions were found in that file.");
  if (output === "notes" && !built?.markdown) throw new Error("No notes were found in that file.");
  return {
    output,
    kind: source.kind as SourceKind,
    sourceUrl: source.sourceUrl,
    label: source.label,
    questions: output === "practice" ? (built as BuiltQuestion[]) : [],
    note: output === "notes" ? (built as { title?: string; summary?: string; markdown?: string }) : null,
  };
}

export async function saveBuiltContentAction(payload: {
  output: "practice" | "notes";
  title: string;
  subjectId: string;
  kind: SourceKind;
  sourceUrl: string | null;
  mark: "AI" | "TEACHER";
  questions: BuiltQuestion[];
  markdown: string;
  summary: string;
}) {
  const user = await adminUser();
  const subject = await db.subject.findUnique({ where: { id: payload.subjectId } });
  if (!subject) throw new Error("Choose a subject.");
  const title = payload.title.trim();
  if (!title) throw new Error("Add a title.");
  const topicId = await topicIdForTitle(subject.id, title);

  if (payload.output === "notes") {
    const note = await db.note.create({
      data: {
        slug: slugify(title),
        title,
        subjectId: subject.id,
        topicId,
        summary: payload.summary || null,
        content: payload.markdown,
        sourceType: payload.kind,
        sourceUrl: payload.sourceUrl,
        attribution: payload.sourceUrl,
        authorId: user.id,
        status: "NEEDS_REVIEW",
      },
    });
    redirect(`/dashboard/notes/${note.id}`);
  }

  const teacherTypes = new Set(["COMPREHENSION", "LONG_ANSWER", "DRAWING"]);
  const paper = await db.paper.create({
    data: {
      title,
      subjectId: subject.id,
      classGradeId: subject.classGradeId,
      topicId,
      kind: "PAST_PAPER",
      sourceType: payload.kind,
      sourceUrl: payload.sourceUrl,
      attribution: payload.sourceUrl,
      authorId: user.id,
      status: "NEEDS_REVIEW",
      questions: {
        create: payload.questions.map((question, index) => ({
          type: question.type || "SHORT_ANSWER",
          prompt: question.prompt,
          options: question.options ? JSON.stringify(question.options) : null,
          correctAnswer: JSON.stringify(question.correctAnswer ?? ""),
          explanation: question.explanation || null,
          markingGuide: question.explanation || null,
          points: Number(question.points) || 1,
          requiresTeacher: payload.mark === "TEACHER" && teacherTypes.has(question.type),
          topicId,
          order: index + 1,
        })),
      },
    },
  });
  redirect(`/dashboard/papers/${paper.id}`);
}

export async function approveContentAction(formData: FormData) {
  await adminUser();
  const kind = String(formData.get("kind") || "");
  const id = String(formData.get("id") || "");
  if (!id) redirect("/dashboard/admin/readiness");
  if (kind === "note") await db.note.update({ where: { id }, data: { status: "PUBLISHED" } });
  if (kind === "paper") await db.paper.update({ where: { id }, data: { status: "PUBLISHED" } });
  revalidatePath("/dashboard/admin/readiness");
  redirect("/dashboard/admin/readiness");
}
