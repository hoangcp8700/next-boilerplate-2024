import ProgressBar from '../molecules/ProgressBar';

import { NextIntlProvider } from './NextIntlProvider';

// This is the place responsible for grouping all providers from the app
export const MainProvider = ({ children, locale }: ProviderType) => {
  return (
    <>
      <ProgressBar />
      <NextIntlProvider locale={locale}>{children}</NextIntlProvider>
    </>
  );
};
