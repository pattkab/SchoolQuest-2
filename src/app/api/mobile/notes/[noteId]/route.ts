import { mobileNote } from "@/lib/mobile-api";
import { bearerToken, userForMobileToken } from "@/lib/mobile-session";

export async function GET(request: Request, context: { params: Promise<{ noteId: string }> }) {
  const user = await userForMobileToken(bearerToken(request));
  if (!user) return Response.json({ error: "Sign in again." }, { status: 401 });
  const { noteId } = await context.params;
  const note = await mobileNote(noteId);
  if (!note) return Response.json({ error: "Note not found." }, { status: 404 });
  return Response.json(note);
}
