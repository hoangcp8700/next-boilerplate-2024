import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { AppConfigs, Locale } from '@/shares/constants';

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  if (!AppConfigs.locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
