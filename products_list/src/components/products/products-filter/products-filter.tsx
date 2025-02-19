'use client';

import { X } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { Badge, Checkbox, Slider } from '@/components/ui';
import { currencyFormat } from '@/lib';

type ProductsFilterProps = {
  refetchProducts: () => void;
};

const categoriesList = [
  {
    id: 1,
    name: 'clothes',
  },
  {
    id: 2,
    name: 'electronics',
  },
  {
    id: 3,
    name: 'furniture',
  },
  {
    id: 4,
    name: 'shoes',
  },
  {
    id: 5,
    name: 'miscellaneous',
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

  const handleCategory = (value: number | null) => {
    setCategory(value);

    setTimeout(() => {
      refetchProducts();
    });
  };

  const handlePrice = (value: number) => {
    setPrice(value);

    setTimeout(() => {
      refetchProducts();
    });
  };

  return (
    <div className='h-max min-w-60 space-y-8 rounded-lg border p-5'>
      {/* categories */}
      <div className='space-y-2'>
        <h2 className='mb-4 font-semibold'>Categories</h2>

        {categoriesList.map((item) => (
          <div key={item.name} className='flex items-center gap-2'>
            <Checkbox
              id={item.name}
              name='category'
              checked={category === item.id}
              value={item.id}
              onCheckedChange={(checked) =>
                handleCategory(checked ? Number(item.id) : 0)
              }
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
          <Slider
            max={1000}
            step={1}
            value={[price]}
            onValueChange={(value) => handlePrice(value[0])}
            className='mb-4 w-full'
          />
          <div className='flex items-center justify-between text-sm'>
            <span>{currencyFormat(0)}</span>
            <span>{currencyFormat(price)}</span>
          </div>
        </div>
      </div>

      {/* applied filters */}
      {category > 0 && (
        <div className='pt-4'>
          <h4 className='mb-2 text-sm font-semibold'>Applied Filters:</h4>

          <Badge
            className='cursor-pointer'
            onClick={() => handleCategory(null)}
          >
            {categoriesList
              .filter((item) => item.id === category)[0]
              .name.toString()}
            <X size={12} />
          </Badge>
        </div>
      )}
    </div>
  );
};
