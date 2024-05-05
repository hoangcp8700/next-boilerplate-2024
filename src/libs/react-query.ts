import { QueryClient as ReactQueryClient } from '@tanstack/react-query';

import { AppConfigs } from '@/shares/constants';

export const queryClientConfig = new ReactQueryClient({
  defaultOptions: {
    queries: AppConfigs.defaultQueryOption,
  },
});
