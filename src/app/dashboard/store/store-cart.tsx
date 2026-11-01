"use client";
import { useState } from "react";
import { requestStoreOrder } from "./store-actions";

type Product = { id: string; title: string; description: string | null; category: string;
  priceUgx: number; stockQuantity: number; imageUrl: string | null; bundleMonth: boolean;
  publisher: string | null; isbn: string | null };
export function StoreCart({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const lines = products.filter(p => (cart[p.id] || 0) > 0);
  const total = lines.reduce((n,p)=> n+p.priceUgx*cart[p.id],0);
  function change(p: Product, by: number) {
    setCart(x=>({...x, [p.id]: Math.min(p.stockQuantity,Math.max(0,(x[p.id]||0)+by))}));
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!lines.length) return;
    setBusy(true); setError("");
    try {
      const result = await requestStoreOrder({
        lines: lines.map(p => ({ productId:p.id, quantity:cart[p.id] })),
        customerName: name, contactPhone: phone, deliveryLocation: location,
      });
      setOrderId(result.orderId); setCart({});
    } catch(e) { setError(e instanceof Error ? e.message : "Could not submit request."); }
    finally { setBusy(false); }
  }
  return <div className="space-y-6">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {products.map(p=><article key={p.id} className="rounded-2xl bg-white border p-5 space-y-2">
        <p className="text-xs uppercase tracking-wider font-bold text-primary">{p.category === "TSHIRT" ? "School T-shirt" : p.category === "TEXTBOOK" ? "Printed textbook" : "Learning tablet"}</p>
        <h2 className="font-display text-xl">{p.title}</h2>
        {p.description && <p className="text-sm text-muted-foreground">{p.description}</p>}
        {p.publisher && <p className="text-xs text-muted-foreground">Publisher: {p.publisher}{p.isbn ? " · ISBN "+p.isbn : ""}</p>}
        {p.bundleMonth && <p className="text-sm font-bold text-primary">Includes 30 days complimentary Pro after verified purchase and fulfilment</p>}
        <p className="font-bold">UGX {p.priceUgx.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">{p.stockQuantity} available</p>
        <div className="flex items-center gap-3">
          <button type="button" onClick={()=>change(p,-1)} aria-label={"Remove "+p.title} className="rounded-xl border px-4 py-2">−</button>
          <span className="min-w-6 text-center font-bold">{cart[p.id] || 0}</span>
          <button type="button" onClick={()=>change(p,1)} aria-label={"Add "+p.title} className="rounded-xl border px-4 py-2">+</button>
        </div>
      </article>)}
    </div>
    {orderId ? <section className="rounded-2xl border bg-white p-6 space-y-2" role="status">
      <h2 className="text-2xl font-bold">Order request received</h2>
      <p>Your reference is <strong>{orderId}</strong>. SchoolQuest will confirm stock, delivery and payment instructions. No charge has been made.</p>
      <button type="button" className="text-primary font-bold" onClick={()=>setOrderId("")}>Create another order</button>
    </section> : <form onSubmit={submit} className="rounded-2xl bg-white border p-5 space-y-4">
      <h2 className="text-2xl font-bold">Request an order</h2>
      <p className="text-sm text-muted-foreground">Your request is not a payment. An authorized seller will confirm the order before collecting money.</p>
      {lines.map(p=><p className="text-sm" key={p.id}>{cart[p.id]} × {p.title} — UGX {(p.priceUgx*cart[p.id]).toLocaleString()}</p>)}
      <p className="font-bold">Items total: UGX {total.toLocaleString()}</p>
      <label className="block text-sm font-semibold">Adult purchaser's name<input required maxLength={100} className="mt-1 h-12 w-full rounded-xl border px-3" value={name} onChange={e=>setName(e.target.value)}/></label>
      <label className="block text-sm font-semibold">Contact phone<input required type="tel" maxLength={25} className="mt-1 h-12 w-full rounded-xl border px-3" value={phone} onChange={e=>setPhone(e.target.value)}/></label>
      <label className="block text-sm font-semibold">District and delivery/pickup location<input required maxLength={250} className="mt-1 h-12 w-full rounded-xl border px-3" value={location} onChange={e=>setLocation(e.target.value)}/></label>
      {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
      <button type="submit" disabled={busy||!lines.length} className="w-full rounded-xl bg-primary text-white font-bold p-3 disabled:opacity-50">{busy?"Sending…":"Send order request"}</button>
    </form>}
  </div>;
}
