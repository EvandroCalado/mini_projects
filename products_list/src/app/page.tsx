import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

import type { SearchParams } from 'nuqs/server';

import { getProductsAction } from '@/actions';
import {
  ProductsCard,
  ProductsFilter,
  ProductsPagination,
  ProductsSearchBar,
} from '@/components/products';
import { loadSearchParams } from './search-params';

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { search, page, perPage, category } =
    await loadSearchParams(searchParams);

  const products = await getProductsAction({
    search,
    page,
    perPage,
    category,
  });

  if (!products) notFound();

  const totalPages = Math.ceil(products.length / perPage);

  const refetchProducts = async () => {
    'use server';

    revalidateTag('products');
  };

  return (
    <main className='mx-auto flex max-w-6xl flex-col gap-10 px-5'>
      <ProductsSearchBar refetchProducts={refetchProducts} />

      <div className='flex flex-col gap-4 md:flex-row'>
        <ProductsFilter refetchProducts={refetchProducts} />

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <ProductsPagination
        totalPages={totalPages}
        refetchProducts={refetchProducts}
      />
    </main>
  );
};

export default HomePage;
