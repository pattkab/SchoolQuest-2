import { lookup } from "dns/promises";
import { isIP } from "net";

const BLOCKED_HOSTS = new Set(["localhost", "localhost.localdomain", "metadata.google.internal"]);

export function isPrivateAddress(address: string) {
  const value = address.toLowerCase().replace(/^\[|\]$/g, "");
  if (value === "::1" || value === "::" || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe80")) return true;
  const parts = value.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false;
  const [a, b] = parts;
  if (a === 0 || a === 10 || a === 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  return false;
}

export function assertPublicHttpsUrl(input: string) {
  const url = new URL(input.trim());
  if (url.protocol !== "https:") throw new Error("Use an https link.");
  if (url.username || url.password) throw new Error("That link is not allowed.");
  const host = url.hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(host) || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new Error("That link is not allowed.");
  }
  if (isIP(host) && isPrivateAddress(host)) throw new Error("That link is not allowed.");
  return url;
}

export async function assertPublicResolution(url: URL) {
  const records = await lookup(url.hostname, { all: true, verbatim: true });
  if (records.length === 0 || records.some((record) => isPrivateAddress(record.address))) {
    throw new Error("That link is not allowed.");
  }
}
