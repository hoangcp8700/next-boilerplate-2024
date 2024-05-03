import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export default function About({ params: { locale } }: PageModuleType) {
  unstable_setRequestLocale(locale);

  const t = useTranslations('pages.About');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {t('meta_title')}
      </div>
    </main>
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
