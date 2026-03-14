"use client";
import { useState, useCallback } from "react";

export const usePagination = ({ initialPage = 1, initialLimit = 6 } = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = useCallback((totalItems) => {
    return Math.ceil(totalItems / limit);
  }, [limit]);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const nextPage = useCallback((totalItems) => {
    const total = totalPages(totalItems);
    if (currentPage < total) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  const goToFirst = useCallback(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToLast = useCallback((totalItems) => {
    const total = totalPages(totalItems);
    setCurrentPage(total);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [totalPages]);

  const getPaginationRange = useCallback((totalItems, siblingCount = 1) => {
    const total = totalPages(totalItems);
    const pages = [];
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", total);
      } else if (currentPage >= total - 2) {
        pages.push(1, "...", total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", total);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    limit,
    setLimit,
    totalPages,
    paginate,
    nextPage,
    prevPage,
    goToFirst,
    goToLast,
    getPaginationRange,
  };
};

export default usePagination;
