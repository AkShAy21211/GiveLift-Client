import Image from "next/image";
import React from "react";
import { MapPin, Users } from "lucide-react";

interface DisasterCardProps {
  disasterName: string;
  imageUrl: string | null;
  className: string;
  imageClass: string;
  servirity: string;
}

enum SERVIRITY {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
function DisasterCard({
  disasterName,
  imageUrl,
  className,
  imageClass,
  servirity,
}: DisasterCardProps) {
  return (
    <div className={className}>
      <Image
        alt={disasterName}
        className={imageClass}
        src={imageUrl as string}
      />
      <h2 className="overflow-x-clip  font-normal mt-1 ">
        {disasterName.slice(0,65)}
        <span
          title={"Servirity " + servirity}
          aria-label={"Servirity: " + servirity}
          className={`inline-block w-3 h-3 ${
            servirity === SERVIRITY.HIGH
              ? "bg-red-500"
              : servirity === SERVIRITY.MEDIUM
              ? "bg-orange-500"
              : servirity === SERVIRITY.LOW
              ? "bg-yellow-500"
              : ""
          } rounded-full ml-2 animate-pulse`}
        ></span>
      </h2>
      <p className="flex  justify-between items-center gap-1 mt-1 font-semibold">
        <span
          aria-label="District"
          className="flex justify-center items-center gap-1"
        >
       
          <MapPin className="w-4 h-4 font-extralight" /> Kannur
        </span>
        <span
          aria-label="People effected"
          className="flex justify-center items-center gap-1 font-semibold"
        >
          <Users className="w-4 h-4 font-extralight ml-1" /> 20
        </span>
      </p>
    </div>
  );
}

export default DisasterCard;
