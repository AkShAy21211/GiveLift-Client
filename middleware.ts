import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface CurrentUser {
  token: string;
  role: string; 
}
export function middleware(request: NextRequest) {
  let currentUser: CurrentUser | null = null;
  const cookie = request.cookies.get("currentUser")?.value;

  if (cookie) {
    try {
      currentUser = JSON.parse(cookie);      
    } catch (e) {
      console.warn("Invalid cookie data:", e);
      currentUser = null;
    }
  }

  const isAuthenticated = !!currentUser; // Check if user data exists
  const { pathname } = request.nextUrl; // Extract pathname

  // User authentication rules
  if (!pathname.startsWith("/state-coordinator")) {
    if (
      isAuthenticated &&
      (pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/forgot-password" ||
        pathname === "/reset-password")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (
      !isAuthenticated &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/forgot-password" &&
      pathname !== "/reset-password"
    ) {
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect unauthenticated users to sign-in
    }
  }

  // Admin authentication rules
  if (pathname.startsWith("/state-coordinator")) {
    if (isAuthenticated && pathname === "/login") {
      return NextResponse.redirect(
        new URL("/state-coordinator/dashboard", request.url)
      ); // Redirect authenticated admin away from login
    }
    if (!isAuthenticated && pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect unauthenticated admins to sign-in
    }
  }

  return NextResponse.next(); // Allow request if no redirect is needed
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/state-coordinator/:path*",
  ], // Match all paths except for API routes
};
