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
import { MapPin, Clock, Droplets } from "lucide-react";
import { Metadata } from "next";
import { DisasterReport } from "@/lib/types";
import { headers } from "next/headers";
import { createSSRApi } from "@/lib/api/server";
import WeatherAleart from "../components/WeatherAleart";

export const metadata: Metadata = {
  title: "Home",
};

export async function getDisasters(header: Headers) {
  try {
    const api = await createSSRApi(header);
    const response = await api.get("/disaster?status=verified");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function Home() {
  const headerConfig = await headers();
  const disasters = await getDisasters(headerConfig);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Weather Alert */}
        <WeatherAleart />
        {/* Disasters Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Disasters Reported
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disasters?.map((disaster: DisasterReport) => (
              <Card
                key={disaster._id}
                className={`border-l-4 ${
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

                  <div className="pt-2">
                    <Button
                      size="sm"
                      className="bg-[#1A5F7A] hover:bg-[#134152] text-white"
                    >
                      <Droplets className="w-3 h-3 mr-1" />
                      See More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
