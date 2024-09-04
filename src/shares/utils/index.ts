import { MetadataRoute } from 'next';

import { RouterName } from '../constants/router';
import { locales } from '../constants';
import { Env } from '../constants/env';

export * from './queryString';
export * from './file';
export * from './validate';
export * from './string';
export * from './price';

export const isBrowser = (): boolean => typeof window !== 'undefined';

// Extract the type of the elements in the array
type SingleSitemap = MetadataRoute.Sitemap extends (infer T)[] ? T : never;

export const sitemapUrls = (pathname?: string) => {
  return locales.reduce(
    (acc, lang) => {
      acc[lang] = `${Env.NEXT_PUBLIC_DOMAIN}/${lang}${pathname || ''}`;
      return acc;
    },
    {} as Record<string, string>,
  );
};

export const getSingleSiteMap = (
  pathname?: string,
  options?: Partial<SingleSitemap>,
): MetadataRoute.Sitemap => {
  return [
    {
      url: `${Env.NEXT_PUBLIC_DOMAIN}${pathname}`, // It tells search engines exactly
      lastModified: new Date(), // This indicates the date when the content of the URL was last updated.
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: sitemapUrls(pathname),
      },
      ...options,
    },
  ];
};

export const getDefaultSiteMap = (): MetadataRoute.Sitemap => {
  const initialize: SingleSitemap[] = [
    {
      url: RouterName.home,
    },
    {
      url: RouterName.about,
    },
    {
      url: RouterName.blogs,
      changeFrequency: 'daily',
    },
  ];

  const sitemapValues: MetadataRoute.Sitemap = [];

  for (const { url, ...sitemapPayload } of initialize) {
    sitemapValues.push(...getSingleSiteMap(url, sitemapPayload));
  }

  return sitemapValues;
};
