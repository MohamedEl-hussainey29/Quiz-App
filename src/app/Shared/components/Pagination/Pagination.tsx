"use client";
import { PaginationProps } from "@/src/types/pagination";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {

  const maxVisiblePages = 5;
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }
  return (
    <>
     <div className='flex items-center justify-center gap-2 mt-5'>
       <button disabled={currentPage === 1} 
       onClick={() => setCurrentPage(currentPage - 1)} 
       className="size-10 disabled:opacity-40 disabled:cursor-not-allowed ">
        <FaChevronLeft className="mx-auto"  />
       </button>

        {startPage > 1 && (
        <>
          <button
            onClick={() => setCurrentPage(1)}
            className={`size-6 ${
              currentPage === 1 ? "bg-[#FFEDDF] text-black" : ""
            }`}
          >
            1
          </button>

          {startPage > 2 && <span>...</span>}
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
        const page = startPage + index;

        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`size-6 ${
              currentPage === page
                ? " bg-[#FFEDDF] text-black"
                : ""
            }`}
          >
            {page}
          </button>
        );
      })}

       {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}

          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`size-6 ${
              currentPage === totalPages
                ? "bg-[#FFEDDF] text-black"
                : ""
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

       <button disabled={currentPage === totalPages} 
       onClick={() => setCurrentPage(currentPage + 1)} 
       className="size-10 disabled:opacity-40 disabled:cursor-not-allowed ">
        <FaChevronRight className="mx-auto" />
       </button>
     </div>
    </>
  );
}
