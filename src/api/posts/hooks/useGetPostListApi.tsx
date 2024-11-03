import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import * as api from '@/api';
import { queryKeys } from '@/shares/constants/query-keys';
import { paginateInitialize } from '@/shares/constants';
import { logger } from '@/libs/logger';

export const useGetPostListApi = () => {
  const [fetchingDelay, setFetchingDelay] = useState(false);
  const router = useRouter();

  const { data, isFetching, fetchNextPage, dataUpdatedAt, ...props } =
    useInfiniteQuery({
      queryKey: [queryKeys.posts],
      queryFn: (params) =>
        api.getPostList({
          skip: params.pageParam || 0,
          limit: paginateInitialize.limit,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPageParams) => {
        return lastPageParams?.limit < lastPageParams.total
          ? lastPageParams.limit + lastPageParams.skip
          : undefined;
      },
      initialData: () => {
        // Return initial data if available (for SSR)
        return { pages: [], pageParams: [] };
      },
    });

  const lastPageParams = useMemo(
    () =>
      data?.pages?.length ? data?.pages[data?.pages.length - 1] : undefined,
    [data.pages],
  );

  const isHasMore = useMemo(
    () =>
      lastPageParams ? lastPageParams?.skip < lastPageParams?.total : false,
    [lastPageParams],
  );

  const formatDataList = useMemo(() => {
    logger.info('render', data?.pages);
    return data?.pages?.reduce(
      (acc: api.PostType[], page) => [...acc, ...(page?.posts || [])],
      [],
    );
  }, [data?.pages]);

  // // prefetch next page
  const onLoadMore = async () => {
    try {
      logger.info(
        '🚀 ~ useGetPostListApi ~ props:',
        dataUpdatedAt,
        isFetching,
        props,
      );
      if (isHasMore && !isFetching && !fetchingDelay) {
        setFetchingDelay(true);
        if (!lastPageParams) return;
        const nextPage =
          Math.floor(lastPageParams?.skip / lastPageParams?.limit) + 1;
        // const nextPage = formatDataList.length / (lastPageParams?.limit || 0);

        logger.info('🚀 ~ pending:');
        await fetchNextPage();
        logger.info('🚀 ~ done:', data, lastPageParams);
        router.replace(`/posts?page=${nextPage}`, { scroll: false });
        setTimeout(() => setFetchingDelay(false), 2000);
      }
    } catch (error) {
      logger.error('Error during onLoadMore:', error);
    }
  };

  return {
    data: formatDataList,
    isLoading: isFetching || fetchingDelay,
    onLoadMore,
  };
};
