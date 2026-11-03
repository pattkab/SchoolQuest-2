import { notFound } from "next/navigation";
import PromoCodeForm from "@/app/dashboard/subscribe/PromoCodeForm";
import YoPaymentForm from "@/app/dashboard/subscribe/YoPaymentForm";

export default function PaymentPreview() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <main className="mx-auto max-w-xl p-6 pt-12">
      <p className="text-sm text-muted-foreground">Checkout preview · no payment will be sent</p>
      <h1 className="my-4 font-display text-3xl">SchoolQuest Premium</h1>
      <div className="rounded-2xl border bg-background p-5">
        <p className="font-medium">UGX 20,000 for 30 days</p>
        <YoPaymentForm planCode="monthly" available preview />
      </div>
      <div className="mt-4"><PromoCodeForm preview /></div>
    </main>
  );
}
