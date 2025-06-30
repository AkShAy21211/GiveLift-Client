"use client";

import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border border-muted-foreground/20">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl font-medium">Unauthorized Access</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground">
            You don't have permission to view this page.
          </p>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full max-w-xs mx-auto">
              Return to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}