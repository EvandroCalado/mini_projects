import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const coordinatesSearchParams = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  category: parseAsInteger.withDefault(0),
  price: parseAsInteger.withDefault(0),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);
