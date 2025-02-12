import { notFound } from 'next/navigation';

import { getProductsAction } from '@/actions/get-products.action';
import { ProductCard } from '@/components/products';

const HomePage = async () => {
  const products = await getProductsAction();

  if (!products) notFound();

  return (
    <main className='mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 p-5'>
      <h1>Products List</h1>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
