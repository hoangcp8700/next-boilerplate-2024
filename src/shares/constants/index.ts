import { Metadata, Viewport } from 'next';

const defaultQueryOption = {
  retry: 0,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];

const localeNames: Record<Locale, string> = {
  en: 'English',
  vi: 'Việt Nam',
};
const metadata: Metadata = {
  // Output: <title>About | Create Next App</title>
  title: {
    template: '%s | NextJS Boilerplate',
    default: 'NextJS Boilerplate',
  },
  description: 'Generated by NextJS Boilerplate',
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'Typescript'],
  authors: [{ name: 'Hoang' }, { name: 'Phan', url: 'https://nextjs.org' }],
  creator: 'Hoang Cong Phan',
  publisher: 'Hoang Cong Phan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nextjs.org'),
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.5,
  minimumScale: 0.9,
  userScalable: true,
};

export const AppConfigs = {
  name: 'Nextjs Boilerplate',
  locales,
  localeNames,
  defaultLocale: 'en' as Locale,
  defaultQueryOption,
  metadata,
  viewport,
};
