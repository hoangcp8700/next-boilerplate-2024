import { unstable_setRequestLocale } from 'next-intl/server';

import PublicLayout from '@/layouts/PublicLayout';
import { AuthGuard } from '@/components/templates/AuthGuard';

export default function Layout({ params, children }: PageType) {
  unstable_setRequestLocale(params?.locale);

  return (
    <AuthGuard>
      <PublicLayout>{children}</PublicLayout>
    </AuthGuard>
  );
}
