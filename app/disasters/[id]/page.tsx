import React from "react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import ImageSlider from "@/components/ui/ImageSlider";
import { getDisasterById } from "@/lib/api/disaster";
import { Disaster } from "@/lib/types";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

async function fetchDisasterData(id: string) {
  const response = await getDisasterById(id);
  return response.data as Disaster;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await fetchDisasterData(params.id); // Fetch data once
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function DisasterDetails({ params }: Props) {
  const disasterData = await fetchDisasterData(params.id);

  return (
    <div className=" mx-auto p-4 mt-20">
      {/* Image Slider */}
      <ImageSlider images={disasterData.media} />
      {/* Disaster Info */}
      <h1 className="text-2xl font-bold mt-4">{disasterData.title}</h1>
      <p className="text-gray-600 text-xl font-semibold mt-2">{disasterData.description}</p>
      <div className="flex items-center gap-4 mt-2">
        <span className="text-green-600 font-semibold">
          Status: {disasterData.status?"Active":""}
        </span>
        <span className="text-orange-500 font-semibold">
          Severity: {disasterData.severity}
        </span>
      </div>

      {/* Resources Needed */}
      {/* <h2 className="text-xl font-semibold mt-6">Resources Needed</h2>
      <div className="mt-2 bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-4 font-semibold">
          <span>Type</span> <span>Quantity</span> <span>Cost</span>
        </div>
        {disasterData.resources.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 mt-2 border-b pb-2"
          >
            <span>{item.type}</span>
            <span>{item.quantity}</span>
            <span>{item.cost}</span>
          </div>
        ))}
      </div> */}

      {/* Reporter Info */}
      {/* <h2 className="text-xl font-semibold mt-6">Reported By</h2> */}
      {/* <div className="flex items-center gap-3 mt-2">
        <img
          src={disasterData.reporter.avatar}
          alt="Reporter"
          className="w-10 h-10 rounded-full"
        />
        <span className="font-medium">{disasterData.reporter.name}</span>
      </div> */}

      {/* Donation Section */}
      {/* <h2 className="text-xl font-semibold mt-6">Donation</h2>
      <p className="text-gray-600 mt-2">
        Help us reach our goal and show the world that kindness matters.
      </p>
      <Progress
        value={
          (disasterData.donation.current / disasterData.donation.goal) * 100
        }
        className="mt-2"
      />
      <div className="flex justify-between mt-2 text-sm">
        <span>${disasterData.donation.current}</span>
        <span>${disasterData.donation.goal}</span>
      </div>
      <div className="mt-4">
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded w-1/2"
        />
        <Button className="ml-2 bg-green-500 text-white">Donate</Button>
      </div> */}
    </div>
  );
}
