import { db } from "@/lib/db";
import { passwordMatches } from "@/lib/password";
import { bearerToken, openMobileSession, revokeMobileToken, userForMobileToken } from "@/lib/mobile-session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { phone?: string; password?: string } | null;
  const phone = String(body?.phone || "").replace(/\s+/g, "");
  const password = String(body?.password || "");
  const user = phone ? await db.user.findUnique({ where: { phone }, include: { classGrade: true } }) : null;
  if (!user || !passwordMatches(user.passwordHash, password)) {
    return Response.json({ error: "Phone or password is not right." }, { status: 401 });
  }
  const session = await openMobileSession(user.id);
  return Response.json({
    token: session.token,
    expiresAt: session.expiresAt,
    user: { id: user.id, name: user.name, role: user.role, classLabel: user.classGrade?.shortName || "" },
  });
}

export async function DELETE(request: Request) {
  await revokeMobileToken(bearerToken(request));
  return Response.json({ ok: true });
}

export async function GET(request: Request) {
  const user = await userForMobileToken(bearerToken(request));
  if (!user) return Response.json({ error: "Sign in again." }, { status: 401 });
  return Response.json({ id: user.id, name: user.name, role: user.role });
}
