"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Eye, Heart } from "lucide-react";
import { DisasterReport } from "@/lib/types";
import { useRouter } from "next/navigation";

interface DisasterCardProps {
  disaster: DisasterReport;
}

const DisasterCard: React.FC<DisasterCardProps> = ({ disaster }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/disasters/${disaster._id}`);
  };

  const handleHelp = () => {
    router.push(`/disasters/${disaster._id}/help`);
  };

  return (
    <Card
      className={`border-l-4 hover:shadow-lg transition-shadow ${
        disaster.severity === "high"
          ? "border-l-red-500"
          : disaster.severity === "moderate"
          ? "border-l-yellow-500"
          : "border-l-green-500"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold text-gray-900">
            {disaster.disasterType} at {disaster.address.label}
          </CardTitle>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{disaster.address.label}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <CardDescription className="text-sm text-gray-600 leading-relaxed">
          {disaster.description}
        </CardDescription>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className={`px-2 py-1 text-xs capitalize ${
                disaster.severity === "high"
                  ? "bg-red-100 text-red-600"
                  : disaster.severity === "moderate"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {disaster.severity} severity
            </Badge>

            <Badge
              variant="outline"
              className={`px-2 py-1 text-xs capitalize ${
                disaster.status === "reported"
                  ? "bg-orange-100 text-orange-600"
                  : disaster.status === "verified"
                  ? "bg-yellow-100 text-yellow-600"
                  : disaster.status === "in_progress"
                  ? "bg-blue-100 text-blue-600"
                  : disaster.status === "resolved"
                  ? "bg-green-100 text-green-600"
                  : disaster.status === "closed"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {disaster.status.replaceAll("_", " ")}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">
              {new Date(disaster.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        {disaster.resourcesNeeded?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {disaster.resourcesNeeded.map((resource, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs"
              >
                {resource}
              </Badge>
            ))}
          </div>
        )}

        <div className="pt-2 flex space-x-2">
          <Button
            size="sm"
            className="bg-[#1A5F7A] hover:bg-[#134152] text-white flex-1"
            onClick={handleViewDetails}
          >
            <Eye className="w-3 h-3 mr-1" />
            View Details
          </Button>
          {/* <Button
            size="sm"
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50"
            onClick={handleHelp}
          >
            <Heart className="w-3 h-3 mr-1" />
            Help
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default DisasterCard;