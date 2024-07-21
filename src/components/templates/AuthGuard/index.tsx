'use client';

import { useEffect } from 'react';

import { redirect, usePathname } from '@/i18n/i18nNavigation';
import useAuth from '@/shares/hooks/useAuth';
import { Spinner } from '@/components/atoms';
import { RouterName } from '@/shares/constants/router';

export interface AuthGuardProps {
  children?: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading, initialize } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    initialize();
  }, []);

  if (isLoading && !user) {
    return <Spinner />;
  }

  if (!user) return redirect(`${RouterName.login}?redirect=${pathname}`);

  return children;
};
