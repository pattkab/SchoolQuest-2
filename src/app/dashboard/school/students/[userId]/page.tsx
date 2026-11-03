import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { schoolFor } from "@/lib/school";
import { IdCard } from "@/components/id-card";
import { PrintButton } from "@/components/print-button";

export default async function StudentCardPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const admin = await requireUser();
  if (admin.role !== "SCHOOL_ADMIN") redirect("/dashboard/school");
  const school = await schoolFor(admin);
  const student = await db.user.findFirst({
    where: { id: userId, schoolId: school?.id, role: "STUDENT" },
    include: { classGrade: true },
  });
  if (!student || !school || !student.studentNumber) notFound();

  return (
    <div className="space-y-4">
      <h1 className="font-display text-4xl no-print">ID card</h1>
      <IdCard
        name={student.name || "Learner"}
        studentNumber={student.studentNumber}
        school={school.name}
        className={student.classGrade?.shortName || ""}
      />
      <p className="text-sm text-muted-foreground no-print">Phone {student.phone}. Print this card.</p>
      <PrintButton />
    </div>
  );
}
