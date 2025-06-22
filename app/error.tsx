"use client";

import React from "react";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-red-600 text-xl font-semibold">Something went wrong!</h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()} // ✅ Reset the error boundary
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Try Again
      </button>
    </div>
  );
}

export default Error;
