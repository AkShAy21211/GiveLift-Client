
import React, { Suspense } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import DisasterCardSkeleton from "../skleton/DisasterCardSkeleton";
import { getAllDisasters } from "@/libs/api/disaster";



async function DisasterCard() {

  const { disasters } = await getAllDisasters(4);

  return (
    <>
        {disasters.map((disaster:any) => (
        <div

          key={disaster._id} // ✅ Add key prop
          className="border rounded-lg shadow-md overflow-hidden w-full md:w-96 lg:w-72 bg-white"
        >
          <Image
            src={'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            alt={disaster.title}
            width={320}
            height={180}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-normal flex items-center space-x-2 text-nowrap overflow-hidden">
              <span>
                <MapPin />
              </span>
              <span>{disaster.title}</span>
            </h3>
            <div className="flex justify-between text-sm mt-2">
              <span className="font-medium">
                Status:{" "}
                <span className="text-green-600">
                  {disaster.status ? "Active" : "Inactive"}
                </span>
              </span>
              <span className="font-medium">
                Severity: <span className="text-red-600">{disaster.severity}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default DisasterCard;
