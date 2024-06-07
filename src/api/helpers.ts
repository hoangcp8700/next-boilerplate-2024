import { Env } from '@/shares/constants/env';
import { queryString } from '@/shares/utils';

export const urlRequest = (
  pathname: string,
  params?: Record<string, string | number>,
) => {
  return `${Env.NEXT_API_BASE_URL}${pathname}${params ? queryString(params) : ''}`;
};
