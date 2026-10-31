import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function LegacyLevelPage({ params }: { params: Promise<{ levelId: string }> }) {
  const { levelId } = await params;
  const level = await db.level.findUnique({
    where: { id: levelId },
    include: { classGrades: { where: { isActive: true }, orderBy: { order: "asc" } } },
  });
  redirect(level?.classGrades[0] ? `/dashboard/classes/${level.classGrades[0].slug}` : "/dashboard");
}
