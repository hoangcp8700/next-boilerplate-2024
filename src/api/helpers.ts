'use client';

import { logger } from '@/libs/logger';
import { Env } from '@/shares/constants/env';
import { queryString } from '@/shares/utils';

export const urlRequest = (
  pathname: string,
  params?: Record<string, string | number>,
) => {
  const link = `${Env.NEXT_PUBLIC_API_BASE_URL}${pathname}${params ? queryString(params) : ''}`;
  logger.info('Request To Url:', link);

  return link;
};
