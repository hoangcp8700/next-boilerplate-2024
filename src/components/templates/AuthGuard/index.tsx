'use client';

import { useEffect } from 'react';

import useAuth from '@/shares/hooks/useAuth';
import { Spinner } from '@/components/atoms';

export interface AuthGuardProps {
  children?: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuth, isLoading, initialize } = useAuth();

  useEffect(() => {
    initialize(true);
  }, []);

  if (isLoading && !isAuth) {
    return <Spinner />;
  }

  return children;
};
