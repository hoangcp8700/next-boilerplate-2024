'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { useGetPostListApi } from '@/shares/hooks/api/posts/useGetPostListApi';

export function PostsView() {
  const t = useTranslations('pages.Post');
  const { data } = useGetPostListApi();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Total posts: {data?.total}
        {t('meta_title')}
      </div>
    </main>
  );
}
