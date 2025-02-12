import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const coordinatesSearchParams = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(8),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);
