import { unstable_setRequestLocale } from 'next-intl/server';

import PublicLayout from '@/layouts/PublicLayout';
import { PublicGuard } from '@/components/templates/PublicGuard';

export default function Layout({ params, children }: PageType) {
  unstable_setRequestLocale(params?.locale);

  return (
    <PublicGuard>
      <PublicLayout>{children}</PublicLayout>
    </PublicGuard>
  );
}
