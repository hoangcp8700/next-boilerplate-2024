'use client';

import { PropsWithChildren } from 'react';

import useAuth from '@/shares/hooks/useAuth';

import { BaseLayout } from './BaseLayout';

export default function PublicLayout({ children }: PropsWithChildren) {
  const { isAuth, handleLogout } = useAuth();

  return (
    <BaseLayout isAuthenticated={isAuth} onLogout={handleLogout}>
      {children}
    </BaseLayout>
  );
}
