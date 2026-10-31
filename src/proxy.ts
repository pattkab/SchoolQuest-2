import { auth } from "@/auth";

const PUBLIC_PREFIXES = ["/", "/login", "/register", "/api"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isPublic = PUBLIC_PREFIXES.some((prefix) =>
    prefix === "/" ? pathname === "/" : pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isPublic) {
    if (req.auth && (pathname === "/login" || pathname.startsWith("/register"))) {
      return Response.redirect(new URL("/dashboard", req.nextUrl));
    }
    return null;
  }

  if (!req.auth && (pathname.startsWith("/dashboard") || pathname.startsWith("/setup"))) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
