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
    for (let i = 1; i <= pageCount; i++) {
      if (
        i === page ||
        i === page + 1 ||
        i === pageCount - 1 ||
        i === pageCount
      ) {
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
      } else if (i === page + 2 && pageCount > 5) {
        pages.push(
          <PaginationItem key='ellipsis-start'>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
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
