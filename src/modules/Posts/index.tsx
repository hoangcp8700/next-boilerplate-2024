'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import Link from '@/components/atoms/Link';
import { RouterName } from '@/shares/constants/router';

import { useGetPostListApi } from './hooks/useGetPostListApi';

export function PostsView() {
  const t = useTranslations('pages.Post');
  const { data } = useGetPostListApi();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Total posts: {data?.total}
        <div className="flex flex-col gap-y-4">
          {data?.posts?.map((el) => (
            <div className="bg-red-200 px-4 py-2" key={el.id}>
              <Link href={`${RouterName.posts}/${el.id}`}>{el.title}</Link>
            </div>
          ))}
        </div>
        {t('meta_title')}
      </div>
    </main>
  );
}
