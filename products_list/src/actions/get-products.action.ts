'use server';

import { unstable_cache } from 'next/cache';

import { Product } from '@/types/product.type';

type getProductsActionParams = {
  search?: string;
  page?: number;
  perPage?: number;
};

export const getProductsAction = unstable_cache(
  async (
    { search, page = 1, perPage = 8 }: getProductsActionParams = {
      page: 1,
      perPage: 10,
    },
  ): Promise<Product[]> => {
    const currentOffset = (page - 1) * perPage;
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/?title=${search}&offset=${currentOffset}&limit=${perPage}`,
    );

    const data = await response.json();

    return data;
  },
  ['products'],
  {
    tags: ['products'],
  },
);
