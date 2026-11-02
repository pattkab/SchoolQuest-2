import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
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
  const phone = input.phone.replace(/\s+/g, "");
  const guardianPhone = input.guardianPhone.replace(/\s+/g, "");
  const name = input.name.trim();
  const guardianName = input.guardianName.trim();
  const dateOfBirth = input.dateOfBirth ? new Date(`${input.dateOfBirth}T00:00:00.000Z`) : null;
  if (!phone || input.password.length < 4 || !name || !input.classGradeId || !guardianName || !guardianPhone || (input.sex !== "Female" && input.sex !== "Male") || !dateOfBirth || Number.isNaN(dateOfBirth.getTime())) {
    return { error: "missing" as const };
  }
  const school = schoolById(input.emisSchoolId);
  if (!school) return { error: "school" as const };
  const existing = await db.user.findUnique({ where: { phone } });
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
      sex: input.sex,
      dateOfBirth,
      guardianName,
      guardianPhone,
      emisSchoolId: school.id,
      school: school.name,
      district: school.district,
      trialStartsAt: new Date(),
      trialEndsAt: trialEnds,
    },
  });
  return { user };
}
