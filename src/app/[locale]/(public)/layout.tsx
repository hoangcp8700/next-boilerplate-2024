import Link from '@/components/atoms/Link';
import LocaleSwitcher from '@/components/organisms/LocaleSwitcher';
import { BaseTemplate } from '@/layouts/BaseLayout';
import { useTranslations } from '@/libs/i18nNavigation';

export default function Layout(props: { children: React.ReactNode }) {
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
              href="/test"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('about_link')}_test
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
              href="/sign-in"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('sign_in_link')}
            </Link>
          </li>

          <li>
            <Link
              href="/sign-up"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('sign_up_link')}
            </Link>
          </li>

          <li>
            <LocaleSwitcher />
          </li>
        </>
      }
    >
      <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
    </BaseTemplate>
  );
}
