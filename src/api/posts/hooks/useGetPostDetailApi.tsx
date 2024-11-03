import { useQuery } from '@tanstack/react-query';

import * as api from '@/api';
import { queryKeys } from '@/shares/constants/query-keys';

export const useGetPostDetailApi = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.posts, id],
    queryFn: () => api.getPostDetail(id),
    enabled: !!id,
  });
};
