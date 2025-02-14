import { Frown } from 'lucide-react';

export const ProductsEmpty = () => {
  return (
    <div className='my-20 flex h-full w-full flex-col items-center justify-center gap-4 text-muted-foreground md:col-span-2 lg:col-span-3'>
      <Frown size={40} />
      <h1 className='text-xl font-semibold'>Products not found</h1>
    </div>
  );
};
