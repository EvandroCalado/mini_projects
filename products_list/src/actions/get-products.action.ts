'use server';

import { unstable_cache } from 'next/cache';

import { Product } from '@/types/product.type';

type getProductsActionParams = {
  search?: string;
  page?: number;
  category?: number;
};

export const getProductsAction = unstable_cache(
  async ({
    search,
    page = 1,
    category = 0,
  }: getProductsActionParams): Promise<Product[]> => {
    try {
      const currentOffset = (page - 1) * 6;
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/?title=${search}&offset=${currentOffset}&limit=6&categoryId=${category}`,
      );

      if (!response.ok) {
        throw new Error(`Error to fetching products:: ${response.statusText}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error to fetching products:', error);
      return [];
    }
  },
  ['products'],
  {
    tags: ['products'],
  },
);
