import React from "react";
import DisasterCard from "./DisasterCard";
import { getAllDisasters } from "@/lib/api/disaster";
import heroImage from "@/app/assests/images/hero.jpeg";
import { DisasterReport } from "@/lib/types";

async function fetchLatestDisasters() {
  const response = await getAllDisasters(4);
  return response.data;
}
async function LatestReport() {
  const respoonse = await fetchLatestDisasters();
  return (
    <>
      {respoonse.disasters.map((disaster: DisasterReport) => (
        <DisasterCard
          key={disaster._id}
          disasterName={disaster.description}
          servirity={disaster.severity.toLowerCase()}
          imageUrl={heroImage as any}
          className={
            " shadow-md  overflow-hidden p-3 hover:scale-105 duration-150 cursor-pointer"
          }
          imageClass={" "}
        />
      ))}
    </>
  );
}

export default LatestReport;
