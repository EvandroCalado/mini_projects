'use server';

import { unstable_cache } from 'next/cache';

import { Product } from '@/types/product.type';

type getProductsActionParams = {
  search?: string;
  perPage?: number;
};

export const getProductsAction = unstable_cache(
  async ({ search, perPage }: getProductsActionParams): Promise<Product[]> => {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/?title=${search}&offset=0&limit=${perPage}`,
    );

    console.log(perPage);

    const data = await response.json();

    return data;
  },
  ['products'],
  {
    tags: ['products'],
  },
);
