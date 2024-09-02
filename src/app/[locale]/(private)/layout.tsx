import PrivateLayout from '@/layouts/PrivateLayout';

export default function Layout({ children }: PageType) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
