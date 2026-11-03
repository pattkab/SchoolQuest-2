import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser, isAdmin } from "@/lib/session";
import { addStoreProduct, updateStoreOrderStatus } from "./store-actions";
import { ugx } from "@/lib/store";

export default async function AdminStorePage() {
  const user = await requireUser();
  if (!isAdmin(user.role)) redirect("/dashboard");
  const [products,orders] = await Promise.all([
    db.storeProduct.findMany({orderBy:{createdAt:"desc"},take:100}),
    db.storeOrder.findMany({orderBy:{createdAt:"desc"},take:100,
      include:{lines:{include:{product:true}}}}),
  ]);
  return <div className="space-y-6">
    <div><p className="text-xs uppercase tracking-widest font-bold text-primary">Site Manager</p><h1 className="font-display text-4xl">SchoolQuest Store</h1><p className="text-muted-foreground">Manage genuine physical goods, publisher permissions and order requests.</p></div>
    <form action={addStoreProduct} className="rounded-2xl border bg-white p-5 space-y-3">
      <h2 className="text-xl font-bold">Add physical product</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm">Product name<input name="title" required maxLength={120} className="mt-1 w-full rounded-lg border p-3"/></label>
        <label className="text-sm">Category<select name="category" className="mt-1 w-full rounded-lg border p-3"><option value="TABLET">Tablet computer</option><option value="TSHIRT">School T-shirt</option><option value="TEXTBOOK">Printed textbook</option></select></label>
        <label className="text-sm">Price (UGX)<input name="priceUgx" required min="1" step="1" type="number" className="mt-1 w-full rounded-lg border p-3"/></label>
        <label className="text-sm">Stock quantity<input name="stockQuantity" required min="0" step="1" type="number" className="mt-1 w-full rounded-lg border p-3"/></label>
        <label className="text-sm">Publisher (textbooks)<input name="publisher" maxLength={120} className="mt-1 w-full rounded-lg border p-3"/></label>
        <label className="text-sm">ISBN (textbooks)<input name="isbn" maxLength={30} className="mt-1 w-full rounded-lg border p-3"/></label>
      </div>
      <label className="block text-sm">Short description<textarea name="description" maxLength={600} className="mt-1 w-full rounded-lg border p-3"/></label>
      <label className="flex gap-2 text-sm"><input type="checkbox" name="rightsConfirmed"/> Publisher distribution authorization verified (required for textbooks)</label>
      <label className="flex gap-2 text-sm"><input type="checkbox" name="bundleMonth"/> Tablet includes a complimentary 30-day SchoolQuest Pro benefit (fulfilment/activation not yet enabled)</label>
      <label className="flex gap-2 text-sm"><input type="checkbox" name="publish"/> Publish after verifying actual stock, prices, product specifications and sale permissions</label>
      <button className="rounded-xl bg-primary text-white px-5 py-3 font-bold">Save product</button>
    </form>
    <section className="rounded-2xl border bg-white p-5 space-y-3"><h2 className="text-xl font-bold">Catalog ({products.length})</h2>
      {products.map(p=><p className="border-b py-2 text-sm" key={p.id}><strong>{p.title}</strong> · {p.category} · {ugx(p.priceUgx)} · Stock {p.stockQuantity} · {p.status}{p.category==="TEXTBOOK"&&!p.rightsConfirmed?" · Rights pending":""}</p>)}
      {!products.length&&<p className="text-sm text-muted-foreground">No products. Only verified inventory should be listed.</p>}
    </section>
    <section className="rounded-2xl border bg-white p-5 space-y-3"><h2 className="text-xl font-bold">Order requests ({orders.length})</h2>
      {orders.map(o=><div className="border-b pb-4 space-y-2" key={o.id}>
        <p className="font-bold text-sm">#{o.id} · {o.status} · {ugx(o.totalUgx)}</p>
        <p className="text-sm">{o.customerName} · {o.contactPhone} · {o.deliveryLocation}</p>
        <p className="text-xs text-muted-foreground">{o.lines.map(l=>l.quantity+" × "+l.product.title).join("; ")}</p>
        {o.status==="REQUESTED" && <form action={updateStoreOrderStatus} className="flex gap-2">
          <input type="hidden" name="orderId" value={o.id}/><input type="hidden" name="status" value="CONFIRMED"/>
          <button className="rounded-lg border px-3 py-2 text-sm font-bold">Confirm order request</button>
        </form>}
        {["REQUESTED","CONFIRMED"].includes(o.status)&&<form action={updateStoreOrderStatus}>
          <input type="hidden" name="orderId" value={o.id}/><input type="hidden" name="status" value="CANCELLED"/>
          <button className="text-sm text-red-700">Cancel request</button>
        </form>}
        <p className="text-xs text-muted-foreground">Payment, fulfilment and free-month activation are disabled pending verified merchant operations.</p>
      </div>)}
      {!orders.length&&<p className="text-sm text-muted-foreground">No orders submitted.</p>}
    </section>
  </div>;
}
