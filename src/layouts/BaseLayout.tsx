import { Container } from '@/components';
import { AppConfigs } from '@/shares/constants';

const BaseLayout = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <header className="flex min-h-[80px] flex-col justify-center border-b border-gray-300">
        <Container>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {AppConfigs.name}
            </h1>
          </div>

          <div className="flex justify-between">
            <nav>
              <ul className="flex flex-wrap gap-2 text-xl">{props.leftNav}</ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-2 text-xl">{props.rightNav}</ul>
            </nav>
          </div>
        </Container>
      </header>

      <main className="flex-col-center min-h-[82vh]">{props.children}</main>

      <footer className="border-t border-gray-300 py-4 text-center text-sm">
        <Container>
          © Copyright {new Date().getFullYear()} {AppConfigs.name}. Made With{' '}
          <a
            href="https://creativedesignsguru.com"
            className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          >
            CreativeDesignsGuru
          </a>
          .
          {/*
           * PLEASE READ THIS SECTION
           * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
           */}
        </Container>
      </footer>
    </div>
  );
};

export { BaseLayout };
