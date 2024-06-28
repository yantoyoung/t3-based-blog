"use client"

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

interface BlogsPaginationProps {
  totalPages: number;
}

export function BlogsPagination({totalPages}: BlogsPaginationProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const pageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`
  };

  return (
    <Pagination className="justify-end mt-4">
      <PaginationContent>
        {prevPage >= 1 ? (
          <PaginationItem>
            <PaginationPrevious href={pageURL(prevPage)} />
          </PaginationItem>
        ) : null}

        {Array(totalPages)
          .fill("")
          .map((_, i) => (
            <PaginationItem
              className="hidden sm:inline-block"
              key={`page-button-${i}`}
            >
              <PaginationLink
                isActive={currentPage === i + 1}
                href={pageURL(i+1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        }

        {nextPage <= totalPages ? (
          <PaginationItem>
            <PaginationNext href={pageURL(nextPage)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  )
}
