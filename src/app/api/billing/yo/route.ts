import { confirmYoPayment } from "@/lib/billing";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-schoolquest-signature") || "";
  const payload = JSON.parse(rawBody) as { idempotencyKey?: string; providerRef?: string; status?: string; amount?: number };
  try {
    const result = await confirmYoPayment({ rawBody, signature, payload });
    return Response.json({ ok: true, duplicate: result.duplicate, active: Boolean(result.entitlement && !result.entitlement.revokedAt) });
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : "The payment could not be confirmed." }, { status: 403 });
  }
}
