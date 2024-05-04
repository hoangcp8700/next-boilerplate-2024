import { NextIntlClientProvider, useMessages } from 'next-intl';

export const NextIntlProvider = ({ children, locale }: ProviderType) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
