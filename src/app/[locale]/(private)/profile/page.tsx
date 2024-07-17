import { unstable_setRequestLocale } from 'next-intl/server';

import { Container } from '@/components';
import { getTranslations, useTranslations } from '@/i18n/i18nNavigation';

export default function UserProfile({ params }: PageParamsModuleType) {
  unstable_setRequestLocale(params.locale);

  const t = useTranslations('pages.Profile');
  return (
    <Container className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {t('meta_title')}
      </div>
    </Container>
  );
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'pages.Profile',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}
