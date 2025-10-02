import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  page: number;
  pages: number;
  setPage: (page: number) => void;
};

const PaginationNav = ({ page, pages, setPage }: PaginationProps) => {
  //   if (pages <= 1) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) setPage(page - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page < pages) setPage(page + 1);
  };

  // Show max 5 pages at a time (like 1 ... 4 5 6 ... 10)
  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisible = 5;

    if (pages <= maxVisible) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", pages);
      } else if (page >= pages - 2) {
        pageNumbers.push(1, "...", pages - 3, pages - 2, pages - 1, pages);
      } else {
        pageNumbers.push(1, "...", page - 1, page, page + 1, "...", pages);
      }
    }

    return pageNumbers.map((num, idx) =>
      num === "..." ? (
        <PaginationItem key={idx}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={idx}>
          <PaginationLink
            href="#"
            isActive={page === num}
            onClick={(e) => {
              e.preventDefault();
              setPage(num as number);
            }}
          >
            {num}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrev} />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationNav;
