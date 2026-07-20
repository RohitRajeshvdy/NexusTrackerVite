import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import "../styles/PaginationShadCN.css";

export function PaginationShadCN({
  currentPage,
  totalPages = 1,
  hasNextPage,
  onPageChange,
}) {
  return (
    <div className="pagination-container">
      <Pagination>
        <PaginationContent className="pagination-content">
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={`pagination-btn ${currentPage <= 1 ? "disabled" : ""}`}
            />
          </PaginationItem>

          {/* Current Page / Total Pages */}
          <PaginationItem>
            <PaginationLink isActive className="pagination-page-indicator">
              {currentPage} {totalPages > 1 ? `of ${totalPages}` : ""}
            </PaginationLink>
          </PaginationItem>

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={`pagination-btn ${
                !hasNextPage && currentPage >= totalPages ? "disabled" : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
