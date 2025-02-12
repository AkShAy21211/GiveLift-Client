import DonationSkeleton from "@/app/components/skleton/DonationSkeleton";
import dynamic from "next/dynamic";
import React from "react";

const Donations = dynamic(() => import("../../components/card/Donations"), {
  ssr: true,
  loading: () => <DonationSkeleton />,
});

async function page() {
  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">My donations</h2>
      <Donations />
    </div>
  );
}

export default page;
