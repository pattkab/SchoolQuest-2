import { db } from "@/lib/db";
import { rateLimit, requestRateKey } from "@/lib/rate-limit";
import { reconcileYoPayment, yoProvider } from "@/lib/yo-checkout";

export async function POST(request: Request) {
  if (!rateLimit(requestRateKey(request, "billing-yo"), 60, 60_000).ok) {
    return new Response(null, { status: 429 });
  }
  const key = new URL(request.url).searchParams.get("payment");
  if (!key || !/^[0-9a-f-]{36}$/.test(key)) return new Response(null, { status: 400 });
  const payment = await db.paymentTransaction.findUnique({ where: { idempotencyKey: key } });
  if (!payment || payment.provider !== yoProvider()) return new Response(null, { status: 404 });
  if (payment.status === "PENDING" && !payment.providerRef) return new Response(null, { status: 503 });
  try {
    // Notification data never determines the outcome. Query Yo with the stored reference.
    await reconcileYoPayment(payment);
    return new Response("OK");
  } catch {
    return new Response(null, { status: 503 });
  }
}
