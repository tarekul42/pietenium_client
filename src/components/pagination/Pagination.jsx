"use client";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        marginTop: "2rem",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        style={{
          padding: "8px 12px",
          background:
            currentPage === 1
              ? "var(--color-surface-elevated)"
              : "var(--color-surface)",
          color: currentPage === 1 ? "var(--color-muted)" : "var(--color-text)",
          border: "1px solid var(--color-border)",
          borderRadius: "6px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          style={{
            padding: "8px 14px",
            background:
              currentPage === page
                ? "var(--color-accent)"
                : "var(--color-surface)",
            color:
              currentPage === page
                ? "white"
                : page === "..."
                  ? "var(--color-muted)"
                  : "var(--color-text)",
            border: "1px solid var(--color-border)",
            borderRadius: "6px",
            cursor: page === "..." ? "default" : "pointer",
            transition: "all 0.2s ease",
            fontWeight: currentPage === page ? "600" : "400",
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        style={{
          padding: "8px 12px",
          background:
            currentPage === totalPages
              ? "var(--color-surface-elevated)"
              : "var(--color-surface)",
          color:
            currentPage === totalPages
              ? "var(--color-muted)"
              : "var(--color-text)",
          border: "1px solid var(--color-border)",
          borderRadius: "6px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
