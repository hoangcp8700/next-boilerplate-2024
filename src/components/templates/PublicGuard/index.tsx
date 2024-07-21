'use client';

import { useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';

import useAuth from '@/shares/hooks/useAuth';
import { redirect } from '@/i18n/i18nNavigation';

export interface PublicGuardProps {
  children?: React.ReactNode;
  isCheckAuth?: boolean;
}

export const PublicGuard = ({ children, isCheckAuth }: PublicGuardProps) => {
  const { isAuth, isLoading, initialize } = useAuth();

  useEffect(() => {
    initialize();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isAuth && isCheckAuth) {
    return redirect('/');
  }

  return children;
};
