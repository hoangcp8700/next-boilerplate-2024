import { NextIntlProvider } from './NextIntlProvider';

// This is the place responsible for grouping all providers from the app
export const MainProvider = ({ children, locale }: ProviderType) => {
  return <NextIntlProvider locale={locale}>{children}</NextIntlProvider>;
};
