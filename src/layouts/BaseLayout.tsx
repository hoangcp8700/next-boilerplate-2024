import { Footer, Header, HeaderProps } from '@/components';

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
