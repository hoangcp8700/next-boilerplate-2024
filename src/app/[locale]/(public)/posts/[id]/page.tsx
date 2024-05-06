import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import * as api from '@/api';
import { queryKeys } from '@/shares/constants/query-keys';
import { PostDetailView } from '@/modules/Posts/detail';

export default async function PostDetail({
  params: { locale, id },
}: PageParamsModuleType) {
  unstable_setRequestLocale(locale);

  const queryClient = new QueryClient();

  if (id) {
    await queryClient.prefetchQuery({
      queryKey: [queryKeys.posts, id],
      queryFn: () => api.getPostDetail(id),
    });
  }

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailView id={id} />
    </HydrationBoundary>
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
