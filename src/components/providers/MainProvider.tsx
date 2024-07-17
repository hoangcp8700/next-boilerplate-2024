import { RTKProvider } from '@/libs/redux/provider';

import { ProgressBar } from '../molecules';

import { ChakraProvider } from './ChakraProvider';
import NextIntlProvider from './NextIntlProvider';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';

// This is the place responsible for grouping all providers from the app
export async function MainProvider({ children, locale }: ProviderType) {
  return (
    <>
      <ProgressBar />
      <NextIntlProvider locale={locale}>
        <RTKProvider>
          <ReactQueryClientProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </ReactQueryClientProvider>
        </RTKProvider>
      </NextIntlProvider>
    </>
  );
}
