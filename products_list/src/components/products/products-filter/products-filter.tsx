'use client';

import Link from 'next/link';

import { X } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { Badge } from '@/components/ui';
import { currencyFormat } from '@/lib';

type ProductsFilterProps = {
  refetchProducts: () => void;
};

const categoriesList = [
  {
    id: 2,
    name: 'grocery',
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
  const [price, setPrice] = useQueryState(
    'price',
    parseAsInteger.withDefault(0),
  );

  const handleCategory = (value: number) => {
    setCategory(value);

    setTimeout(() => {
      refetchProducts();
    }, 300);
  };

  const handlePrice = (value: number) => {
    setPrice(value);

    setTimeout(() => {
      refetchProducts();
    }, 300);
  };

  return (
    <div className='h-max w-60 space-y-8 rounded-lg border p-5'>
      {/* categories */}
      <div className='space-y-2'>
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
      </div>

      {/* price */}
      <div className='space-y-2'>
        <h2 className='mb-4 font-semibold'>Price</h2>

        <div>
          <input
            type='range'
            name='price'
            id='price'
            max={1000}
            step={1}
            value={price}
            onChange={(e) => handlePrice(Number(e.target.value))}
            className='w-full cursor-pointer accent-primary'
          />
          <div className='flex items-center justify-between'>
            <span>USD 0</span>
            <span>{currencyFormat(price)}</span>
          </div>
        </div>
      </div>

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
