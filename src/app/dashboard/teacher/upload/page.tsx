import Link from "next/link";
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
          The paper is queued and read after this page responds. Learners cannot see it until you approve it and publish it.
        </p>
        <Link href="/dashboard/teacher/digitization" className="text-sm text-primary">Papers being read</Link>
      </div>
      <UploadForm levels={adapted} />
    </div>
  );
}
