import { QueryClient } from '@tanstack/react-query';

import { AppConfigs } from '@/shares/constants';

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: AppConfigs.defaultQueryOption,
  },
});
