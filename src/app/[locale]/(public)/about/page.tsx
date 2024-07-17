import { Container } from '@/components';
import { getTranslations, useTranslations } from '@/i18n/i18nNavigation';

export default function About() {
  const t = useTranslations('pages.About');
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
    namespace: 'pages.About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}
