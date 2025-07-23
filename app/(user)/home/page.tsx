import React from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { createSSRApi } from "@/lib/api/server";
import WeatherAleart from "../components/WeatherAleart";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import OfficialAlerts from "../components/OfficialAlerts";
import AntiMisinformationSection from "../components/AntiMisinformationSection";
import DisastersSection from "../components/DisastersSection";

export const metadata: Metadata = {
  title: "Home",
};

export async function getDisasters(header: Headers) {
  try {
    const api = await createSSRApi(header);
    const response = await api.get("/disasters?status=verified");    
    return response.data.disasters;
  } catch (error) {
    console.log(error);
  }
}

async function Home() {
  const headerConfig = await headers();
  const disasters = await getDisasters(headerConfig);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Weather Alert */}
        <WeatherAleart />

        {/* Hero Section */}
        <HeroSection />

        {/* Feature Cards */}
        <FeatureCards disasterCount={disasters?.length || 0} />

        {/* Official Alerts */}
        <OfficialAlerts />

        {/* Anti-Misinformation Section */}
        <AntiMisinformationSection />

        {/* Disasters Section */}
        <DisastersSection disasters={disasters} />
      </div>
    </div>
  );
}

export default Home;