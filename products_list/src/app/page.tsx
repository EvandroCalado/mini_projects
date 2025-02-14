import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

import type { SearchParams } from 'nuqs/server';

import { getProductsAction } from '@/actions';
import {
  ProductsFilter,
  ProductsGrid,
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

  const { products, pageCount } = await getProductsAction({
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
    <main className='container mx-auto flex h-full w-full flex-col gap-10 px-5'>
      <ProductsSearchBar refetchProducts={refetchProducts} />

      <div className='flex flex-col gap-4 md:flex-row'>
        <ProductsFilter refetchProducts={refetchProducts} />
        <ProductsGrid products={products} />
      </div>

      <ProductsPagination
        pageCount={pageCount}
        refetchProducts={refetchProducts}
      />
    </main>
  );
};

export default HomePage;
