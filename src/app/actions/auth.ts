"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { registerStudentAccount } from "@/lib/student-account";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { reportOps } from "@/lib/ops-log";
import { rateLimit } from "@/lib/rate-limit";
import { canonicalPhone } from "@/lib/phone";

function cleanPhone(value: FormDataEntryValue | null) {
  return canonicalPhone(String(value || ""));
}

export async function loginAction(formData: FormData) {
  const phone = cleanPhone(formData.get("phone"));
  const password = String(formData.get("password") || "");
  if (!rateLimit(`login:${phone}`, 8, 15 * 60_000).ok) {
    reportOps("auth.login_limited", {});
    redirect("/login?error=limited");
  }
  try {
    await signIn("credentials", { phone, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) redirect("/login?error=invalid");
    throw error;
  }
}

export async function registerStudentAction(formData: FormData) {
  const phone = cleanPhone(formData.get("phone"));
  const password = String(formData.get("password") || "");
  if (!rateLimit(`register:${phone}`, 5, 60 * 60_000).ok) {
    reportOps("auth.register_limited", {});
    redirect("/login?tab=join&error=limited");
  }
  const created = await registerStudentAccount({
    phone,
    password,
    name: String(formData.get("name") || ""),
    classGradeId: String(formData.get("classGradeId") || ""),
    sex: String(formData.get("sex") || ""),
    guardianName: String(formData.get("guardianName") || ""),
    guardianPhone: cleanPhone(formData.get("guardianPhone")),
    dateOfBirth: String(formData.get("dateOfBirth") || ""),
    emisSchoolId: String(formData.get("emisSchoolId") || ""),
  });
  if ("error" in created) redirect(`/login?tab=join&error=${created.error}`);

  await signIn("credentials", { phone, password, intent: "STUDENT", redirectTo: "/dashboard" });
}

export async function registerTeacherAction(formData: FormData) {
  const phone = cleanPhone(formData.get("phone"));
  const password = String(formData.get("password") || "");
  const fullName = String(formData.get("fullName") || "").trim();
  const registrationNumber = String(formData.get("registrationNumber") || "").trim().toUpperCase();
  const school = String(formData.get("school") || "").trim();
  const district = String(formData.get("district") || "").trim();
  const qualification = String(formData.get("qualification") || "").trim();
  const yearsExperience = Number(formData.get("yearsExperience") || 0);
  const subjects = String(formData.get("subjects") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const classes = String(formData.get("classes") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const bio = String(formData.get("bio") || "").trim();
  const nationalId = String(formData.get("nationalId") || "").trim();
  const email = String(formData.get("email") || "").trim() || null;

  if (!phone || password.length < 4 || !fullName || !registrationNumber || !school || !district || !qualification) {
    redirect("/register/teacher?error=missing");
  }
  if (!rateLimit(`register-teacher:${phone}`, 5, 60 * 60_000).ok) {
    reportOps("auth.register_limited", {});
    redirect("/register/teacher?error=limited");
  }

  const existingPhone = await db.user.findUnique({ where: { phone } });
  if (existingPhone) redirect("/register/teacher?error=exists");
  const existingReg = await db.teacherProfile.findUnique({ where: { registrationNumber } });
  if (existingReg) redirect("/register/teacher?error=reg");

  const user = await db.user.create({
    data: {
      phone,
      email,
      name: fullName,
      passwordHash: bcrypt.hashSync(password, 10),
      role: "TEACHER",
      school,
      district,
      trialStartsAt: new Date(),
      trialEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    },
  });

  await db.teacherProfile.create({
    data: {
      userId: user.id,
      fullName,
      registrationNumber,
      nationalId: nationalId || null,
      school,
      district,
      qualification,
      yearsExperience: Number.isFinite(yearsExperience) ? yearsExperience : 0,
      subjects: JSON.stringify(subjects),
      classes: JSON.stringify(classes),
      bio: bio || null,
      status: "PENDING",
    },
  });

  await signIn("credentials", { phone, password, intent: "TEACHER", redirectTo: "/dashboard/teacher" });
}

export async function setStudentClassAction(formData: FormData) {
  const { requireUser } = await import("@/lib/session");
  const user = await requireUser();
  if (user.role !== "STUDENT") redirect("/dashboard");
  const classGradeId = String(formData.get("classGradeId") || "");
  const grade = classGradeId ? await db.classGrade.findUnique({ where: { id: classGradeId } }) : null;
  if (!grade) redirect("/dashboard");
  await db.user.update({ where: { id: user.id }, data: { classGradeId: grade.id } });
  redirect("/dashboard");
}
