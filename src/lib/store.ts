import { db } from "@/lib/db";

export const STORE_CATEGORIES = ["TABLET", "TSHIRT", "TEXTBOOK"] as const;
export type StoreCategory = typeof STORE_CATEGORIES[number];
export function ugx(amount: number) {
  return "UGX " + amount.toLocaleString("en-UG");
}
export function isCategory(value: string): value is StoreCategory {
  return STORE_CATEGORIES.some(x => x === value);
}
export async function listPublishedProducts() {
  return db.storeProduct.findMany({
    where: { status: "PUBLISHED", isPhysical: true, stockQuantity: { gt: 0 },
      OR: [{ category: { not: "TEXTBOOK" } }, { rightsConfirmed: true }] },
    orderBy: { createdAt: "desc" },
  });
}
