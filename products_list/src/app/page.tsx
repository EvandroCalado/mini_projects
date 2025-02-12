import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

import type { SearchParams } from 'nuqs/server';

import { getProductsAction } from '@/actions/get-products.action';
import {
  ProductCard,
  ProductsFilter,
  ProductsPagination,
} from '@/components/products';
import { loadSearchParams } from './search-params';

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { search, page, perPage } = await loadSearchParams(searchParams);

  const products = await getProductsAction({
    search,
    page,
    perPage,
  });

  if (!products) notFound();

  const refetchProducts = async () => {
    'use server';

    revalidateTag('products');
  };

  return (
    <main className='mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 p-5'>
      <ProductsFilter refetchProducts={refetchProducts} />

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ProductsPagination refetchProducts={refetchProducts} />
    </main>
  );
};

export default HomePage;
