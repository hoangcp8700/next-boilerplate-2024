import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { AppConfigs } from '@/shares/constants';

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AppConfigs.locales,
  localePrefix: 'as-needed',
});
