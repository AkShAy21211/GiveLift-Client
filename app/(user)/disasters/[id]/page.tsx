"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Calendar, AlertTriangle, Users, Package } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DisasterReport } from "@/lib/types";
import { getSeverityColor, getStatusColor } from "@/lib/utils";
import { getDisasterById } from "../../api";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

interface DisasterViewProps {
  disasterData?: DisasterReport;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Sample disaster data
const sampleDisaster: DisasterReport = {
  _id: "687d9b21a853dc08a7a56f61",
  address: {
    coordinates: [12.3381875, 76.61936],
    label:
      "222, High Tension Double Rd, Mahadeswara Badavane, Vijayanagar 1st Stage, Vijayanagar, Mysuru, Karnataka 570017, India",
    type: "Point",
  },
  createdAt: "2025-07-21T01:42:57.265Z",
  description: "This is demo",
  disasterType: "Landslide",
  districtId: "6863937e456715e5872a157b",
  reportedBy: "6879ca9d3816f488cc4e8cae",
  resourcesNeeded: [
    "Transportation",
    "Communication Equipment",
    "Clothing and Blankets",
    "Emergency Personnel",
    "Blood Donations",
  ],
  severity: "moderate",
  status: "verified",
  updatedAt: "2025-07-21T18:28:40.044Z",
  volunteersAssigned: [],
};

const DisasterView: React.FC<DisasterViewProps> = ({}) => {
  const { id } = useParams();

  const [disasterData, setDisasterData] = useState<DisasterReport>();

  useEffect(() => {
    async function fetchDisasterData() {
      const response = await getDisasterById(id as string);
      setDisasterData(response.data as DisasterReport);
    }
    fetchDisasterData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Early return if no disaster data is available
  if (!disasterData) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Disaster Not Found
          </h2>
          <p className="text-gray-500">
            The requested disaster information could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const [lat, lng] = disasterData.address.coordinates;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {disasterData.disasterType}
          </h1>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(
                disasterData.severity
              )}`}
            >
              {disasterData.severity.charAt(0).toUpperCase() +
                disasterData.severity.slice(1)}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                disasterData.status
              )}`}
            >
              {disasterData.status.charAt(0).toUpperCase() +
                disasterData.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-5 h-5 mr-2" />
          <span className="text-sm">
            {disasterData.address?.label || "Location not available"}
          </span>
        </div>

        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span className="text-sm">
            Reported on {formatDate(disasterData.createdAt as string)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Details */}
        <div className="space-y-6">
          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {disasterData.description}
            </p>
          </div>

          {/* Resources Needed */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-500" />
              Resources Needed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {disasterData.resourcesNeeded?.map((resource, index) => (
                <div
                  key={index}
                  className="bg-white rounded-md px-3 py-2 text-sm border border-gray-200"
                >
                  {resource}
                </div>
              )) || (
                <p className="text-gray-500 text-sm">No resources specified</p>
              )}
            </div>
          </div>

          {/* Volunteers */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-500" />
              Volunteers Assigned
            </h2>
            {disasterData.volunteersAssigned &&
            disasterData?.volunteersAssigned?.length > 0 ? (
              <div className="space-y-2">
                {disasterData.volunteersAssigned.map((volunteer, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-md px-3 py-2 text-sm border border-gray-200"
                  >
                    Volunteer ID: {volunteer}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No volunteers assigned yet
              </p>
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">
              Additional Information
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Disaster ID:</span>
                <span className="font-mono text-xs">{disasterData._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">District ID:</span>
                <span className="font-mono text-xs">
                  {disasterData.districtId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reported By:</span>
                <span className="font-mono text-xs">
                  {disasterData.reportedBy}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="text-xs">
                  {formatDate(disasterData.updatedAt as string)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="lg:sticky lg:top-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200">
              <MapContainer
                center={[lat, lng]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg">
                        {disasterData.disasterType}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {disasterData.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {disasterData.address.label}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Coordinates Info */}
            <div className="mt-4 p-3 bg-white rounded border border-gray-200">
              <div className="text-sm text-gray-600">
                <strong>Coordinates:</strong> {lat}, {lng}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterView;
