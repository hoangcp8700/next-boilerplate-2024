import { unstable_setRequestLocale } from 'next-intl/server';

import { getTranslations } from '@/i18n/i18nNavigation';
import { Container } from '@/components';
import LoginView from '@/modules/Authentication/Login';

export default function Login({ params }: PageParamsModuleType) {
  unstable_setRequestLocale(params?.locale);

  return (
    <Container>
      <LoginView />
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
