import { auth } from "@/auth";
import { appleNoticeEffect, confirmStorePurchase, unverifiedStore } from "@/lib/billing";
import { expireEntitlement, revokeEntitlement } from "@/lib/entitlements";
import { bearerToken, userForMobileToken } from "@/lib/mobile-session";

async function payer(request: Request) {
  const mobile = await userForMobileToken(bearerToken(request));
  if (mobile) return mobile.id;
  const session = await auth();
  return session?.user?.id || null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { productId?: string; token?: string; notificationType?: string; providerRef?: string } | null;
  const notice = appleNoticeEffect(String(body?.notificationType || ""));
  if (body?.providerRef && notice === "revoke") {
    await revokeEntitlement(`APPLE:${body.providerRef}`);
    return Response.json({ ok: true, effect: notice });
  }
  if (body?.providerRef && notice === "expire") {
    await expireEntitlement(`APPLE:${body.providerRef}`);
    return Response.json({ ok: true, effect: notice });
  }
  const userId = await payer(request);
  if (!userId) return Response.json({ error: "Sign in again." }, { status: 401 });
  try {
    const result = await confirmStorePurchase({ userId, source: "APPLE", productId: String(body?.productId || ""), token: String(body?.token || ""), verify: unverifiedStore });
    return Response.json({ active: result.active });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "The store has not confirmed this purchase." }, { status: 403 });
  }
}
