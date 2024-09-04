import type { MetadataRoute } from 'next';

import { getDefaultSiteMap } from '@/shares/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  return getDefaultSiteMap();
}
