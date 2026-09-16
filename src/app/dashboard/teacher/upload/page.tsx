import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UploadForm from "./UploadForm";

export default async function TeacherUploadPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch all levels with subjects for the form selectors
  const levels = await db.level.findMany({
    orderBy: { order: "asc" },
    include: {
      subjects: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-gray-800">Teacher Panel</h2>
        <p className="text-gray-500">
          Upload any examination past paper PDF. Gemini will execute OCR and output interactive structured modules.
        </p>
      </div>

      <UploadForm levels={levels} />
    </div>
  );
}
