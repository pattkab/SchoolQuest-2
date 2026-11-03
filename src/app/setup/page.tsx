import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { BrandMark } from "@/components/shell";
import { ProfileForm } from "@/components/profile-form";
import { SiteFooter } from "@/components/site-footer";

const errors: Record<string, string> = {
  missing: "Fill the required fields.",
  phone: "That phone is already used.",
  school: "School code not found.",
  listed: "Choose a school from the list.",
  class: "Choose a class.",
};

export default async function SetupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const user = await requireUser();
  const classes = await db.classGrade.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { id: true, shortName: true },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-5 py-8 max-w-md mx-auto w-full">
        <BrandMark />
        <h1 className="font-display text-4xl mt-8">{!user.classGradeId && user.role === "STUDENT" ? "Choose your class" : user.profileComplete ? "Profile" : "Set up"}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {!user.classGradeId && user.role === "STUDENT" ? "This opens the notes and practice for your class." : user.profileComplete ? "Update your name and phone." : "Student, teacher, or school manager."}
        </p>
        {error && <p className="mt-4 rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">{errors[error] || "Try again."}</p>}
        <div className="mt-6">
          <ProfileForm
            locked={user.profileComplete}
            defaults={{
              name: user.name || "",
              phone: user.phone || "",
              role: user.role,
              classGradeId: user.classGradeId || "",
            }}
            classes={classes}
          />
        </div>
        {user.profileComplete && (
          <Link href="/dashboard/profile" className="inline-block mt-4 text-sm font-bold text-primary">Back to my profile</Link>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
