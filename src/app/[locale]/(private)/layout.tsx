import PublicLayout from '@/layouts/PublicLayout';
import { AuthGuard } from '@/components/templates/AuthGuard';

export default function Layout({ children }: PageType) {
  return (
    <AuthGuard>
      <PublicLayout>{children}</PublicLayout>
    </AuthGuard>
  );
}
