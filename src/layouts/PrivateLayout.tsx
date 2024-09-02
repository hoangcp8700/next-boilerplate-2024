'use client';

import { PropsWithChildren } from 'react';

import withAuth from '@/shares/utils/withAuth';

import PublicLayout from './PublicLayout';

function PrivateLayout({ children }: PropsWithChildren) {
  return <PublicLayout>{children}</PublicLayout>;
}

// Wrap the layout component with `withAuth`
export default withAuth(PrivateLayout);
