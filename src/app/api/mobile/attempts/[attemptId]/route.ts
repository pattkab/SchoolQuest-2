import { mobileSave, mobileSubmit } from "@/lib/mobile-api";
import { bearerToken, userForMobileToken } from "@/lib/mobile-session";

export async function POST(request: Request, context: { params: Promise<{ attemptId: string }> }) {
  const user = await userForMobileToken(bearerToken(request));
  if (!user) return Response.json({ error: "Sign in again." }, { status: 401 });
  const { attemptId } = await context.params;
  const body = await request.json().catch(() => null) as { action?: string; writes?: { questionId: string; value: string; version: number }[]; answers?: Record<string, { value: string; version: number }> } | null;
  try {
    if (body?.action === "submit") return Response.json(await mobileSubmit(user.id, attemptId, body.answers || {}));
    return Response.json(await mobileSave(user.id, attemptId, Array.isArray(body?.writes) ? body.writes : []));
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "The examination could not be saved." }, { status: 400 });
  }
}
