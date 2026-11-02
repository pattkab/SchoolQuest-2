import { createHmac, timingSafeEqual } from "node:crypto";

export const OFFLINE_HOURS = 72;

export type OfflinePass = {
  userId: string;
  paperId: string;
  version: string;
  expiresAt: string;
  token: string;
};

export function offlineExpiry(now: Date, hours = OFFLINE_HOURS) {
  return new Date(now.getTime() + hours * 60 * 60 * 1000);
}

function payload(pass: Pick<OfflinePass, "userId" | "paperId" | "version" | "expiresAt">) {
  return `${pass.userId}|${pass.paperId}|${pass.version}|${pass.expiresAt}`;
}

export function signOfflinePass(pass: Omit<OfflinePass, "token">, secret: string): OfflinePass {
  const token = createHmac("sha256", secret).update(payload(pass)).digest("base64url");
  return { ...pass, token };
}

export function offlinePassSignatureValid(pass: OfflinePass, secret: string) {
  const expected = signOfflinePass(pass, secret).token;
  const left = Buffer.from(pass.token);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function canOpenOfflinePack(pass: Pick<OfflinePass, "expiresAt">, now: Date) {
  return new Date(pass.expiresAt).getTime() > now.getTime();
}

/** A real pass can still upload saved answers after it expires. A forged date cannot. */
export function canSyncOfflinePack(pass: OfflinePass, secret: string) {
  return offlinePassSignatureValid(pass, secret);
}
