'use client';

import Link from 'next/link';

import { X } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { Badge } from '@/components/ui';

type ProductsFilterProps = {
  refetchProducts: () => void;
};

const categoriesList = [
  {
    id: 2,
    name: 'a new name2',
  },
  {
    id: 3,
    name: 'Furniture',
  },
  {
    id: 4,
    name: 'Shoes',
  },
  {
    id: 5,
    name: 'Miscellaneous',
  },
];

export const ProductsFilter = ({ refetchProducts }: ProductsFilterProps) => {
  const [category, setCategory] = useQueryState(
    'category',
    parseAsInteger.withDefault(0),
  );

  const handleCategory = (value: number) => {
    setCategory(value);

    setTimeout(() => {
      refetchProducts();
    }, 300);
  };

  return (
    <div className='h-max w-60 space-y-2 rounded-lg border p-5'>
      <h2 className='mb-4 font-semibold'>Categories</h2>

      {categoriesList.map((item) => (
        <div key={item.name} className='flex items-center gap-2'>
          <input
            id={item.name}
            type='checkbox'
            name='category'
            checked={category === item.id}
            value={item.id}
            onChange={(e) => handleCategory(Number(e.target.value))}
            className='accent-primary'
          />
          <label
            htmlFor={item.name}
            className='text-sm font-semibold capitalize'
          >
            {item.name}
          </label>
        </div>
      ))}

      {category > 0 && (
        <div className='pt-4'>
          <h4 className='mb-2 text-sm font-semibold'>Applied Filters:</h4>

          <Link href='/'>
            <Badge className='cursor-pointer'>
              {categoriesList
                .filter((item) => item.id === category)[0]
                .name.toString()}
              <X size={12} />
            </Badge>
          </Link>
        </div>
      )}
    </div>
  );
};
