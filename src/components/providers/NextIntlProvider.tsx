import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { PropsWithChildren } from 'react';

export default async function NextIntlProvider({
  children,
}: PropsWithChildren) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
