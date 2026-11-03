import { db } from "@/lib/db";

export const FREE_EXAM_POLICY = "Each subject includes one free practice exam. It is used when the exam starts, and it stays used if you leave before the end. Opening a list of papers does not use it.";

const DEFAULT_PLANS = [
  { code: "monthly", name: "SchoolQuest Premium", kind: "DIGITAL", price: 20000, currency: "UGX", periodDays: 30, playProductId: "schoolquest_premium_monthly", appleProductId: "schoolquest_premium_monthly", active: true, grantsAccess: true },
  { code: "tablet", name: "Educational tablet", kind: "PHYSICAL", price: 0, currency: "UGX", periodDays: null, playProductId: null, appleProductId: null, active: false, grantsAccess: false },
  { code: "textbook", name: "Textbook", kind: "PHYSICAL", price: 0, currency: "UGX", periodDays: null, playProductId: null, appleProductId: null, active: false, grantsAccess: false },
  { code: "shirt", name: "SchoolQuest T-shirt", kind: "PHYSICAL", price: 0, currency: "UGX", periodDays: null, playProductId: null, appleProductId: null, active: false, grantsAccess: false },
];

export async function ensurePlans() {
  for (const plan of DEFAULT_PLANS) {
    const existing = await db.plan.findUnique({ where: { code: plan.code } });
    if (!existing) await db.plan.create({ data: plan });
  }
  return db.plan.findMany({ orderBy: { code: "asc" } });
}

export function subscriptionPlan(code: string, plans: { code: string }[]) {
  return plans.find((plan) => plan.code === code) ?? null;
}
