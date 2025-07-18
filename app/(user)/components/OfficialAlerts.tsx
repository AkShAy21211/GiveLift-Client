"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const OfficialAlerts = () => {
  const router = useRouter();

  const handleViewAlerts = () => {
    router.push("/alerts");
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
      <div className="flex items-start space-x-3">
        <Shield className="w-6 h-6 text-yellow-600 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-yellow-800">Official Alerts</h3>
          <p className="text-yellow-700 mt-1">
            Stay updated with verified information from local authorities
          </p>
          <Button
            variant="outline"
            className="mt-3 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
            onClick={handleViewAlerts}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            View All Official Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfficialAlerts;