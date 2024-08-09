import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import * as api from '@/api';
import { queryKeys } from '@/shares/constants/query-keys';
import { paginateInitialize } from '@/shares/constants';
import { logger } from '@/libs/logger';
import useHasChanged from '@/shares/hooks/useHasChanged';

export const useGetPostListApi = () => {
  const queryClient = useQueryClient();

  // NEXT DATA WITH SKIP field
  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
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
  });

  const lastPageParams = useMemo(() => {
    if (!data?.pages?.length) return undefined;
    return data?.pages[data?.pages.length - 1];
  }, [data?.pages]);

  const isHasMore = useMemo(() => {
    if (!lastPageParams) return false;
    return lastPageParams.skip < lastPageParams.total;
  }, [lastPageParams]);

  const formatDataList = useMemo(() => {
    if (!data?.pages?.length) return [];
    return data?.pages.reduce(
      (acc: api.PostType[], page) => [...acc, ...(page?.posts || [])],
      [],
    );
  }, [data?.pages]);

  // // prefetch next page
  const onLoadMore = async () => {
    try {
      if (!lastPageParams || isFetching) return;
      await fetchNextPage();
    } catch (error) {
      logger.error('Error during onLoadMore:', error);
    }
  };

  const prefetchNextList = async () => {
    if (!data?.pages || !lastPageParams) return;

    try {
      const newSkipParams = lastPageParams?.skip + paginateInitialize.limit;

      // The results of this query will be cached like a normal query
      await queryClient.prefetchInfiniteQuery({
        queryKey: [queryKeys.posts],
        queryFn: () =>
          api.getPostList({
            skip: newSkipParams,
            limit: paginateInitialize.limit,
          }),
        initialPageParam: newSkipParams,
        getNextPageParam: (nLastPageParams: any) => {
          return nLastPageParams?.limit < nLastPageParams.total
            ? nLastPageParams.limit + nLastPageParams.skip
            : undefined;
        },
      });

      // Check the cache after prefetching
      // const cachedData = queryClient.getQueryData([queryKeys.posts]);
      // logger.info('Cached data after prefetch:', cachedData);
    } catch (error) {
      logger.error('Error during prefetch:', error);
    }
  };

  // // prefetch next page
  const lastPageParamsChanged = useHasChanged([lastPageParams?.skip]);
  useEffect(() => {
    if (lastPageParamsChanged && data && isHasMore && lastPageParams) {
      prefetchNextList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHasMore, lastPageParams, data, lastPageParamsChanged]);

  return {
    data: formatDataList,
    isLoading: isFetching,
    onLoadMore,
  };
};
