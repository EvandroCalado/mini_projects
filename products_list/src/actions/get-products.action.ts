'use server';

import { Product } from '@/types/product.type';

export const getProductsAction = async (): Promise<Product[]> => {
  const response = await fetch('https://api.escuelajs.co/api/v1/products');
  const data = await response.json();

  return data;
};
