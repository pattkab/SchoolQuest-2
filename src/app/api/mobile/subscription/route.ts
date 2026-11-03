import { mobileSubscription, rejectClientBilling } from "@/lib/mobile-api";
import { bearerToken, userForMobileToken } from "@/lib/mobile-session";

export async function GET(request: Request) {
  const user = await userForMobileToken(bearerToken(request));
  if (!user) return Response.json({ error: "Sign in again." }, { status: 401 });
  return Response.json(await mobileSubscription(user.id));
}

export async function POST() {
  return Response.json(rejectClientBilling(), { status: 403 });
}
