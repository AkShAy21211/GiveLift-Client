import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = ''
  const isAuthenticated = !!token; // User is authenticated if token exists
  const { pathname } = request.nextUrl; // Extract pathname

  console.log(`Middleware triggered: ${pathname}, Authenticated: ${isAuthenticated}`);

  // 🔒 If authenticated, prevent access to `/sign-in` and `/sign-up`
  if (isAuthenticated && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to dashboard
  }

  // 🔐 If NOT authenticated, prevent access to protected routes
  if (!isAuthenticated && pathname !== "/sign-in" && pathname !== "/sign-up") {
    return NextResponse.redirect(new URL("/sign-in", request.url)); // Redirect to login
  }

  return NextResponse.next(); // Allow request if it doesn't match any redirect conditions
}

export const config = {
  matcher: ["/", "/profile", "/settings", "/sign-in", "/sign-up"], // Protect specific routes
};
