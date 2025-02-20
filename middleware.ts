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

  const isAuthenticated = !!userData; // Check if user data exists
  const role: string = userData?.role;
  const { pathname } = request.nextUrl; // Extract pathname

  // User authentication rules
  if (!pathname.startsWith("/admin")) {
    if (
      isAuthenticated &&
      (pathname === "/sign-in" || pathname === "/sign-up")
    ) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect authenticated users away from auth pages
    }
    if (
      !isAuthenticated &&
      pathname !== "/sign-in" &&
      pathname !== "/sign-up"
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url)); // Redirect unauthenticated users to sign-in
    }
  }

  // Admin authentication rules
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url)); // Redirect non-admins to dashboard if trying to access admin routes  (replace "/admin/dashboard" with your desired redirect path)  // Ensure to replace "/admin/dashboard" with your actual admin dashboard route path.  // Replace "/admin/:path*" with the actual admin routes you want to protect.  // Be sure to include all the routes you want to protect in the "matcher" array.  // Also, make sure to replace "/sign-in" and "/sign-up" with your actual sign-in and sign-up routes.  // If you want to redirect authenticated users to the dashboard, replace "/admin/dashboard" with your desired redirect path.  // Ensure to replace "/admin/dashboard" with your actual admin dashboard route path.  // Replace "/admin/:path*" with the actual admin routes you want to protect.  // Be sure to include all
    }
    if (isAuthenticated && pathname === "/admin/sign-in") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url)); // Redirect authenticated admin away from login
    }
    if (!isAuthenticated && pathname !== "/admin/sign-in") {
      return NextResponse.redirect(new URL("/admin/sign-in", request.url)); // Redirect unauthenticated admins to sign-in
    }
  }

  return NextResponse.next(); // Allow request if no redirect is needed
}

export const config = {
  matcher: ["/:path", "/admin/:path*"], // Protect specific routes
};
