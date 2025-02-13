'use client';

import { useQueryState } from 'nuqs';

import { Input } from '@/components/ui';

type ProductsSearchBarProps = {
  refetchProducts: () => void;
};

export const ProductsSearchBar = ({
  refetchProducts,
}: ProductsSearchBarProps) => {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
  });

  const handleSearch = (value: string) => {
    setSearch(value);

    setTimeout(() => {
      refetchProducts();
    }, 300);
  };

  return (
    <div className='flex w-full items-center justify-between gap-2'>
      <Input
        type='text'
        placeholder='Search'
        className='max-w-xs'
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
