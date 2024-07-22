import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { unstable_setRequestLocale } from 'next-intl/server';

import { MainProvider } from '@/components';
import { AppConfigs } from '@/shares/constants';

import '@/shares/styles/index.css';

const inter = Inter({ subsets: ['latin'] });

// either Static metadata
export const metadata: Metadata = AppConfigs.metadata;

export const viewport: Viewport = AppConfigs.viewport;

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <MainProvider locale={locale}>{children}</MainProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return AppConfigs.locales.map((locale) => ({ locale }));
}
