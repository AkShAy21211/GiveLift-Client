"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { useRouter } from "next/navigation";

const AntiMisinformationSection = () => {
  const router = useRouter();

  const handleReportRumor = () => {
    router.push("/report-rumor");
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-red-100 p-3 rounded-full">
            <Flag className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-red-800">
          Help Stop Misinformation
        </h3>
        <p className="text-red-700 max-w-2xl mx-auto">
          Encountered suspicious information about disasters or emergencies? 
          Report it to help keep our community safe and informed.
        </p>
        <Button 
          size="lg" 
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl"
          onClick={handleReportRumor}
        >
          <Flag className="w-5 h-5 mr-2" />
          Report Rumor
        </Button>
      </div>
    </div>
  );
};

export default AntiMisinformationSection;