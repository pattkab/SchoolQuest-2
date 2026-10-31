import { db } from "@/lib/db";
import { requireUser, isAccreditedTeacher } from "@/lib/session";
import { redirect } from "next/navigation";
import UploadForm from "./UploadForm";

export default async function TeacherUploadPage() {
  const user = await requireUser();
  if (!isAccreditedTeacher(user) && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    redirect("/dashboard/teacher");
  }

  const levels = await db.level.findMany({
    orderBy: { order: "asc" },
    include: {
      classGrades: {
        where: { isActive: true },
        include: { subjects: { orderBy: { order: "asc" } } },
      },
    },
  });

  const adapted = levels.map((level) => ({
    id: level.id,
    name: level.name,
    subjects: level.classGrades.flatMap((cls) =>
      cls.subjects.map((subject) => ({
        id: subject.id,
        name: `${cls.shortName} · ${subject.name}`,
        levelId: level.id,
      }))
    ),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">Upload a paper</h1>
        <p className="text-muted-foreground mt-2">
          Drop a scanned past paper. Gemini reads it, then you approve the questions before learners see them.
        </p>
      </div>
      <UploadForm levels={adapted} />
    </div>
  );
}
