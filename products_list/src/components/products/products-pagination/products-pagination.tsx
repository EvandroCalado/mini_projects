'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

import {
  Button,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui';

type ProductsPaginationProps = {
  pageCount: number;
  refetchProducts: () => void;
};

export const ProductsPagination = ({
  pageCount,
  refetchProducts,
}: ProductsPaginationProps) => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  if (pageCount <= 1) return null;

  const handlePagination = (value: number) => {
    setPage(value);

    setTimeout(() => {
      refetchProducts();
    }, 300);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (pageCount <= maxVisiblePages) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(
          <PaginationItem key={i}>
            <Button
              variant='outline'
              onClick={() => handlePagination(i)}
              className={`${page === i ? 'bg-muted' : ''}`}
            >
              {i}
            </Button>
          </PaginationItem>,
        );
      }
    } else {
      pages.push(
        <PaginationItem key={1}>
          <Button
            variant='outline'
            onClick={() => handlePagination(1)}
            className={`${page === 1 ? 'bg-muted' : ''}`}
          >
            {1}
          </Button>
        </PaginationItem>,
      );

      if (page > 3) {
        pages.push(
          <PaginationItem key='ellipsis-start'>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(pageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <Button
              variant='outline'
              onClick={() => handlePagination(i)}
              className={`${page === i ? 'bg-muted' : ''}`}
            >
              {i}
            </Button>
          </PaginationItem>,
        );
      }

      if (page < pageCount - 2) {
        pages.push(
          <PaginationItem key='ellipsis-end'>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      pages.push(
        <PaginationItem key={pageCount}>
          <Button
            variant='outline'
            onClick={() => handlePagination(pageCount)}
            className={`${page === pageCount ? 'bg-muted' : ''}`}
          >
            {pageCount}
          </Button>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <Pagination className='mt-auto items-end py-4 md:col-span-2 lg:col-span-3'>
      <PaginationContent>
        <PaginationItem className='mr-2'>
          <Button
            onClick={() => handlePagination(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem className='ml-2'>
          <Button
            onClick={() => handlePagination(page + 1)}
            disabled={page === pageCount}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
