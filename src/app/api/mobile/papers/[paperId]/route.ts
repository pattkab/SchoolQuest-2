import { mobilePaper, mobileStart } from "@/lib/mobile-api";
import { bearerToken, userForMobileToken } from "@/lib/mobile-session";

export async function GET(request: Request, context: { params: Promise<{ paperId: string }> }) {
  const user = await userForMobileToken(bearerToken(request));
  if (!user) return Response.json({ error: "Sign in again." }, { status: 401 });
  const { paperId } = await context.params;
  const paper = await mobilePaper(paperId);
  if (!paper) return Response.json({ error: "Paper not found." }, { status: 404 });
  return Response.json(paper);
}

export async function POST(request: Request, context: { params: Promise<{ paperId: string }> }) {
  const user = await userForMobileToken(bearerToken(request));
  if (!user) return Response.json({ error: "Sign in again." }, { status: 401 });
  const { paperId } = await context.params;
  try {
    return Response.json(await mobileStart(user.id, paperId));
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "The examination could not be started." }, { status: 400 });
  }
}
