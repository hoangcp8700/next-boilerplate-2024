import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { decrypt } from '@/shares/utils/session';

import { intlMiddleware, removeLanguagePrefix } from './shares/middlewares';
import { logger } from './libs/logger';

// 1. Specify protected and public routes
const protectedRoutes = ['/profile'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  try {
    // Apply intl middleware
    const intlResponse = intlMiddleware(req);

    if (intlResponse) {
      return intlResponse;
    }

    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(
      removeLanguagePrefix(path),
    );
    const isPublicRoute = publicRoutes.includes(removeLanguagePrefix(path));

    logger.info(
      '🚀 ~ middleware ~ isPublicRoute:',
      isPublicRoute,
      isProtectedRoute,
      path,
    );

    // 3. Decrypt the session from the cookie
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    // 4. Redirect
    if (isProtectedRoute && !session?.userId) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if (
      isPublicRoute &&
      session?.userId &&
      !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
  }
}
export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(en|vi)/:page*'],
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
