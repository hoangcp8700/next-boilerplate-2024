'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';

import { useGetPostDetailApi } from './hooks/useGetPostDetailApi';

export function PostDetailView({ id }: { id: string }) {
  const t = useTranslations('pages.Post');
  const { data, isLoading } = useGetPostDetailApi(id);

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!data?.id) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        post detail: {data?.title} {data?.id}
        {t('meta_title')}
      </div>
    </main>
  );
}
