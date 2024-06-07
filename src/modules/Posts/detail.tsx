'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';

import { Container, Loading } from '@/components';

import { useGetPostDetailApi } from './hooks/useGetPostDetailApi';

export function PostDetailView({ id }: { id: string }) {
  const t = useTranslations('pages.Post');
  const { data, isLoading } = useGetPostDetailApi(id);

  if (isLoading) return <Loading />;
  if (!data?.id) {
    notFound();
  }

  return (
    <Container>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        post detail: {data?.title} {data?.id}
        {t('meta_title')}
      </div>
    </Container>
  );
}
