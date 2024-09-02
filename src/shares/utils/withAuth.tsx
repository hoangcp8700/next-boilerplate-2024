import React, { ReactNode } from 'react';

import { usePathname, useRouter } from '@/i18n/i18nNavigation';

import useAuth from '../hooks/useAuth';
import { RouterName } from '../constants/router';
import { useAllQueryParams } from '../hooks/useGetParams';

import { queryString } from './queryString';

// Define the type for the authentication HOC

function withAuth<T extends { children: ReactNode }>(
  WrappedComponent: React.ComponentType<T>,
) {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useAllQueryParams();

    const { isAuth } = useAuth(); // Your authentication logic

    if (!isAuth) {
      router.replace(
        `${RouterName.login}?redirect=${pathname}${queryString(params)}`,
      );
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return ComponentWithAuth;
}

function getDisplayName<T>(WrappedComponent: React.ComponentType<T>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
