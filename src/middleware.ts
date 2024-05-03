import createMiddleware from 'next-intl/middleware';

import { AppConfigs } from '@/shares/constants';

const middleware = createMiddleware({
  locales: AppConfigs.locales,
  localePrefix: 'as-needed',
  defaultLocale: AppConfigs.defaultLocale,
});

export default middleware;

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(en|vi)/:page*'],
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
