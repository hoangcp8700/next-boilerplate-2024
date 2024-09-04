export * from './regex';
export * from './env';
export * from './router';

import { defaultQueryOption, metadata, viewport } from './configs';

export const locales = ['en', 'vi'] as const;
export const localePrefix = locales.map((el) => `/${el}`);
export type Locale = (typeof locales)[number];

const localeNames: Record<Locale, string> = {
  en: 'English',
  vi: 'Việt Nam',
};

export const AppConfigs = {
  name: 'Nextjs Boilerplate',
  locales,
  localeNames,
  defaultLocale: 'en' as Locale,
  defaultQueryOption,
  metadata,
  viewport,
};

export const paginateInitialize = {
  limit: 30,
};

export const cookieKeys = {
  accessToken: 'auth',
  refreshToken: 'refresh-token',
};
