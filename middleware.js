import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { privateRoutes } from "./routes";

export async function middleware(req) {
  const { nextUrl, cookies } = req;
  const pathname = nextUrl.pathname;

  // Skip API and static files
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Get token from next-auth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("JWT token:", token);
  const isLoggedIn = !!token;
  const companyId = token?.companyId || token?.user?.companyId;

  const isAuthRoute = pathname.startsWith("/auth");
  const isPublicHome = pathname === "/";
  if (isLoggedIn && (isAuthRoute || isPublicHome)) {
    const lastVisited = cookies.get("last_route")?.value;
    if (lastVisited) {
      return NextResponse.redirect(new URL(lastVisited, req.url));
    }
    return NextResponse.redirect(
      new URL(companyId ? `/dashboard/home` : "/dashboard/home", req.url)
    );
  }
  if (isLoggedIn && pathname === "/dashboard") {
    return NextResponse.redirect(new URL(`/dashboard/home`, req.url));
  }

  const isProtected = privateRoutes.some((route) => pathname.startsWith(route));
  if (!isLoggedIn && isProtected) {
    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.set("last_route", pathname, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    return response;
  }

  if (pathname.startsWith("/company/")) {
    const pathCompanyId = pathname.split("/")[2];
    if (!isLoggedIn || !companyId || companyId !== pathCompanyId) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // all except static/_next
    "/", // public home
  ],
};
