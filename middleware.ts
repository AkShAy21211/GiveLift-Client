import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLES } from "./lib/types";

interface CurrentUser {
  token: string;
  role: string;
}

const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

// Default dashboards for each role
const DASHBOARD_PATHS: Record<string, string> = {
  [ROLES.GENERAL_USER]: "/",
  [ROLES.DISTRICT_COORDINATOR]: "/district/dashboard",
  [ROLES.STATE_COORDINATOR]: "/state/dashboard",
};

// Hierarchical access (higher roles can access lower role routes too)
const ROLE_ACCESS_PREFIXES: Record<string, string[]> = {
  [ROLES.GENERAL_USER]: ["/"],
  [ROLES.DISTRICT_COORDINATOR]: ["/", "/district"],
  [ROLES.STATE_COORDINATOR]: ["/", "/district", "/state"],
};

function isPublicPath(path: string) {
  return PUBLIC_PATHS.includes(path);
}

function getCurrentUser(request: NextRequest): CurrentUser | null {
  const cookie = request.cookies.get("currentUser")?.value;
  
  if (!cookie) return null;

  try {
    return JSON.parse(cookie);
  } catch (e) {
    console.warn("Invalid cookie data:", e);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const currentUser = getCurrentUser(request);
  const isAuthenticated = !!currentUser;

  // 🚫 Unauthenticated trying to access protected page
  if (!isAuthenticated && !isPublicPath(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Authenticated but trying to access public page (redirect to dashboard)
  if (isAuthenticated && isPublicPath(pathname)) {
    const dashboardPath = DASHBOARD_PATHS[currentUser.role];
    return NextResponse.redirect(new URL(dashboardPath || "/", request.url));
  }

  // 🔐 Authenticated and trying to access protected path
  if (isAuthenticated) {
    const allowedPrefixes = ROLE_ACCESS_PREFIXES[currentUser.role] || [];
    const isAllowed = allowedPrefixes.some(prefix => pathname.startsWith(prefix));

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

// Define all protected matchers
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/state/:path*",
    "/district/:path*",
  ],
};
