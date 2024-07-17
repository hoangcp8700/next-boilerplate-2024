'use client';

import { logger } from '@/libs/logger';
import { queryString } from '@/shares/utils';

export const urlRequest = (
  pathname: string,
  params?: Record<string, string | number>,
) => {
  const link = `https://dummyjson.com${pathname}${params ? queryString(params) : ''}`;
  logger.info('Request', {
    link,
    params,
  });

  return link;
};
