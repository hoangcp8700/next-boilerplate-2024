import { Env } from '@/shares/constants/env';
import { getTranslations } from '@/i18n/i18nNavigation';
import { Container } from '@/components';
import { UsersView } from '@/modules/Users';

export default async function Users() {
  return (
    <Container>
      <UsersView />
    </Container>
  );
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'pages.User',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    openGraph: {
      type: 'website',
      title: t('meta_title'),
      description: t('meta_description'),
      images: ['https://cdn3.ivivu.com/2023/10/du-lich-sai-gon-ivivu1.jpg'], // REPLACE
      siteName: 'User LIST',
      url: `${Env.NEXT_PUBLIC_DOMAIN}/users`,
    },
  };
}
