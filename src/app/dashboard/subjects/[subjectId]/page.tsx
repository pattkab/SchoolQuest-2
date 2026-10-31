import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function LegacySubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  const subject = await db.subject.findUnique({
    where: { id: subjectId },
    include: { classGrade: true },
  });
  redirect(subject ? `/dashboard/classes/${subject.classGrade.slug}/${subject.slug}` : "/dashboard");
}
