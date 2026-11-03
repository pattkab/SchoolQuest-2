import { requireUser } from "@/lib/session";
import { listPublishedProducts, ugx } from "@/lib/store";
import { StoreCart } from "./store-cart";

export default async function StorePage() {
  await requireUser();
  const products = await listPublishedProducts();
  return <div className="space-y-5">
    <div className="rounded-[1.8rem] bg-white border p-6">
      <p className="text-xs uppercase font-bold tracking-widest text-primary">SchoolQuest Store</p>
      <h1 className="font-display text-4xl mt-2">Learning essentials</h1>
      <p className="mt-2 text-muted-foreground">Affordable tablets, school T-shirts and licensed printed textbooks. Order requests are confirmed before payment.</p>
      <p className="mt-2 text-sm">Selected tablets may include 30 days of complimentary SchoolQuest Pro after payment verification and delivery. No automatic renewal.</p>
    </div>
    {products.length ? <StoreCart products={products.map(p => ({
      id: p.id, title: p.title, category: p.category, description: p.description,
      priceUgx: p.priceUgx, stockQuantity: p.stockQuantity, imageUrl: p.imageUrl,
      bundleMonth: p.bundleMonth, publisher: p.publisher, isbn: p.isbn,
    }))}/> : <div className="rounded-2xl bg-white border p-7 space-y-2">
      <h2 className="text-xl font-bold">Products coming soon</h2>
      <p className="text-muted-foreground">Our store is being stocked. No items have been released for sale yet.</p>
    </div>}
    <p className="text-xs text-muted-foreground">Displayed prices exclude delivery unless otherwise stated. Product availability and final order details are confirmed by SchoolQuest before payment. For printed textbooks, stock and publisher authorization are required.</p>
  </div>;
}
