import { Metadata } from "next";
import Image from "next/image";
import heroImage from "@/app/assests/images/hero.jpeg";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { DisasterSkeletonCard, Skeleton } from "@/components/ui/skeleton";
import LatestReport from "@/components/ui/LatestReport";

export const metadata: Metadata = {
  title: "GiveLift",
  description: "A platform to help disaster-affected areas",
  keywords: ["disaster relief", "give lift", "help needed"],
};

export default function Home() {
  return (
    <div className="h-auto w-full">
      <section
        id="hero"
        aria-label="Hero section"
        className="relative p-6 flex flex-col items-center justify-center h-screen"
      >
        {/* Background Image */}
        <Image
          src={heroImage}
          priority={false}
          alt="Disaster Relief Effort"
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Hero Content */}
        <div className="relative text-center text-white z-10">
          <h1 className=" text-5xl md:text-7xl flex-wrap font-bold">
            Together, we rise
          </h1>
          <div className="flex flex-col md:flex-row gap-4 mt-6  items-center">
            
            <Button
              aria-label="Join as Volunteer"
              className="bg-blue-600 hover:bg-blue-700 px-6 w-52 h-12 text-lg"
            >
              Join as Volunteer
            </Button>
          </div>
        </div>
      </section>

      <>
        <h2 className="px-6 mt-5 text-lg text-gray-600 font-serif">
          Latest Reports
        </h2>
        <section
          aria-label="Latest Reports"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 gap-5 mt-3 mb-5"
        >
          <Suspense
            fallback={<DisasterSkeletonCard className="w-full " count={4} />}
          >
            <LatestReport />
          </Suspense>
        </section>
      </>
    </div>
  );
}
