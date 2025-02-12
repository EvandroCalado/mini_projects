'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

import {
  Button,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui';

type ProductsPaginationProps = {
  refetchProducts: () => void;
};

export const ProductsPagination = ({
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
        <PaginationItem>
          <Button
            onClick={() => handlePagination(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href='#'>1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <Button onClick={() => handlePagination(page + 1)}>
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
