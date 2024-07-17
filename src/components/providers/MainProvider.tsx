import { PropsWithChildren } from 'react';

import { ProgressBar } from '../molecules';

import { ChakraProvider } from './ChakraProvider';
import NextIntlProvider from './NextIntlProvider';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';

// This is the place responsible for grouping all providers from the app
export async function MainProvider({ children }: PropsWithChildren) {
  return (
    <>
      <ProgressBar />
      <NextIntlProvider>
        <ReactQueryClientProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </ReactQueryClientProvider>
      </NextIntlProvider>
    </>
  );
}
