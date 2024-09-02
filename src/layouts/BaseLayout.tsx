import { Footer, Header } from '@/components';
import { HeaderProps } from '@/components/templates/Header';

interface BaseLayoutProps extends HeaderProps {}
const BaseLayout = ({ children, ...headerProps }: BaseLayoutProps) => {
  return (
    <div>
      <Header {...headerProps} />
      <main className="flex-col-center min-h-[82vh]">{children}</main>
      <Footer />
    </div>
  );
};

export { BaseLayout };
