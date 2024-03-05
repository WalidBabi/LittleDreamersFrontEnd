import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const paginationRange = 6;

  const getPaginationRange = () => {
    const start = Math.max(1, currentPage - Math.floor(paginationRange / 2));
    const end = Math.min(totalPages, start + paginationRange - 1);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const paginationArray = getPaginationRange();

  return (
    <div className="mt-8 flex justify-center items-center">
      {currentPage > 1 && (
        <button
          className="mx-1 px-3 py-2 rounded bg-blue-500 text-white"
          onClick={() => paginate(currentPage - 1)}
        >
          &laquo; Previous
        </button>
      )}

      <div className="flex space-x-2">
        {paginationArray.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {currentPage < totalPages && (
        <button
          className="mx-1 px-3 py-2 rounded bg-blue-500 text-white"
          onClick={() => paginate(currentPage + 1)}
        >
          Next &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
