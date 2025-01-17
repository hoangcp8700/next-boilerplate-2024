import { Suspense } from 'react';

import { RTKProvider } from '@/libs/redux/provider';
import { ProtectedRoute } from '@/components';

import { ChakraProvider } from './ChakraProvider';
import NextIntlProvider from './NextIntlProvider';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';

// This is the place responsible for grouping all providers from the app
export async function MainProvider({ children, locale }: ProviderType) {
  return (
    <RTKProvider>
      <Suspense>
        <NextIntlProvider locale={locale}>
          <ReactQueryClientProvider>
            <ChakraProvider>
              <ProtectedRoute>{children}</ProtectedRoute>
            </ChakraProvider>
          </ReactQueryClientProvider>
        </NextIntlProvider>
      </Suspense>
    </RTKProvider>
  );
}
