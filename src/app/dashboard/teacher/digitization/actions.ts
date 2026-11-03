"use server";

import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { confirmLabels, recheckQuestion } from "@/lib/digitization";
import { advanceJob, approveJob, cancelJob, publishJob, readDraft, rejectJob, updateDraft } from "@/lib/digitization-jobs";
import { requireUser, isAccreditedTeacher, isAdmin } from "@/lib/session";

async function reviewer() {
  const user = await requireUser();
  if (!isAccreditedTeacher(user) && !isAdmin(user.role)) throw new Error("Accredited teachers and admins only.");
  return user;
}

async function ownedJob(jobId: string, userId: string, role: string) {
  const job = await db.digitizationJob.findUnique({ where: { id: jobId } });
  if (!job) throw new Error("Processing job not found.");
  if (job.createdById !== userId && !isAdmin(role)) throw new Error("This paper belongs to another teacher.");
  return job;
}

function kick(jobId: string) {
  after(() => {
    return import("@/lib/digitization-ai")
      .then((mod) => advanceJob(jobId, mod.extractWithGemini))
      .catch(() => undefined);
  });
}

export async function advanceDigitization(formData: FormData) {
  const user = await reviewer();
  const jobId = String(formData.get("jobId") || "");
  await ownedJob(jobId, user.id, user.role);
  kick(jobId);
  revalidatePath(`/dashboard/teacher/digitization/${jobId}`);
}

export async function correctQuestion(formData: FormData) {
  const user = await reviewer();
  const jobId = String(formData.get("jobId") || "");
  const index = Number(formData.get("index"));
  const job = await ownedJob(jobId, user.id, user.role);
  const draft = readDraft(job.draft);
  if (!draft || !draft.questions[index]) throw new Error("Nothing to correct yet.");
  const question = draft.questions[index];
  question.prompt = String(formData.get("prompt") || "").trim();
  question.explanation = String(formData.get("markingGuide") || "").trim() || null;
  const points = Number(formData.get("points"));
  question.points = points > 0 ? points : null;
  if (question.type !== "DIAGRAM_LABEL") question.correctAnswer = String(formData.get("correctAnswer") || "").trim();
  recheckQuestion(draft, index);
  await updateDraft(jobId, user.id, draft, "A teacher corrected a question.");
  revalidatePath(`/dashboard/teacher/digitization/${jobId}`);
}

export async function confirmDiagram(formData: FormData) {
  const user = await reviewer();
  const jobId = String(formData.get("jobId") || "");
  const index = Number(formData.get("index"));
  const job = await ownedJob(jobId, user.id, user.role);
  const draft = readDraft(job.draft);
  if (!draft) throw new Error("Nothing to correct yet.");
  const accepted: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("accept-")) accepted[key.slice(7)] = String(value);
  }
  confirmLabels(draft, index, accepted);
  recheckQuestion(draft, index);
  await updateDraft(jobId, user.id, draft, "A teacher confirmed diagram labels.");
  revalidatePath(`/dashboard/teacher/digitization/${jobId}`);
}

export async function setJobSubject(formData: FormData) {
  const user = await reviewer();
  const jobId = String(formData.get("jobId") || "");
  await ownedJob(jobId, user.id, user.role);
  const subjectId = String(formData.get("subjectId") || "");
  const title = String(formData.get("title") || "").trim();
  const year = Number(formData.get("year"));
  if (!subjectId) throw new Error("Choose a subject.");
  const draft = readDraft((await db.digitizationJob.findUnique({ where: { id: jobId } }))?.draft || null);
  if (draft) {
    if (title) draft.title = title;
    const duration = Number(formData.get("durationMinutes"));
    if (!Number.isSafeInteger(duration) || duration < 0 || duration > 1440) throw new Error("Enter a duration between 1 and 1440 minutes, or leave it blank.");
    draft.durationMinutes = duration || null;
  }
  await db.digitizationJob.update({
    where: { id: jobId },
    data: { subjectId, title: title || undefined, year: year || null, draft: draft ? JSON.stringify(draft) : undefined },
  });
  revalidatePath(`/dashboard/teacher/digitization/${jobId}`);
}

export async function approveDigitization(formData: FormData) {
  const user = await reviewer();
  const jobId = String(formData.get("jobId") || "");
  await ownedJob(jobId, user.id, user.role);
  await approveJob(jobId, user.id);
  revalidatePath(`/dashboard/teacher/digitization/${jobId}`);
}

export async function publishDigitization(formData: FormData) {
  const user = await reviewer();
  const jobId = String(formData.get("jobId") || "");
  await ownedJob(jobId, user.id, user.role);
  await publishJob(jobId, user.id);
  revalidatePath(`/dashboard/teacher/digitization/${jobId}`);
}

export async function rejectDigitization(formData: FormData) {
  const user = await reviewer();
  const jobId = String(formData.get("jobId") || "");
  await ownedJob(jobId, user.id, user.role);
  await rejectJob(jobId, user.id, String(formData.get("reason") || ""));
  revalidatePath(`/dashboard/teacher/digitization/${jobId}`);
}

export async function cancelDigitization(formData: FormData) {
  const user = await reviewer();
  const jobId = String(formData.get("jobId") || "");
  await ownedJob(jobId, user.id, user.role);
  await cancelJob(jobId, user.id);
  revalidatePath(`/dashboard/teacher/digitization/${jobId}`);
}
