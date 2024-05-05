'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

import { queryClientConfig } from '@/libs/react-query';

export const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = React.useState(() => queryClientConfig);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
