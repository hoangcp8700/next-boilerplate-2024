import { isObjectEmpty } from './validate';

export const queryString = (obj: Record<string, string | number>) => {
  if (isObjectEmpty(obj)) return '';
  return `?${Object.keys(obj)
    .map((key) => {
      return `${key}=${encodeURIComponent(obj[key])}`;
    })
    .join('&')}`;
};
