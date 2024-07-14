import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Container } from '@/components';

export default function Login({ params: { locale } }: PageParamsModuleType) {
  unstable_setRequestLocale(locale);

  const t = useTranslations('pages.Login');
  return (
    <Container>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {t('meta_title')}
      </div>
    </Container>
  );
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'pages.Login',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}
