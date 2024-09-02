'use client';

import { PropsWithChildren, useEffect } from 'react';

import { Loading } from '@/components/atoms';
import useAuth from '@/shares/hooks/useAuth';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isLoading: authLoading, initialize } = useAuth();

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authLoading) {
    return <Loading />;
  }
  return children;
};

export default ProtectedRoute;
