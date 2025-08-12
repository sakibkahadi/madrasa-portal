"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect } from "react";

export function DataTablePagination({ table }) {
  useEffect(() => {
    table.setPageSize(10);
  }, [table]);

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 3; // Show only 3 pages at a time
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + showPages - 1);

    // Adjust start if there are fewer than 3 pages before the current page
    if (end - start < showPages - 1) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="mb-[39px] flex items-center justify-end space-x-3">
      <Button
        className="h-8 w-8 border border-[#EEEEEE] bg-[#F5F5F5] hover:bg-[#F5F5F5]"
        onClick={() => table.setPageIndex(0)} // Go to first page
        disabled={!table.getCanPreviousPage()}
      >
        <ArrowLeftToLine className="h-4 w-4 text-[#404B52]" />
      </Button>

      <Button
        className="h-8 w-8 border border-[#EEEEEE] bg-[#F5F5F5] hover:bg-[#F5F5F5]"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft className="h-4 w-4 text-[#404B52]" />
      </Button>

      {getPageNumbers().map((pageNum) => (
        <Button
          key={pageNum}
          className={`h-8 w-8 p-0 ${
            currentPage === pageNum
              ? "#3498db text-white hover:rgb(52 152 214 / 78%)"
              : "border border-[#EEEEEE] bg-[#F5F5F5] text-[#404B52] hover:bg-[#F5F5F5]"
          }`}
          onClick={() => table.setPageIndex(pageNum - 1)}
        >
          {pageNum}
        </Button>
      ))}

      <Button
        className="h-8 w-8 border border-[#EEEEEE] bg-[#F5F5F5] hover:bg-[#F5F5F5]"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight className="h-4 w-4 text-[#404B52]" />
      </Button>

      <Button
        className="h-8 w-8 border border-[#EEEEEE] bg-[#F5F5F5] hover:bg-[#F5F5F5]"
        onClick={() => table.setPageIndex(totalPages - 1)} // Go to last page
        disabled={!table.getCanNextPage()}
      >
        <ArrowRightToLine className="h-4 w-4 text-[#404B52]" />
      </Button>
    </div>
  );
}

export default DataTablePagination;
