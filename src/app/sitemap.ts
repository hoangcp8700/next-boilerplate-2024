import type { MetadataRoute } from 'next';

import { getDefaultSiteMap } from '@/shares/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return getDefaultSiteMap();
}
