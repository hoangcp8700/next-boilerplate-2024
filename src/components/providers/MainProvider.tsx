import { ProgressBar } from '../molecules';

import { ChakraProvider } from './ChakraProvider';
import { NextIntlProvider } from './NextIntlProvider';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';

// This is the place responsible for grouping all providers from the app
export const MainProvider = ({ children, locale }: ProviderType) => {
  return (
    <>
      <ProgressBar />
      <NextIntlProvider locale={locale}>
        <ReactQueryClientProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </ReactQueryClientProvider>
      </NextIntlProvider>
    </>
  );
};
