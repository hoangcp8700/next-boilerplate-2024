'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';

import { Container, Loading } from '@/components';
import { useGetUserByIdQuery } from '@/libs/redux';

export function UserDetailView({ id }: { id: string }) {
  const t = useTranslations('pages.User');
  const { data, isLoading } = useGetUserByIdQuery({ id });

  if (isLoading) return <Loading />;
  if (!data?.id) {
    notFound();
  }

  return (
    <Container>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        User detail: {data?.name} {data?.id}
        {t('meta_title')}
      </div>
    </Container>
  );
}
