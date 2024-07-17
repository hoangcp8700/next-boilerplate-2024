import { getTranslations } from '@/i18n/i18nNavigation';
import { Container } from '@/components';
import LoginView from '@/modules/Login';

export default function Login() {
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
