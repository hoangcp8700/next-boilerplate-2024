import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Suspense } from 'react';

import * as api from '@/api';
import { queryKeys } from '@/shares/constants/query-keys';
import { PostsView } from '@/modules/Posts';

export default async function Posts({
  params: { locale },
}: PageParamsModuleType) {
  unstable_setRequestLocale(locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.posts],
    queryFn: () => api.getPostList(),
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* NOTE: Wrapper Suspense components because use router client */}
      <Suspense>
        <PostsView />
      </Suspense>
    </HydrationBoundary>
  );
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'pages.Post',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}
