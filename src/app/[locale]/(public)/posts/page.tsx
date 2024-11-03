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
import { logger } from '@/libs/logger';

async function prefetchData(page = 0) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.posts],
    queryFn: (params) =>
      api.getPostList({
        skip: params.pageParam || 0,
        limit: paginateInitialize.limit,
      }),
    initialPageParam: page,
    getNextPageParam: (lastPageParams: api.PostPaginateType) => {
      return lastPageParams?.skip < lastPageParams.total
        ? lastPageParams.skip + lastPageParams.limit
        : undefined;
    },
  });

  return dehydrate(queryClient);
}

export default async function Posts({ searchParams }: any) {
  // const dehydrateState = await prefetchData();

  const page = Number(searchParams.skip) || 0; // Get the page from URL parameters
  logger.info('🚀 ~ Posts ~ searchParams:', searchParams, page);
  // TODO: prefetch incorrect
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
