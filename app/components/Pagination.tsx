import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ totalPages, page, setPage }: PaginationProps) {
  const maxPagesToShow = 3; // Number of pages to show on each side

  // Generate the range of pages to display
  const generatePageNumbers = () => {
    let start = Math.max(1, page - maxPagesToShow);
    let end = Math.min(totalPages, page + maxPagesToShow);
    let pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev Button */}
      <button
        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
          page === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "border border-black-500 text-balck"
        }`}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft size={18} />
        Prev
      </button>

      {/* Page Numbers */}
      {page > maxPagesToShow + 1 && (
        <>
          <button
            className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={() => setPage(1)}
          >
            1
          </button>
          {page > maxPagesToShow + 2 && <span className="px-2">...</span>}
        </>
      )}

      {generatePageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`px-3 py-2 rounded-md ${
            pageNum === page
              ? "bg-blue-600 text-white font-bold"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {pageNum}
        </button>
      ))}

      {page < totalPages - maxPagesToShow && (
        <>
          {page < totalPages - maxPagesToShow - 1 && <span className="px-2">...</span>}
          <button
            className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
          page === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "border border-black-500 text-balck"
        }`}
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default Pagination;
