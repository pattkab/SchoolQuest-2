import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { BrandMark } from "@/components/shell";
import { ProfileForm } from "@/components/profile-form";
import { pathwayForRole } from "@/lib/pathways";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "Set up your profile", robots: { index: false, follow: true } };

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
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;
  const fromWizard = from === "start";
  const user = await requireUser();
  const chooseClass = user.role === "STUDENT" && !user.classGradeId;
  const needsSchool = user.role === "SCHOOL_ADMIN" && !user.ownedSchool;
  const editing = user.profileComplete && !chooseClass && !needsSchool;
  const pathway = pathwayForRole(user.role);
  const classes = user.role === "STUDENT" ? await db.classGrade.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { id: true, shortName: true },
  }) : [];

  return (
    <div data-space={pathway.id} className="min-h-screen flex flex-col">
      <main className="flex-1 px-5 py-8 max-w-md mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={fromWizard ? "/start" : editing ? "/dashboard/profile" : "/"} className="space-back">
            <ChevronLeft aria-hidden="true" className="h-5 w-5" /> {fromWizard ? "Back to getting started" : editing ? "Back to profile" : "Back to home"}
          </Link>
          <BrandMark href="/" />
        </div>
        <p className="space-label mt-8">{pathway.label} space</p>
        <h1 className="font-display text-4xl mt-2">{chooseClass ? "Choose your class" : needsSchool ? "Set up your school" : editing ? "Edit your profile" : "Finish setting up your profile"}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          {chooseClass ? "We’ll show you notes and practice for your class. You can change it from your profile later." : needsSchool ? "Add your school name and district to create a workspace for enrolment, attendance, and fees." : editing ? "Update your profile details." : "Confirm your details to open your dashboard."}
        </p>
        {error && <p role="alert" className="mt-4 rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">{errors[error] || "Try again."}</p>}
        <div className="mt-6">
          <ProfileForm
            editing={editing}
            fromWizard={fromWizard}
            needsSchool={needsSchool}
            needsSchoolCode={user.role === "TEACHER" && !user.profileComplete && !user.schoolId}
            defaults={{
              name: user.name || "",
              phone: user.phone || "",
              role: user.role,
              classGradeId: user.classGradeId || "",
              school: user.school || "",
              district: user.district || "",
            }}
            classes={classes}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
