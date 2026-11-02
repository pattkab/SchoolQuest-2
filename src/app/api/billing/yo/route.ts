import { confirmYoPayment } from "@/lib/billing";
import { reportOps } from "@/lib/ops-log";
import { rateLimit, requestRateKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!rateLimit(requestRateKey(request, "billing-yo"), 30, 60_000).ok) {
    return Response.json({ ok: false, error: "Too many requests." }, { status: 429 });
  }
  const rawBody = await request.text();
  const signature = request.headers.get("x-schoolquest-signature") || "";
  let payload: { idempotencyKey?: string; providerRef?: string; status?: string; amount?: number };
  try {
    payload = JSON.parse(rawBody) as typeof payload;
  } catch {
    reportOps("billing.yo_invalid", {});
    return Response.json({ ok: false, error: "The payment notification could not be verified." }, { status: 403 });
  }
  try {
    const result = await confirmYoPayment({ rawBody, signature, payload });
    return Response.json({ ok: true, duplicate: result.duplicate, active: Boolean(result.entitlement && !result.entitlement.revokedAt) });
  } catch {
    reportOps("billing.yo_rejected", {});
    return Response.json({ ok: false, error: "The payment notification could not be verified." }, { status: 403 });
  }
}
