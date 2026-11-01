"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function requestStoreOrder(input: {
  lines: { productId: string; quantity: number }[];
  customerName: string; contactPhone: string; deliveryLocation: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Sign in to place an order.");
  if (!input || !Array.isArray(input.lines) || input.lines.length < 1 || input.lines.length > 20)
    throw new Error("Choose between 1 and 20 items.");
  const name = input.customerName?.trim();
  const phone = input.contactPhone?.trim();
  const location = input.deliveryLocation?.trim();
  if (!name || name.length > 100 || !phone || !/^[+0-9 ()-]{9,25}$/.test(phone)
      || !location || location.length > 250) throw new Error("Enter valid adult buyer and delivery details.");
  const ids = input.lines.map(l=>l.productId);
  if (new Set(ids).size !== ids.length || ids.some(x=>typeof x!=="string"||x.length>100))
    throw new Error("Invalid cart.");
  if (input.lines.some(l=>!Number.isSafeInteger(l.quantity)||l.quantity<1||l.quantity>50))
    throw new Error("Quantity must be between 1 and 50.");
  const products = await db.storeProduct.findMany({ where: {
    id: { in: ids }, status: "PUBLISHED", isPhysical: true,
    OR: [{ category: { not: "TEXTBOOK" } }, { rightsConfirmed: true }],
  } });
  if (products.length !== ids.length) throw new Error("One or more products are no longer available.");
  const byId = new Map(products.map(p=>[p.id,p]));
  let total = 0;
  const lines = input.lines.map(l=>{
    const p = byId.get(l.productId)!;
    if (l.quantity>p.stockQuantity) throw new Error("Not enough stock for "+p.title+".");
    if (!Number.isSafeInteger(p.priceUgx)||p.priceUgx<1) throw new Error("Invalid product price.");
    total += p.priceUgx*l.quantity;
    if (!Number.isSafeInteger(total)) throw new Error("Cart total is too large.");
    return { productId:p.id, quantity:l.quantity, unitPriceUgx:p.priceUgx,
      bundleMonth:p.category==="TABLET" && p.bundleMonth };
  });
  const order = await db.storeOrder.create({ data: {
    userId:session.user.id,customerName:name,contactPhone:phone,
    deliveryLocation:location,totalUgx:total,lines:{create:lines},
  } });
  // Orders are REQUESTED, not paid, reserved, or confirmed. Stock may change.
  return {orderId:order.id,status:"REQUESTED"};
}
