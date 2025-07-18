"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Flag, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  const handleReportDisaster = () => {
    router.push("/report-disaster");
  };

  const handleReportRumor = () => {
    router.push("/report-rumor");
  };

  const handleMakeDonation = () => {
    router.push("/donate");
  };

  return (
    <div className="bg-gradient-to-r from-[#1A5F7A] to-[#134152] text-white rounded-2xl p-8">
      <div className="text-center space-y-4">
        <p className="text-xl text-blue-100">
          Report incidents, help your community, and stay informed
        </p>
        
        {/* Primary CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button 
            size="lg" 
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
            onClick={handleReportDisaster}
          >
            <Plus className="w-5 h-5 mr-2" />
            Report Disaster
          </Button>
          
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
            onClick={handleReportRumor}
          >
            <Flag className="w-5 h-5 mr-2" />
            Report Rumor
          </Button>
          
          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
            onClick={handleMakeDonation}
          >
            <Heart className="w-5 h-5 mr-2" />
            Make Donation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;