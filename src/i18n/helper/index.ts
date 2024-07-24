import { Locale, locales } from '@/shares/constants';

export const getPathnameWithoutLocale = (pathname: string) => {
  const [lang, ...segments] = pathname.split('/').filter(Boolean);

  // for en lang
  if (!locales.includes(lang as Locale)) {
    return pathname;
  }

  return `/${segments.join('/')}`;
};
