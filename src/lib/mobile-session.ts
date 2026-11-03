import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";

const SESSION_DAYS = 14;

export function hashMobileToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function hashesMatch(stored: string, presented: string) {
  const left = Buffer.from(stored);
  const right = Buffer.from(presented);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function openMobileSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.mobileSession.create({ data: { userId, tokenHash: hashMobileToken(token), expiresAt } });
  return { token, expiresAt: expiresAt.toISOString() };
}

export async function userForMobileToken(token: string) {
  if (!token) return null;
  const hash = hashMobileToken(token);
  const session = await db.mobileSession.findUnique({ where: { tokenHash: hash }, include: { user: { include: { classGrade: true } } } });
  if (!session || session.revokedAt || session.expiresAt.getTime() <= Date.now()) return null;
  if (!hashesMatch(session.tokenHash, hash)) return null;
  return session.user;
}

export async function revokeMobileToken(token: string) {
  if (!token) return;
  await db.mobileSession.updateMany({ where: { tokenHash: hashMobileToken(token), revokedAt: null }, data: { revokedAt: new Date() } });
}

export function bearerToken(request: Request) {
  const header = request.headers.get("authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}
