import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { AppConfigs, localePrefix } from '../constants';

export const removeLanguagePrefix = (pathname: string): string => {
  let path = pathname;

  // Remove trailing slash
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  for (const prefix of localePrefix) {
    if (path.startsWith(prefix)) {
      return path.slice(prefix.length);
    }
  }

  return path;
};

export const intlMiddleware = createMiddleware({
  locales: AppConfigs.locales,
  localePrefix: 'as-needed',
  defaultLocale: AppConfigs.defaultLocale,
});

export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token');

  if (!token) {
    // Redirect to the login page if the user is not authenticated
    return NextResponse.redirect('/login');
  }

  // You can add additional authorization logic here

  return NextResponse.next();
}
