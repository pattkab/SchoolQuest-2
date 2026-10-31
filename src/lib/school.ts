import { db } from "@/lib/db";

export function todayKey() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Kampala" }).format(new Date());
}

export function ugx(amount: number) {
  return `UGX ${amount.toLocaleString("en-UG")}`;
}

export function randomCode(prefix: string, length: number) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = prefix;
  for (let i = 0; i < length; i += 1) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

export async function schoolFor(user: { id: string; role: string; schoolId: string | null }) {
  if (user.role === "SCHOOL_ADMIN") {
    return db.school.findUnique({ where: { ownerId: user.id } });
  }
  if (!user.schoolId) return null;
  return db.school.findUnique({ where: { id: user.schoolId } });
}

export function balance(charges: { amount: number }[], payments: { amount: number }[]) {
  const billed = charges.reduce((sum, row) => sum + row.amount, 0);
  const paid = payments.reduce((sum, row) => sum + row.amount, 0);
  return { billed, paid, due: billed - paid };
}
