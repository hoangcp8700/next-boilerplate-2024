import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Suspense } from 'react';

import * as api from '@/api';
import { queryKeys } from '@/shares/constants/query-keys';
import { PostsView } from '@/modules/Posts';
import { Env } from '@/shares/constants/env';
import { getTranslations } from '@/i18n/i18nNavigation';
import { paginateInitialize } from '@/shares/constants';

async function prefetchData() {
  const queryClient = new QueryClient();

  // Pre-fetch the first page of posts
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.posts],
    queryFn: async () =>
      api.getPostList({
        skip: 0,
        limit: paginateInitialize.limit,
      }),
    initialPageParam: 0,
  });

  return dehydrate(queryClient);
}

export default async function Posts() {
  const dehydrateState = await prefetchData();

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrateState}>
      {/* NOTE: Wrapper Suspense components because use router client */}
      <Suspense fallback={<div>Loading...</div>}>
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
    openGraph: {
      type: 'website',
      title: t('meta_title'),
      description: t('meta_description'),
      images: ['https://cdn3.ivivu.com/2023/10/du-lich-sai-gon-ivivu1.jpg'], // REPLACE
      siteName: 'POST  LIST',
      url: `${Env.NEXT_PUBLIC_DOMAIN}/posts`,
    },
  };
}
