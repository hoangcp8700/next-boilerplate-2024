import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { AppConfigs } from '@/shares/constants';

export default getRequestConfig(async ({ locale }) => {
  if (!AppConfigs.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
