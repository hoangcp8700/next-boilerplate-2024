import { QueryClient } from '@tanstack/react-query';

import { DEFAULT_QUERY_OPTION } from '@/shares/constants';

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_OPTION,
  },
});
