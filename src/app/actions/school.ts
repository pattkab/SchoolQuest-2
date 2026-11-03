"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { homeForRole, requireUser } from "@/lib/session";
import { canonicalPhone, phoneKeys } from "@/lib/phone";
import { randomCode, schoolFor, todayKey } from "@/lib/school";

function cleanPhone(value: FormDataEntryValue | null) {
  return String(value || "").replace(/\s+/g, "");
}

export async function completeProfileAction(formData: FormData) {
  const user = await requireUser();
  const role = user.role;
  const editing = user.profileComplete
    && (role !== "STUDENT" || Boolean(user.classGradeId))
    && (role !== "SCHOOL_ADMIN" || Boolean(user.ownedSchool));
  const name = editing || !user.name?.trim()
    ? String(formData.get("name") || "").trim()
    : user.name;
  const phone = editing && user.phone
    ? canonicalPhone(String(formData.get("phone") || "")) || user.phone
    : user.phone;
  const classGradeId = String(formData.get("classGradeId") || "") || user.classGradeId;

  if (!name) redirect("/setup?error=missing");
  if (phone && phone !== user.phone) {
    const taken = await db.user.findFirst({ where: { id: { not: user.id }, phone: { in: phoneKeys(phone) } } });
    if (taken) redirect("/setup?error=phone");
  }

  if (role === "SCHOOL_ADMIN" && !user.ownedSchool) {
    const schoolName = String(formData.get("schoolName") || "").trim();
    const district = String(formData.get("district") || "").trim();
    if (!schoolName) redirect("/setup?error=missing");
    await db.$transaction(async (tx) => {
      const school = await tx.school.create({
        data: { name: schoolName, code: randomCode("SQ-", 8), district: district || null, ownerId: user.id },
      });
      await tx.user.update({
        where: { id: user.id },
        data: { name, phone, district: district || null, school: schoolName, schoolId: school.id, profileComplete: true },
      });
    });
    redirect("/dashboard/school");
  }

  if (!user.profileComplete && role === "TEACHER") {
    const schoolCode = user.schoolId ? "" : String(formData.get("schoolCode") || "").trim().toUpperCase();
    const school = schoolCode ? await db.school.findUnique({ where: { code: schoolCode } }) : null;
    if (schoolCode && !school) redirect("/setup?error=school");
    await db.user.update({
      where: { id: user.id },
      data: {
        name,
        phone,
        role: "TEACHER",
        ...(school ? { schoolId: school.id, school: school.name, district: school.district } : {}),
        profileComplete: true,
      },
    });
    redirect("/dashboard/teacher");
  }

  if (role === "STUDENT" && (!classGradeId || !await db.classGrade.findFirst({
    where: { id: classGradeId, isActive: true },
    select: { id: true },
  }))) redirect("/setup?error=class");

  await db.user.update({
    where: { id: user.id },
    data: {
      name,
      phone,
      ...(role === "STUDENT" ? { classGradeId } : {}),
      profileComplete: true,
    },
  });
  revalidatePath("/dashboard", "layout");
  if (editing) redirect("/dashboard/profile");
  redirect(homeForRole(user.role));
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
  const pin = String(formData.get("pin") || "");
  if (!name || !phone || !classGradeId) redirect("/dashboard/school?error=missing");

  const studentNumber = requested || randomCode("SQ", 6);
  const takenNumber = await db.user.findUnique({ where: { studentNumber } });
  if (takenNumber) redirect("/dashboard/school?error=number");

  const existing = await db.user.findUnique({ where: { phone } });
  if (existing && existing.role !== "STUDENT") redirect("/dashboard/school?error=phone");
  if (existing && existing.schoolId && existing.schoolId !== school.id) redirect("/dashboard/school?error=phone");
  if (!existing?.passwordHash && pin.length < 4) redirect("/dashboard/school?error=missing");

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
  const learner = await db.user.findFirst({ where: { id: userId, schoolId: school.id, role: "STUDENT" } });
  if (!learner) redirect("/dashboard/school/fees?error=learner");
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
  const learner = await db.user.findFirst({ where: { id: userId, schoolId: school.id, role: "STUDENT" } });
  if (!learner) redirect("/dashboard/school/fees?error=learner");
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
  if (!student || student.schoolId !== school.id) return { ok: false, message: "No learner with that ID." };
  const day = todayKey();
  await db.attendanceMark.upsert({
    where: { userId_day: { userId: student.id, day } },
    update: { teacherId: teacher.id },
    create: { schoolId: school.id, userId: student.id, teacherId: teacher.id, day },
  });
  revalidatePath("/dashboard/school/attendance");
  return { ok: true, message: `${student.name || "Learner"} · present` };
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
