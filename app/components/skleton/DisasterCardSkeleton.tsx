import React from "react";

function DisasterCardSkeleton() {
  return (
    <>
      <div className="border rounded-lg shadow-md overflow-hidden w-full md:w-96 lg:w-72 bg-white animate-pulse">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
        <div className="flex justify-between mt-2">
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
    <div className="border rounded-lg shadow-md overflow-hidden w-full md:w-96 lg:w-72 bg-white animate-pulse">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
        <div className="flex justify-between mt-2">
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
    <div className="border rounded-lg shadow-md overflow-hidden w-full md:w-96 lg:w-72 bg-white animate-pulse">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
        <div className="flex justify-between mt-2">
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
    <div className="border rounded-lg shadow-md overflow-hidden w-full md:w-96 lg:w-72 bg-white animate-pulse">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
        <div className="flex justify-between mt-2">
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
    </>
  );
}

export default DisasterCardSkeleton;
