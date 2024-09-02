'use client';

import { Button, Container, Link, Spinner } from '@/components/atoms';
import { LocaleSwitcher } from '@/components/organisms';
import { useTranslations } from '@/i18n/i18nNavigation';
import { AppConfigs } from '@/shares/constants';
import { RouterName } from '@/shares/constants/router';

export interface HeaderProps {
  children?: React.ReactNode;
  isAuthenticated?: boolean;
  loading?: boolean;
  onLogout?: () => void;
}

export const Header = ({ isAuthenticated, loading, onLogout }: HeaderProps) => {
  const t = useTranslations('navigate');

  return (
    <header className="flex min-h-[80px] flex-col justify-center border-b border-gray-300">
      <Container>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {AppConfigs.name}
          </h1>
        </div>

        <div className="flex justify-between">
          <nav>
            <ul className="flex flex-wrap gap-2 text-xl">
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
            </ul>
          </nav>

          <nav>
            <ul className="flex flex-wrap gap-2 text-xl">
              <>
                {loading ? (
                  <li>
                    <Spinner />
                  </li>
                ) : isAuthenticated ? (
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
                      <Button onClick={onLogout}>Logout</Button>
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
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};
