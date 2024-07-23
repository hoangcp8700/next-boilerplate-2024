import { unstable_setRequestLocale } from 'next-intl/server';

import PublicLayout from '@/layouts/PublicLayout';

export default function Layout({ params, children }: PageType) {
  unstable_setRequestLocale(params?.locale);

  return <PublicLayout>{children}</PublicLayout>;
}
