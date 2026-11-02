import { mobileSubject } from "@/lib/mobile-api";
import { bearerToken, userForMobileToken } from "@/lib/mobile-session";

export async function GET(request: Request, context: { params: Promise<{ subjectId: string }> }) {
  const user = await userForMobileToken(bearerToken(request));
  if (!user) return Response.json({ error: "Sign in again." }, { status: 401 });
  const { subjectId } = await context.params;
  const subject = await mobileSubject(subjectId);
  if (!subject) return Response.json({ error: "Subject not found." }, { status: 404 });
  return Response.json(subject);
}
