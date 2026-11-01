import { auth } from "@/auth";
import { db } from "@/lib/db";
import { pathwayForRole } from "@/lib/pathways";
import { redirect } from "next/navigation";

export type AppRole = "STUDENT" | "TEACHER" | "SCHOOL_ADMIN" | "ADMIN" | "SUPER_ADMIN" | "PARENT";

export async function getSessionUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return db.user.findUnique({
    where: { id: session.user.id },
    include: {
      classGrade: { include: { level: true } },
      teacherProfile: true,
      schoolMember: true,
      ownedSchool: true,
    },
  });
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

export function isStaff(role?: string | null) {
  return role === "TEACHER" || role === "ADMIN" || role === "SUPER_ADMIN";
}

export function isAdmin(role?: string | null) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export function isSchoolAdmin(role?: string | null) {
  return role === "SCHOOL_ADMIN";
}

export function homeForRole(role?: string | null) {
  return pathwayForRole(role).home;
}

export function isAccreditedTeacher(user: {
  role: string;
  teacherProfile?: { status: string } | null;
}) {
  if (isAdmin(user.role)) return true;
  return user.role === "TEACHER" && user.teacherProfile?.status === "ACCREDITED";
}
