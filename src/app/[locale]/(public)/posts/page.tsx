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

export default async function Posts() {
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
