import PublicLayout from '@/layouts/PublicLayout';
import { PublicGuard } from '@/components/templates/PublicGuard';

export default function Layout({ children }: PageType) {
  return (
    <PublicGuard isCheckAuth>
      <PublicLayout>{children}</PublicLayout>
    </PublicGuard>
  );
}
