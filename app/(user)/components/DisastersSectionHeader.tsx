"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { useRouter } from "next/navigation";

const DisastersSectionHeader = () => {
  const router = useRouter();

  const handleViewAll = () => {
    router.push("/disasters");
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">
        Active Disasters in Your Area
      </h2>
      <Button
        variant="outline"
        className="flex items-center space-x-2"
        onClick={handleViewAll}
      >
        <List className="w-4 h-4" />
        <span>View All Disasters</span>
      </Button>
    </div>
  );
};

export default DisastersSectionHeader;