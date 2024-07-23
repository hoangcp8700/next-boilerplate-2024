'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';

import { Spinner } from '@/components/atoms';
import useAuth from '@/shares/hooks/useAuth';
import { usePathname } from '@/i18n/i18nNavigation';
import {
  authRouter,
  dashboardRouter,
  publicRouter,
  routeConfig,
  RouterName,
} from '@/shares/constants/router';
import { AppRoles } from '@/shares/constants/enum';
import { localePrefix } from '@/shares/constants';

export const getPathnameWithoutLocale = (pathname: string) => {
  const [_, lang, ...segments] = pathname.split('/');

  // for en lang
  if (!localePrefix.includes(lang)) {
    return pathname;
  }

  return `/${segments.join('/')}`;
};

export const checkIsValidPathInRoutes = (paths: string[], pathname: string) => {
  if (!pathname) {
    return false;
  }

  return paths.some((path) => {
    if (!path) {
      return false;
    }

    if (path === RouterName.home && path !== pathname) {
      return false;
    }
    return pathname.includes(path);
  });
};
// 1. check pathname hien tại có public ko => if TRUE -> SKIP / FALSE -> next validate
// 2. neu chua login mà pathname ko phai la authRouter => if true -> redirect login page -> next validate
// 3.
const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  // const params = useParams();

  const [isValidated, setIsValidated] = useState(false);
  const { user, isLoading: authLoading, handleLogout, initialize } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCompleteValidate = () => setIsValidated(true);

  useEffect(() => {
    if (authLoading) return;

    const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);

    // neu user truy cap page dashboard => skip
    if (
      user?.role === AppRoles.User &&
      checkIsValidPathInRoutes(
        [...dashboardRouter, ...authRouter],
        pathnameWithoutLocale,
      )
    ) {
      redirect(RouterName.home);
    }

    // skip check if pathname router is public

    if (
      checkIsValidPathInRoutes(publicRouter, pathnameWithoutLocale) ||
      (!user &&
        checkIsValidPathInRoutes(
          routeConfig.auth.routes,
          pathnameWithoutLocale,
        ))
    ) {
      return onCompleteValidate();
    }
    // IF chua co auth ma vao page can auth => redirect login page
    if (
      !user &&
      !checkIsValidPathInRoutes(routeConfig.auth.routes, pathnameWithoutLocale)
    ) {
      redirect(`${RouterName.login}?redirect=${pathname}`);
    }

    // check dashboard
    const userRouteConfig = user ? routeConfig[user.role] : undefined;

    // the user's role do not exist
    if (!userRouteConfig) return handleLogout();

    // Display Dashboard UI corresponding to the role
    if (pathnameWithoutLocale === RouterName.dashboard.home) {
      redirect(userRouteConfig.default);
    }

    // auto redirect after login success
    const queryRedirectUrl = searchParams.get('redirect');
    if (
      checkIsValidPathInRoutes(
        routeConfig.auth.routes,
        pathnameWithoutLocale,
      ) &&
      queryRedirectUrl &&
      checkIsValidPathInRoutes(userRouteConfig.routes, queryRedirectUrl)
    ) {
      redirect(queryRedirectUrl);
    }

    if (
      !checkIsValidPathInRoutes(userRouteConfig.routes, pathnameWithoutLocale)
    ) {
      redirect(userRouteConfig.default);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user, pathname]);

  if (authLoading || !isValidated) {
    return <Spinner />;
  }

  return children;
};

export default ProtectedRoutes;
