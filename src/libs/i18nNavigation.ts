import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { useTranslations as useTranslationsApp } from 'next-intl';

import { AppConfigs } from '@/shares/constants';

export const { Link, usePathname, useRouter, redirect, permanentRedirect } =
  createSharedPathnamesNavigation({
    locales: AppConfigs.locales,
    localePrefix: 'as-needed',
  });

export const useTranslations = useTranslationsApp;
