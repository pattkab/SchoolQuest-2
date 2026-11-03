/** What the service worker is allowed to store. Private pages stay on the network. */

export const SHELL_CACHE = "schoolquest-shell-v1";
export const SHELL_PATHS = ["/offline.html", "/offline-exam.html", "/icon-192.png"] as const;

const PRIVATE_PREFIXES = ["/dashboard", "/api", "/login", "/register", "/setup"];

export function isPrivatePath(pathname: string) {
  return PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function mayCachePath(pathname: string, method = "GET") {
  if (method !== "GET") return false;
  if (isPrivatePath(pathname)) return false;
  return (SHELL_PATHS as readonly string[]).includes(pathname);
}
