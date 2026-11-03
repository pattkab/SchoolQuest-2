import { createPublicKey, verify } from "node:crypto";
import { firebaseConfig } from "./firebase";

type GoogleAccount = { email: string; name: string; image: string | null };

const certificates = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

export function googlePhoto(value: unknown) {
  try {
    const url = new URL(String(value || ""));
    const host = url.hostname;
    const allowed = host === "googleusercontent.com" || host.endsWith(".googleusercontent.com") || host.endsWith(".ggpht.com");
    if (url.protocol === "https:" && allowed) return url.toString();
  } catch {
    return null;
  }
  return null;
}

function tokenPart(part: string) {
  return JSON.parse(Buffer.from(part, "base64url").toString()) as Record<string, unknown>;
}

export async function accountFromFirebaseToken(idToken: string): Promise<GoogleAccount | null> {
  const parts = idToken.split(".");
  if (parts.length !== 3) return null;
  let header: Record<string, unknown>;
  let payload: Record<string, unknown>;
  try {
    header = tokenPart(parts[0]);
    payload = tokenPart(parts[1]);
  } catch {
    return null;
  }
  const projectId = firebaseConfig.projectId;
  const expires = Number(payload.exp) * 1000;
  const firebase = payload.firebase as { sign_in_provider?: string } | undefined;
  if (payload.aud !== projectId) return null;
  if (payload.iss !== `https://securetoken.google.com/${projectId}`) return null;
  if (!Number.isFinite(expires) || expires < Date.now() - 60_000) return null;
  if (firebase?.sign_in_provider !== "google.com") return null;
  const email = String(payload.email || "");
  if (!email.includes("@")) return null;
  const response = await fetch(certificates);
  if (!response.ok) return null;
  const keys = await response.json() as Record<string, string>;
  const certificate = keys[String(header.kid || "")];
  if (!certificate) return null;
  const valid = verify(
    "RSA-SHA256",
    Buffer.from(`${parts[0]}.${parts[1]}`),
    createPublicKey(certificate),
    Buffer.from(parts[2], "base64url"),
  );
  if (!valid) return null;
  return {
    email,
    name: String(payload.name || "Learner"),
    image: googlePhoto(payload.picture),
  };
}
