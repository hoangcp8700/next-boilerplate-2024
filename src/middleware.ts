import { NextRequest, NextResponse } from 'next/server';

import { intlMiddleware } from './shares/middlewares';
import {
  privateRouter,
  routeConfig,
  RouterName,
} from './shares/constants/router';
import { cookieKeys } from './shares/constants';
import { getPathnameWithoutLocale } from './i18n/helper';

export function middleware(req: NextRequest) {
  // Check if the request URL matches the protected routes
  const { pathname, searchParams } = req.nextUrl;

  // Get the accessToken cookie
  const accessToken = req.cookies.get(cookieKeys.accessToken)?.value;

  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);
  const redirectUrl = searchParams.get('redirect');

  // If the route is protected and there is no accessToken, redirect to the login page
  if (privateRouter.includes(pathnameWithoutLocale) && !accessToken) {
    const loginUrl = new URL(
      `${RouterName.login}?redirect=${pathnameWithoutLocale}`,
      req.url,
    );
    return NextResponse.redirect(loginUrl);
  }

  // authenticated and access auth page
  if (accessToken && routeConfig.auth.routes.includes(pathnameWithoutLocale)) {
    const homeUrl = new URL(redirectUrl || '/', req.url);
    return NextResponse.redirect(homeUrl);
  }

  // If the request is not for a protected route or the accessToken exists, proceed with the intl middleware
  return intlMiddleware(req);
}

export default middleware;

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(en|vi)/:page*'],
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
