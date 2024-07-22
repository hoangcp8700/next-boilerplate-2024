---
to: src/app/[locale]/(<%= structure %>)/<%= h.changeCase.kebabCase(name) %>/page.tsx
---
import { unstable_setRequestLocale } from 'next-intl/server';

import { useTranslations, getTranslations } from '@/i18n/i18nNavigation';

export default function <%= h.changeCase.pascalCase(name) %>({ params }: PageParamsModuleType) {
  unstable_setRequestLocale(params?.locale);
  const t = useTranslations('pages.<%= h.changeCase.pascalCase(name) %>');
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
    namespace: 'pages.<%= h.changeCase.pascalCase(name) %>',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}
