import { Donation } from "@/libs/types";
import React from "react";

async function Donations() {
  const donations: Donation[] = Array(5).fill({
    title: "Severe Flood in Area XYZ",
    amount: 5000,
    date: "12/10/2024",
  });

  return (
    <div className="space-y-4">
      {donations.map((donation, index) => (
        <div
          key={index}
          className="border p-4 rounded-md flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{donation.title}</h3>
            <a href="#" className="text-blue-500 text-sm">
              Download receipt
            </a>
          </div>
          <div className="text-green-600 font-bold text-lg">
            {donation.amount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">{donation.date}</div>
        </div>
      ))}
    </div>
  );
}

export default Donations;
