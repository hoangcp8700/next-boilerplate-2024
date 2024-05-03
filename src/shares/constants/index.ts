const defaultQueryOption = {
  retry: 0,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

const locales = ['en', 'vi'] as const;
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
};
