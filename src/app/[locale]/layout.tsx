import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/shares/styles/index.css';

import { AppConfigs } from '@/shares/constants';
import { MainProvider } from '@/components';

const inter = Inter({ subsets: ['latin'] });

// either Static metadata
export const metadata: Metadata = AppConfigs.metadata;

export const viewport: Viewport = AppConfigs.viewport;

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return AppConfigs.locales.map((locale) => ({ locale }));
}
