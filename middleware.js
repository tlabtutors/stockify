import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { nextUrl, cookies } = req;
  const pathname = nextUrl.pathname;

  // Skip API and static files
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Get token from next-auth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;
  const companyId = token?.companyId || token?.user?.companyId;

  // Redirect logged-in users from auth routes and home to dashboard
  const isAuthRoute = pathname.startsWith("/auth");
  const isPublicHome = pathname === "/";
  // Protect all dashboard routes
  const isDashboardRoute = pathname.startsWith("/dashboard");
console.log("Dashboard Route: ", isDashboardRoute);
console.log("LOGIN STATUS: ", isLoggedIn);

  if (isLoggedIn && (isAuthRoute || isPublicHome)) {
    const lastVisited = cookies.get("last_route")?.value;
    if (lastVisited) {
      return NextResponse.redirect(new URL(lastVisited, req.url));
    }
    return NextResponse.redirect(
      new URL(companyId ? `/dashboard/home` : "/dashboard/home", req.url)
    );
  }

  // Redirect from /dashboard to /dashboard/home
  if (isLoggedIn && pathname === "/dashboard") {
    return NextResponse.redirect(new URL(`/dashboard/home`, req.url));
  }

  if (isDashboardRoute && !isLoggedIn) {
    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.set("last_route", pathname, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    return response;
  }

  // Additional company route protection
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
