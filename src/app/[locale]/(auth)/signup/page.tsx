import { unstable_setRequestLocale } from 'next-intl/server';

import { getTranslations } from '@/i18n/i18nNavigation';
import { Container } from '@/components';
import SignUpView from '@/modules/Authentication/SignUp';

export default function SignUp({ params }: PageParamsModuleType) {
  unstable_setRequestLocale(params?.locale);

  return (
    <Container>
      <SignUpView />
    </Container>
  );
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'pages.SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}
