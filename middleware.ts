import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("currentUser");

  let userData = null;
  if (cookie?.value) {
    try {
      userData = JSON.parse(cookie.value);
    } catch (error) {
      console.error("Error parsing cookie:", error);
    }
  }

  const isAuthenticated = !!userData; // Ensure valid user data exists
  const { pathname } = request.nextUrl; // Extract pathname

  console.log(
    `Middleware triggered: ${pathname}, Authenticated: ${isAuthenticated}`
  );

  // 🔒 If authenticated, prevent access to `/sign-in` and `/sign-up`
  if (isAuthenticated && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to dashboard
  }

  // 🔐 If NOT authenticated, prevent access to protected routes
  if (!isAuthenticated && pathname !== "/sign-in" && pathname !== "/sign-up") {
    return NextResponse.redirect(new URL("/sign-in", request.url)); // Redirect to login
  }

  return NextResponse.next(); // Allow request if no redirect is needed
}

export const config = {
  matcher: ["/", "/profile", "/settings", "/sign-in", "/sign-up"], // Protect specific routes
};
