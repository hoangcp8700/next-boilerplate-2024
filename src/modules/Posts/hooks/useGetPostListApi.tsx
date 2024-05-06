import { useQuery } from '@tanstack/react-query';

import * as api from '@/api';
import { queryKeys } from '@/shares/constants/query-keys';

export const useGetPostListApi = () => {
  // Note that we are using useQuery here instead of useSuspenseQuery.
  // Because this data has already been prefetched, there is no need to
  // ever suspend in the component itself. If we forget or remove the
  // prefetch, this will instead fetch the data on the client, while
  // using useSuspenseQuery would have had worse side effects.

  return useQuery({
    queryKey: [queryKeys.posts],
    queryFn: () => api.getPostList(),
  });
};
