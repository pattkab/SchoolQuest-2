import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { canonicalPhone, phoneKeys } from "@/lib/phone";
import { schoolById } from "@/lib/ug-schools";

export type StudentRegistration = {
  phone: string;
  password: string;
  name: string;
  classGradeId: string;
  sex: string;
  guardianName: string;
  guardianPhone: string;
  dateOfBirth: string;
  emisSchoolId: string;
};

export async function registerStudentAccount(input: StudentRegistration) {
  const phone = canonicalPhone(input.phone);
  const guardianPhone = canonicalPhone(input.guardianPhone);
  const name = input.name.trim();
  const guardianName = input.guardianName.trim();
  const dateOfBirth = input.dateOfBirth ? new Date(`${input.dateOfBirth}T00:00:00.000Z`) : null;
  if (!phone || input.password.length < 4 || !name || !input.classGradeId) {
    return { error: "missing" as const };
  }
  const grade = await db.classGrade.findFirst({ where: { id: input.classGradeId, isActive: true }, select: { id: true } });
  if (!grade) return { error: "missing" as const };
  const school = input.emisSchoolId ? schoolById(input.emisSchoolId) : null;
  const existing = await db.user.findFirst({ where: { phone: { in: phoneKeys(input.phone) } } });
  if (existing) return { error: "exists" as const };
  const trialEnds = new Date();
  trialEnds.setDate(trialEnds.getDate() + 14);
  const user = await db.user.create({
    data: {
      phone,
      name,
      passwordHash: bcrypt.hashSync(input.password, 10),
      role: "STUDENT",
      classGradeId: input.classGradeId,
      sex: input.sex === "Female" || input.sex === "Male" ? input.sex : null,
      dateOfBirth: dateOfBirth && !Number.isNaN(dateOfBirth.getTime()) ? dateOfBirth : null,
      guardianName: guardianName || null,
      guardianPhone: guardianPhone || null,
      emisSchoolId: school?.id,
      school: school?.name,
      district: school?.district,
      trialStartsAt: new Date(),
      trialEndsAt: trialEnds,
    },
  });
  return { user };
}
