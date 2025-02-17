"use client"
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br   px-6">
      {/* Glitch Effect Title */}
      <h2 className="text-5xl md:text-6xl font-extrabold text-red-500 relative glitch">
        404 - Not Found
      </h2>

      {/* Subtitle */}
      <p className="mt-4 text-lg md:text-xl  text-center">
        Oops! The page you're looking for vanished into cyberspace.
      </p>

      {/* Home Button */}
      <Link
        href="/"
        className="mt-6 px-6 py-3  font-semibold rounded-lg  transition duration-300 transform hover:scale-105 floating-btn text-blue-500"
      >
        Return Home
      </Link>

      {/* Add some glitch effect */}
      <style jsx>{`
        @keyframes glitch {
          0% { text-shadow: 2px 2px 0px rgba(255, 0, 0, 0.8), -2px -2px 0px rgba(0, 255, 255, 0.8); }
          25% { text-shadow: -2px -2px 0px rgba(255, 0, 0, 0.8), 2px 2px 0px rgba(0, 255, 255, 0.8); }
          50% { text-shadow: 2px -2px 0px rgba(255, 0, 0, 0.8), -2px 2px 0px rgba(0, 255, 255, 0.8); }
          75% { text-shadow: -2px 2px 0px rgba(255, 0, 0, 0.8), 2px -2px 0px rgba(0, 255, 255, 0.8); }
          100% { text-shadow: 2px 2px 0px rgba(255, 0, 0, 0.8), -2px -2px 0px rgba(0, 255, 255, 0.8); }
        }
        
        .glitch {
          animation: glitch 0.6s infinite alternate;
        }

        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }

        .floating-btn {
          animation: floating 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
