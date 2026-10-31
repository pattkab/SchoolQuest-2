"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

function cleanPhone(value: FormDataEntryValue | null) {
  return String(value || "").replace(/\s+/g, "");
}

export async function loginAction(formData: FormData) {
  const phone = cleanPhone(formData.get("phone"));
  const password = String(formData.get("password") || "");
  const intent = String(formData.get("intent") || "STUDENT");
  try {
    await signIn("credentials", { phone, password, intent, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=invalid");
    }
    throw error;
  }
}

export async function registerStudentAction(formData: FormData) {
  const phone = cleanPhone(formData.get("phone"));
  const password = String(formData.get("password") || "");
  const name = String(formData.get("name") || "").trim();
  const classGradeId = String(formData.get("classGradeId") || "") || null;
  if (!phone || password.length < 4 || !name) {
    redirect("/login?error=missing");
  }

  const existing = await db.user.findUnique({ where: { phone } });
  if (existing) redirect("/login?error=exists");

  const trialEnds = new Date();
  trialEnds.setDate(trialEnds.getDate() + 14);

  await db.user.create({
    data: {
      phone,
      name,
      passwordHash: bcrypt.hashSync(password, 10),
      role: "STUDENT",
      classGradeId,
      trialStartsAt: new Date(),
      trialEndsAt: trialEnds,
    },
  });

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
  const userId = String(formData.get("userId") || "");
  const classGradeId = String(formData.get("classGradeId") || "");
  if (!userId || !classGradeId) return;
  await db.user.update({ where: { id: userId }, data: { classGradeId } });
  redirect("/dashboard");
}
