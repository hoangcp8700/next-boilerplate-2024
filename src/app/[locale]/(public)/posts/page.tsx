import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import * as api from '@/api';
import { queryKeys } from '@/shares/constants/query-keys';
import { PostsView } from '@/views/Posts';

export default async function Posts({
  params: { locale },
}: PageParamsModuleType<any>) {
  unstable_setRequestLocale(locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.posts],
    queryFn: api.getPostList,
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsView />
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
