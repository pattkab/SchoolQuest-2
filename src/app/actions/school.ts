"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { schoolById } from "@/lib/ug-schools";
import { randomCode, schoolFor, todayKey } from "@/lib/school";

function cleanPhone(value: FormDataEntryValue | null) {
  return String(value || "").replace(/\s+/g, "");
}

export async function completeProfileAction(formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") || "").trim();
  const phone = cleanPhone(formData.get("phone")) || null;
  const role = user.profileComplete ? user.role : String(formData.get("role") || "STUDENT");
  const classGradeId = String(formData.get("classGradeId") || "") || null;
  const schoolCode = String(formData.get("schoolCode") || "").trim().toUpperCase();
  const schoolName = String(formData.get("schoolName") || "").trim();
  const district = String(formData.get("district") || "").trim();
  const emisSchoolId = String(formData.get("emisSchoolId") || "");
  const listedSchool = emisSchoolId ? schoolById(emisSchoolId) : null;
  const sex = String(formData.get("sex") || "");
  const born = String(formData.get("dateOfBirth") || "");
  const dateOfBirth = born ? new Date(`${born}T00:00:00.000Z`) : null;
  const guardianName = String(formData.get("guardianName") || "").trim();
  const guardianPhone = cleanPhone(formData.get("guardianPhone"));

  if (!name) redirect("/setup?error=missing");
  if (phone) {
    const taken = await db.user.findUnique({ where: { phone } });
    if (taken && taken.id !== user.id) redirect("/setup?error=phone");
  }

  if (!user.profileComplete && role === "SCHOOL_ADMIN") {
    if (!schoolName) redirect("/setup?error=missing");
    const code = randomCode("SQ-", 4);
    await db.user.update({
      where: { id: user.id },
      data: { name, phone, role: "SCHOOL_ADMIN", district: district || null, school: schoolName, profileComplete: true },
    });
    const school = await db.school.create({
      data: { name: schoolName, code, district: district || null, ownerId: user.id },
    });
    await db.user.update({ where: { id: user.id }, data: { schoolId: school.id } });
    redirect("/dashboard/school");
  }

  if (!user.profileComplete && role === "TEACHER") {
    const school = schoolCode ? await db.school.findUnique({ where: { code: schoolCode } }) : null;
    if (schoolCode && !school) redirect("/setup?error=school");
    await db.user.update({
      where: { id: user.id },
      data: {
        name,
        phone,
        role: "TEACHER",
        schoolId: school?.id || null,
        school: school?.name || null,
        district: school?.district || null,
        profileComplete: true,
      },
    });
    redirect("/dashboard");
  }

  if (role === "STUDENT" && !classGradeId && !user.classGradeId) redirect("/setup?error=class");
  if (role === "STUDENT" && !user.profileComplete && !listedSchool) redirect("/setup?error=listed");
  if (role === "STUDENT" && !user.profileComplete && (sex !== "Female" && sex !== "Male" || !dateOfBirth || Number.isNaN(dateOfBirth.getTime()))) {
    redirect("/setup?error=missing");
  }
  await db.user.update({
    where: { id: user.id },
    data: {
      name,
      phone,
      role: user.profileComplete ? user.role : "STUDENT",
      classGradeId: classGradeId || user.classGradeId,
      ...(role === "STUDENT" && !user.profileComplete
        ? {
            sex,
            dateOfBirth,
            guardianName: guardianName || null,
            guardianPhone: guardianPhone || null,
            emisSchoolId: listedSchool?.id,
            school: listedSchool?.name,
            district: listedSchool?.district,
          }
        : {}),
      profileComplete: true,
    },
  });
  redirect(user.role === "SCHOOL_ADMIN" ? "/dashboard/school" : "/dashboard");
}

export async function joinSchoolAction(formData: FormData) {
  const user = await requireUser();
  if (user.role !== "TEACHER") redirect("/dashboard");
  const code = String(formData.get("schoolCode") || "").trim().toUpperCase();
  const school = await db.school.findUnique({ where: { code } });
  if (!school) redirect("/dashboard/school/attendance?error=school");
  await db.user.update({
    where: { id: user.id },
    data: { schoolId: school.id, school: school.name, district: school.district },
  });
  redirect("/dashboard/school/attendance");
}

export async function enrolStudentAction(formData: FormData) {
  const admin = await requireUser();
  const school = await schoolFor(admin);
  if (!school || admin.role !== "SCHOOL_ADMIN") redirect("/dashboard");

  const name = String(formData.get("name") || "").trim();
  const phone = cleanPhone(formData.get("phone"));
  const classGradeId = String(formData.get("classGradeId") || "");
  const requested = String(formData.get("studentNumber") || "").trim().toUpperCase();
  const pin = String(formData.get("pin") || "1234");
  if (!name || !phone || !classGradeId || pin.length < 4) redirect("/dashboard/school?error=missing");

  const studentNumber = requested || randomCode("SQ", 6);
  const takenNumber = await db.user.findUnique({ where: { studentNumber } });
  if (takenNumber) redirect("/dashboard/school?error=number");

  const existing = await db.user.findUnique({ where: { phone } });
  if (existing && existing.schoolId && existing.schoolId !== school.id) redirect("/dashboard/school?error=phone");

  const data = {
    name,
    phone,
    role: "STUDENT" as const,
    classGradeId,
    schoolId: school.id,
    school: school.name,
    district: school.district,
    studentNumber,
    profileComplete: true,
    passwordHash: existing?.passwordHash || bcrypt.hashSync(pin, 10),
  };

  const student = existing
    ? await db.user.update({ where: { id: existing.id }, data })
    : await db.user.create({ data });

  revalidatePath("/dashboard/school");
  redirect(`/dashboard/school/students/${student.id}`);
}

export async function addChargeAction(formData: FormData) {
  const admin = await requireUser();
  const school = await schoolFor(admin);
  if (!school || admin.role !== "SCHOOL_ADMIN") return;
  const userId = String(formData.get("userId") || "");
  const label = String(formData.get("label") || "").trim();
  const amount = Number(formData.get("amount") || 0);
  if (!userId || !label || !Number.isFinite(amount) || amount <= 0) redirect("/dashboard/school/fees?error=missing");
  await db.feeCharge.create({ data: { schoolId: school.id, userId, label, amount: Math.round(amount) } });
  revalidatePath("/dashboard/school/fees");
  redirect("/dashboard/school/fees");
}

export async function addPaymentAction(formData: FormData) {
  const admin = await requireUser();
  const school = await schoolFor(admin);
  if (!school || admin.role !== "SCHOOL_ADMIN") return;
  const userId = String(formData.get("userId") || "");
  const amount = Number(formData.get("amount") || 0);
  const note = String(formData.get("note") || "").trim() || null;
  if (!userId || !Number.isFinite(amount) || amount <= 0) redirect("/dashboard/school/fees?error=missing");
  await db.feePayment.create({ data: { schoolId: school.id, userId, amount: Math.round(amount), note } });
  revalidatePath("/dashboard/school/fees");
  redirect("/dashboard/school/fees");
}

export async function markAttendanceAction(code: string) {
  const teacher = await requireUser();
  const school = await schoolFor(teacher);
  if (!school || (teacher.role !== "TEACHER" && teacher.role !== "SCHOOL_ADMIN")) {
    return { ok: false, message: "Join a school first." };
  }
  const studentNumber = code.trim().toUpperCase();
  const student = await db.user.findUnique({ where: { studentNumber } });
  if (!student || student.schoolId !== school.id) return { ok: false, message: "No student with that ID." };
  const day = todayKey();
  await db.attendanceMark.upsert({
    where: { userId_day: { userId: student.id, day } },
    update: { teacherId: teacher.id },
    create: { schoolId: school.id, userId: student.id, teacherId: teacher.id, day },
  });
  revalidatePath("/dashboard/school/attendance");
  return { ok: true, message: `${student.name || "Student"} · present` };
}

export async function sendMessageAction(formData: FormData) {
  const user = await requireUser();
  const school = await schoolFor(user);
  if (!school) redirect("/dashboard/school");
  const toId = String(formData.get("toId") || "");
  const body = String(formData.get("body") || "").trim();
  if (!toId || !body) redirect("/dashboard/school?error=missing");
  const to = await db.user.findFirst({ where: { id: toId, schoolId: school.id } });
  if (!to) redirect("/dashboard/school?error=missing");
  await db.schoolMessage.create({ data: { schoolId: school.id, fromId: user.id, toId, body } });
  revalidatePath("/dashboard/school");
  revalidatePath("/dashboard/school/attendance");
  redirect("/dashboard/school");
}
