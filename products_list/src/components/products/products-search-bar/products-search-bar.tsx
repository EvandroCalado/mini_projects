'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

type ProductsSearchBarProps = {
  refetchProducts: () => Promise<void>;
};

export const ProductsSearchBar = ({
  refetchProducts,
}: ProductsSearchBarProps) => {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
  });
  const [_, setPerPage] = useQueryState(
    'perPage',
    parseAsInteger.withDefault(6),
  );

  const handleSearch = (value: string) => {
    setSearch(value);

    setTimeout(() => {
      refetchProducts();
    }, 300);
  };

  const handlePerPage = (value: number) => {
    setPerPage(value);

    setTimeout(() => {
      refetchProducts();
    }, 300);
  };

  return (
    <div className='flex w-full items-center justify-between gap-2'>
      <Input
        type='search'
        placeholder='Search ...'
        className='max-w-xs'
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <Select onValueChange={(value) => handlePerPage(Number(value))}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Products per page' />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Per page</SelectLabel>
            <SelectItem value='6'>6</SelectItem>
            <SelectItem value='12'>12</SelectItem>
            <SelectItem value='18'>18</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
