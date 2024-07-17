import { getTranslations } from '@/i18n/i18nNavigation';
import { Container } from '@/components';
import { UserDetailView } from '@/modules/Users/detail';

export default async function UserDetail({
  params: { id },
}: PageParamsModuleType) {
  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <Container>
      <UserDetailView id={id} />
    </Container>
  );
}

export async function generateMetadata(props: { params: PageParamsType }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'pages.Post',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}
