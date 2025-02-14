import { Product } from '@/types';
import { ProductsCard } from '../products-card';
import { ProductsEmpty } from '../products-empty';

type ProductsGridProps = {
  products: Product[];
};

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className='grid h-max w-full grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 xl:gap-16'>
      {products.length < 1 && <ProductsEmpty />}

      {products.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
  );
};
