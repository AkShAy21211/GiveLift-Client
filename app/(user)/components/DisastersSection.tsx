import React from "react";
import { DisasterReport } from "@/lib/types";
import DisasterCard from "./DisasterCard";
import DisastersSectionHeader from "./DisastersSectionHeader";

interface DisastersSectionProps {
  disasters?: DisasterReport[];
}

const DisastersSection: React.FC<DisastersSectionProps> = ({ disasters }) => {
  
  return (
    <div className="space-y-4">
      <DisastersSectionHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {disasters&&disasters?.map((disaster: DisasterReport) => (
          <DisasterCard key={disaster._id} disaster={disaster} />
        ))}
      </div>
    </div>
  );
};

export default DisastersSection;