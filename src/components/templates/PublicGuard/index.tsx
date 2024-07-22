'use client';

import { useEffect } from 'react';

import useAuth from '@/shares/hooks/useAuth';
import { redirect } from '@/i18n/i18nNavigation';

export interface PublicGuardProps {
  children?: React.ReactNode;
  isCheckAuth?: boolean;
}

export const PublicGuard = ({ children, isCheckAuth }: PublicGuardProps) => {
  const { isAuth, initialize } = useAuth();

  useEffect(() => {
    initialize();
  }, []);

  if (isAuth && isCheckAuth) {
    return redirect('/');
  }

  return children;
};
