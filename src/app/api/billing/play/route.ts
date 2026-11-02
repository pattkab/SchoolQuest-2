import { auth } from "@/auth";
import { confirmStorePurchase, unverifiedStore } from "@/lib/billing";
import { bearerToken, userForMobileToken } from "@/lib/mobile-session";

async function payer(request: Request) {
  const mobile = await userForMobileToken(bearerToken(request));
  if (mobile) return mobile.id;
  const session = await auth();
  return session?.user?.id || null;
}

export async function POST(request: Request) {
  const userId = await payer(request);
  if (!userId) return Response.json({ error: "Sign in again." }, { status: 401 });
  const body = await request.json().catch(() => null) as { productId?: string; token?: string } | null;
  try {
    const result = await confirmStorePurchase({ userId, source: "PLAY", productId: String(body?.productId || ""), token: String(body?.token || ""), verify: unverifiedStore });
    return Response.json({ active: result.active });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "The store has not confirmed this purchase." }, { status: 403 });
  }
}
