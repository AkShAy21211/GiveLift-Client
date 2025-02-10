import Hero from "./components/hero/Hero";
import DisasterCard from "./components/card/DisasterCard";
import { Metadata } from "next";
import { Suspense } from "react";
import DisasterCardSkeleton from "./components/skleton/DisasterCardSkeleton";

export const metadata: Metadata = {
  title: "GiveLift",
  description: "A platform to help disaster-affected areas",
  keywords: ["disaster relief", "give lift", "help needed"],
};

export default async function Home() {
  // ✅ Fetch disasters in the parent (Server Component)

  return (
    <main className="h-auto w-full">
      {/* Hero Section */}
      <Hero />

      {/* Disaster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 justify-items-center mt-10">
        <Suspense fallback={<DisasterCardSkeleton />}>
          <DisasterCard />
        </Suspense>
      </div>
    </main>
  );
}
