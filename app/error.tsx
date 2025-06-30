"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 space-y-6 text-center border border-muted-foreground/20 rounded-lg">
        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-medium">Something went wrong</h2>
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>

        <div className="flex flex-col space-y-3">
          <Button 
            variant="outline" 
            onClick={() => reset()}
            className="w-full"
          >
            Try Again
          </Button>
         
        </div>
      </div>
    </div>
  );
}