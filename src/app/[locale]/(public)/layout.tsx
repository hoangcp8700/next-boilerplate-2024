import { unstable_setRequestLocale } from 'next-intl/server';

import { useTranslations } from '@/i18n/i18nNavigation';
import { Link, LocaleSwitcher } from '@/components';
import { BaseTemplate } from '@/layouts/BaseLayout';

export default function Layout({ params, children }: PageType) {
  unstable_setRequestLocale(params?.locale);

  const t = useTranslations('navigate');

  return (
    <BaseTemplate
      leftNav={
        <>
          <li>
            <Link
              href="/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('home_link')}
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('about_link')}
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              User
            </Link>
          </li>
          <li>
            <Link
              href="/posts"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('posts_link')}
            </Link>
          </li>

          <li>
            <a
              className="border-none text-gray-700 hover:text-gray-900"
              href="https://github.com/ixartz/Next-js-Boilerplate"
            >
              GitHub
            </a>
          </li>
        </>
      }
      rightNav={
        <>
          <li>
            <Link
              href="/login"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
          </li>

          <li>
            <LocaleSwitcher />
          </li>
        </>
      }
    >
      <div className="py-5 text-xl [&_p]:my-6">{children}</div>
    </BaseTemplate>
  );
}
