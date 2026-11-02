import { openMobileSession } from "@/lib/mobile-session";
import { registerStudentAccount } from "@/lib/student-account";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, string> | null;
  if (!body) return Response.json({ error: "missing" }, { status: 400 });
  const created = await registerStudentAccount({
    phone: String(body.phone || ""),
    password: String(body.password || ""),
    name: String(body.name || ""),
    classGradeId: String(body.classGradeId || ""),
    sex: String(body.sex || ""),
    guardianName: String(body.guardianName || ""),
    guardianPhone: String(body.guardianPhone || ""),
    dateOfBirth: String(body.dateOfBirth || ""),
    emisSchoolId: String(body.emisSchoolId || ""),
  });
  if ("error" in created) return Response.json({ error: created.error }, { status: created.error === "exists" ? 409 : 400 });
  const session = await openMobileSession(created.user.id);
  return Response.json({ token: session.token, expiresAt: session.expiresAt, user: { id: created.user.id, name: created.user.name } });
}
