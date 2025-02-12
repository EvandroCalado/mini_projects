'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

type ProductsFilterProps = {
  refetchProducts: () => void;
};

export const ProductsFilter = ({ refetchProducts }: ProductsFilterProps) => {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
  });
  const [perPage, setPerPage] = useQueryState(
    'perPage',
    parseAsInteger.withDefault(10),
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    refetchProducts();
  };

  const handlePerPage = (value: number) => {
    setPerPage(value);
    refetchProducts();
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

      <Select
        value={perPage.toString()}
        onValueChange={(value) => handlePerPage(Number(value))}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Per Page' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='10'>10</SelectItem>
          <SelectItem value='20'>20</SelectItem>
          <SelectItem value='30'>30</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
