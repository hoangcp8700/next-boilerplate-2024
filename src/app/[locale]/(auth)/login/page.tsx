import { getTranslations } from '@/i18n/i18nNavigation';
import { Container } from '@/components';
import LoginView from '@/views/Login';

export default function Login() {
  return (
    <Container>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <LoginView />
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
