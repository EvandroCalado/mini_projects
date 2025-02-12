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
    parseAsInteger.withDefault(8),
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
          <SelectItem value='8'>8</SelectItem>
          <SelectItem value='16'>16</SelectItem>
          <SelectItem value='24'>24</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
