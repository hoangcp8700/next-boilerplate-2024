'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClientConfig } from '@/libs/react-query';

export const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = React.useState(() => queryClientConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
