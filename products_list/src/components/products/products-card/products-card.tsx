import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { currencyFormat } from '@/lib';
import { Product } from '@/types';

type ProductsCardProps = {
  product: Product;
};

export const ProductsCard: FC<ProductsCardProps> = ({ product }) => {
  const imageURL = product.images[0].startsWith('http')
    ? product.images[0]
    : 'https://fakeimg.pl/300x300/e0dddd/909090';

  return (
    <Card
      key={product.id}
      className='relative w-full overflow-hidden rounded-lg p-0'
    >
      <Badge className='absolute left-2 top-2 z-10'>
        {product.category.name}
      </Badge>

      <Link href='/'>
        <CardHeader className='overflow-hidden p-0'>
          <Image
            src={imageURL}
            alt={product.title}
            width={300}
            height={300}
            priority
            className='h-[200px] w-full object-cover transition-all duration-150 hover:scale-105'
          />
        </CardHeader>
      </Link>

      <CardContent className='p-2'>
        <Link href='/'>
          <CardTitle className='truncate text-lg font-semibold transition-colors duration-150 hover:text-primary'>
            {product.title}
          </CardTitle>
        </Link>
        <CardDescription className='truncate text-muted-foreground'>
          {product.description}
        </CardDescription>
      </CardContent>

      <CardFooter className='flex items-center justify-between p-2'>
        <p className='text-lg font-semibold'>{currencyFormat(product.price)}</p>
        <Button>Add to cart</Button>
      </CardFooter>
    </Card>
  );
};
