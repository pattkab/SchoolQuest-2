import { auth } from "@/auth";
import { confirmStorePurchase, unverifiedStore } from "@/lib/billing";
import { bearerToken, userForMobileToken } from "@/lib/mobile-session";
import { reportOps } from "@/lib/ops-log";
import { rateLimit, requestRateKey } from "@/lib/rate-limit";

async function payer(request: Request) {
  const mobile = await userForMobileToken(bearerToken(request));
  if (mobile) return mobile.id;
  const session = await auth();
  return session?.user?.id || null;
}

export async function POST(request: Request) {
  if (!rateLimit(requestRateKey(request, "billing-play"), 30, 60_000).ok) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }
  const userId = await payer(request);
  if (!userId) return Response.json({ error: "Sign in again." }, { status: 401 });
  const body = await request.json().catch(() => null) as { productId?: string; token?: string } | null;
  try {
    const result = await confirmStorePurchase({ userId, source: "PLAY", productId: String(body?.productId || ""), token: String(body?.token || ""), verify: unverifiedStore });
    return Response.json({ active: result.active });
  } catch {
    reportOps("billing.play_rejected", {});
    return Response.json({ error: "The store has not confirmed this purchase." }, { status: 403 });
  }
}
