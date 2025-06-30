"use client";
import { ROLES } from "@/lib/types";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function NotFound() {
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
      {/* Simple, elegant title */}
      <div className="relative mb-8">
        <h2 className="text-5xl md:text-6xl font-medium text-foreground/90">
          404
        </h2>
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-muted-foreground/20 rounded-full"></div>
      </div>

      {/* Subtitle */}
      <p className="mt-2 text-lg md:text-xl text-muted-foreground text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Home Button */}
      <Link
        href={
          role === ROLES.STATE_COORDINATOR
            ? "/state-coordinator/dashboard"
            : "/"
        }
        className="mt-8 px-6 py-3 border border-muted-foreground/30 rounded-lg font-medium transition-colors hover:bg-muted"
      >
        Return Home
      </Link>

      {/* Optional decorative elements */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 bg-muted-foreground rounded-full"
          ></div>
        ))}
      </div>
    </div>
  );
}
