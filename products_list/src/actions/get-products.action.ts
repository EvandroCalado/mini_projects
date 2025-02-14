'use server';

import { Product } from '@/types/product.type';

type getProductsActionParams = {
  search?: string;
  page?: number;
  category?: number;
  price?: number;
};

export const getProductsAction = async ({
  search,
  page = 1,
  category = 0,
  price = 0,
}: getProductsActionParams): Promise<{
  products: Product[];
  pageCount: number;
}> => {
  try {
    const perPage = 6;
    const currentOffset = (page - 1) * perPage;

    const [response, pageCountResponse] = await Promise.all([
      fetch(
        `https://api.escuelajs.co/api/v1/products/?title=${search}&offset=${currentOffset}&limit=${perPage}&categoryId=${category}&price_min=1&price_max=${price}`,
        {
          next: { tags: ['products'] },
        },
      ),
      fetch(
        `https://api.escuelajs.co/api/v1/products/?title=${search}&offset=0&limit=1000&categoryId=${category}&price_min=1&price_max=${price}`,
        {
          next: { tags: ['products'] },
        },
      ),
    ]);

    if (!response.ok) {
      throw new Error(`Error to fetching products: ${response.statusText}`);
    }

    const [products, pageCountData] = await Promise.all([
      response.json(),
      pageCountResponse.json(),
    ]);

    const pageCount = Math.ceil(pageCountData.length / perPage);

    return {
      products,
      pageCount,
    };
  } catch (error) {
    console.error('Error to fetching products:', error);
    return {
      products: [],
      pageCount: 0,
    };
  }
};
