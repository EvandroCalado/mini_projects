import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

import type { SearchParams } from 'nuqs/server';

import { getProductsAction } from '@/actions';
import {
  ProductsCard,
  ProductsEmpty,
  ProductsFilter,
  ProductsPagination,
  ProductsSearchBar,
} from '@/components/products';
import { loadSearchParams } from './search-params';

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { search, page, category, price } =
    await loadSearchParams(searchParams);

  const products = await getProductsAction({
    search,
    page,
    category,
    price,
  });

  if (!products) notFound();

  const refetchProducts = async () => {
    'use server';

    revalidateTag('products');
  };

  return (
    <main className='mx-auto flex h-full w-full max-w-6xl flex-col gap-10 px-5'>
      <ProductsSearchBar refetchProducts={refetchProducts} />

      <div className='flex flex-col gap-4 md:flex-row'>
        <ProductsFilter refetchProducts={refetchProducts} />

        <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {products.length < 1 && <ProductsEmpty />}

          {products.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <ProductsPagination refetchProducts={refetchProducts} />
    </main>
  );
};

export default HomePage;
