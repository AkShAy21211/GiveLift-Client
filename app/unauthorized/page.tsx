import React from "react";

function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r ">
      <div className="text-center p-12  bg-opacity-80 rounded-xl  max-w-lg">
        <h1 className="text-4xl font-extrabold  text-black">
          Unauthorized Access
        </h1>
        <p className="mt-4 text-xl text-gray-700">
          You don't have permission to access the page.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r text-blue-500 font-semibold rounded-lg transform hover:scale-105 transition-all duration-300"
          >
            Return to home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
