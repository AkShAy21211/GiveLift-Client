import React from "react";
import Image from "next/image"
import {  MapPin } from "lucide-react";
interface DisasterCardProps {
    title: string;
    imageUrl: string;
    status: string;
    severity: string;
};

function DisasterCard({ title, imageUrl, status, severity }:DisasterCardProps) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden w-full md:w-96 lg:w-72 bg-white">
      <Image
        src={imageUrl}
        alt={title}
        width={320}
        height={180}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-normal flex items-center space-x-2 text-nowrap  overflow-hidden">
          <span><MapPin /></span>
          <span>{title}</span>
        </h3>
        <div className="flex justify-between text-sm mt-2">
          <span className="font-medium">
            status: <span className="text-green-600">{status}</span>
          </span>
          <span className="font-medium">
            severity: <span className="text-red-600">{severity}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
export default DisasterCard;
