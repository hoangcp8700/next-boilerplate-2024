import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { useTranslations as useTranslationsApp } from 'next-intl';
import { ComponentProps } from 'react';
import { getTranslations as getTranslationsApp } from 'next-intl/server';

import { AppConfigs } from '@/shares/constants';

export const {
  Link: LinkI18n,
  usePathname,
  useRouter,
  redirect,
  permanentRedirect,
} = createSharedPathnamesNavigation({
  locales: AppConfigs.locales,
  localePrefix: 'as-needed',
});

export type LinkI18nInterface = ComponentProps<typeof LinkI18n>;

export const useTranslations = useTranslationsApp;

export const getTranslations = getTranslationsApp;
