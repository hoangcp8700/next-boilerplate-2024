import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import * as api from '@/api';
import { filterEmptyKeys, queryKeys } from '@/shares/constants/query-keys';
import { paginateInitialize } from '@/shares/constants';

export const useGetPostListApi = () => {
  const queryClient = useQueryClient();

  // NEXT DATA WITH SKIP field
  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: filterEmptyKeys([queryKeys.posts]),
    queryFn: (params) => {
      return api.getPostList({
        skip: params.pageParam,
        limit: paginateInitialize.limit,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPageParams, _pages) => {
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
  const onLoadMore = () => {
    if (!lastPageParams || !isHasMore) return;
    fetchNextPage();
  };

  const prefetchNextList = async () => {
    if (!lastPageParams) return;

    // The results of this query will be cached like a normal query
    await queryClient.prefetchInfiniteQuery({
      queryKey: filterEmptyKeys([queryKeys.posts]),
      queryFn: () => {
        return api.getPostList({
          skip: lastPageParams?.skip + paginateInitialize.limit,
          limit: paginateInitialize.limit,
        });
      },
      initialPageParam: lastPageParams?.skip,
    });
  };

  // // prefetch next page
  useEffect(() => {
    if (isHasMore && lastPageParams) {
      prefetchNextList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHasMore, lastPageParams]);

  return { data: formatDataList, isLoading: isFetching, onLoadMore };
};
