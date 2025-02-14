import React from "react";

function TableSkeleton({ rows = 3 }) {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full border border-gray-300">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold"></th>
            <th className="px-6 py-3 text-left text-sm font-semibold"></th>
            <th className="px-6 py-3 text-left text-sm font-semibold"></th>
            <th className="px-6 py-3 text-left text-sm font-semibold"></th>
            <th className="px-6 py-3 text-left text-sm font-semibold"></th>
            <th className="px-6 py-3 text-left text-sm font-semibold"></th>
          </tr>
        </thead>

        {/* Table Skeleton Body */}
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index} className="border-t animate-pulse">
              <td className="px-6 py-3">
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
              </td>
              <td className="px-6 py-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </td>
              <td className="px-6 py-3">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </td>
              <td className="px-6 py-3">
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
              </td>
              <td className="px-6 py-3">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </td>
              <td className="px-6 py-3">
                <div className="h-4 w-28 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeleton;
