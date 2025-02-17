import { Dispatch } from "@reduxjs/toolkit";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const Pagination = ({ currentPage, totalPages, setPage }: any) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => setPage((prev: any) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-1">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setPage((prev: any) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
