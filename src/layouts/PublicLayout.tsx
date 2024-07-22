'use client';

import { PropsWithChildren } from 'react';

import { useTranslations } from '@/i18n/i18nNavigation';
import { Button, Link, LocaleSwitcher } from '@/components';
import { RouterName } from '@/shares/constants/router';
import useAuth from '@/shares/hooks/useAuth';

import { BaseLayout } from './BaseLayout';

export default function PublicLayout({ children }: PropsWithChildren) {
  const t = useTranslations('navigate');
  const { isAuth, handleLogout } = useAuth();

  return (
    <BaseLayout
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
          {isAuth ? (
            <>
              <li>
                <Link
                  href={RouterName.profile}
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  {t('profile')}
                </Link>
              </li>
              <li>
                <Button onClick={handleLogout}>Logout</Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href={RouterName.login}
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  {t('login')}
                </Link>
              </li>
              <li>
                <Link
                  href={RouterName.signUp}
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  {t('singUp')}
                </Link>
              </li>
            </>
          )}

          <li>
            <LocaleSwitcher />
          </li>
        </>
      }
    >
      {children}
    </BaseLayout>
  );
}
