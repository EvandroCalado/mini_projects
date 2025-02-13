'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

import {
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui';

type ProductsPaginationProps = {
  totalPages: number;
  refetchProducts: () => void;
};

export const ProductsPagination = ({
  totalPages,
  refetchProducts,
}: ProductsPaginationProps) => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const handlePagination = (value: number) => {
    setPage(value);

    setTimeout(() => {
      refetchProducts();
    }, 300);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className='mr-2'>
          <Button
            onClick={() => handlePagination(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <Button
              variant='outline'
              onClick={() => handlePagination(index + 1)}
              className={`${page === index + 1 ? 'bg-muted' : ''}`}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}

        <PaginationItem className='ml-2'>
          <Button
            onClick={() => handlePagination(page + 1)}
            disabled={totalPages === page}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
