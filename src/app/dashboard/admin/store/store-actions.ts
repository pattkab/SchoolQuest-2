"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser, isAdmin } from "@/lib/session";
import { isCategory } from "@/lib/store";
import { randomUUID } from "node:crypto";

async function requireAdmin() {
  const user = await requireUser();
  if (!isAdmin(user.role)) throw new Error("Site managers only.");
  return user;
}
export async function addStoreProduct(form: FormData) {
  await requireAdmin();
  const title=String(form.get("title")||"").trim();
  const category=String(form.get("category")||"");
  const priceUgx=Number(form.get("priceUgx"));
  const stockQuantity=Number(form.get("stockQuantity"));
  const description=String(form.get("description")||"").trim().slice(0,600);
  const publisher=String(form.get("publisher")||"").trim().slice(0,120);
  const isbn=String(form.get("isbn")||"").trim().slice(0,30);
  const rightsConfirmed=form.get("rightsConfirmed")==="on";
  const publish=form.get("publish")==="on";
  const bundleMonth=form.get("bundleMonth")==="on";
  if (!title||title.length>120||!isCategory(category)||
    !Number.isSafeInteger(priceUgx)||priceUgx<1||priceUgx>100000000||
    !Number.isSafeInteger(stockQuantity)||stockQuantity<0||stockQuantity>100000)
      throw new Error("Check product, price and stock.");
  if (category==="TEXTBOOK"&&(!publisher||!isbn||!rightsConfirmed)&&publish)
    throw new Error("Verify publisher permission and textbook details before publishing.");
  if (bundleMonth&&category!=="TABLET") throw new Error("Only verified tablets may include a trial.");
  await db.storeProduct.create({data:{
    slug:"product-"+randomUUID(),title,category,priceUgx,stockQuantity,
    description:description||null,publisher:publisher||null,isbn:isbn||null,
    rightsConfirmed,bundleMonth,status:publish?"PUBLISHED":"DRAFT",
  }});
  revalidatePath("/dashboard/admin/store");revalidatePath("/dashboard/store");
}
export async function updateStoreOrderStatus(form:FormData) {
  await requireAdmin();
  const id=String(form.get("orderId")||"");
  const status=String(form.get("status")||"");
  if (!["CONFIRMED","CANCELLED"].includes(status)) throw new Error("Unsupported order state.");
  const current=await db.storeOrder.findUnique({where:{id}});
  if (!current||current.status!=="REQUESTED") throw new Error("Order is not awaiting review.");
  await db.storeOrder.updateMany({where:{id,status:"REQUESTED"},data:{status}});
  revalidatePath("/dashboard/admin/store");
}
