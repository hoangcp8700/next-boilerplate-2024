'use client';

import React from 'react';

import { RouterName } from '@/shares/constants';
import { Container, Link, Message, Text } from '@/components';
import ScrollInfiniteList from '@/components/organisms/ScrollInfiniteList';
import { useMessages } from '@/i18n/hooks';

import { useGetPostListApi } from './hooks/useGetPostListApi';

export function PostsView() {
  const messages = useMessages();
  const { data, isLoading, onLoadMore } = useGetPostListApi();

  return (
    <Container>
      <ScrollInfiniteList
        className="flex flex-col gap-3 gap-y-4"
        loading={isLoading}
        onLoadMore={onLoadMore}
        noItem={() =>
          !data?.length ? (
            <Message>
              <Text>{messages('no_data')}</Text>
            </Message>
          ) : null
        }
      >
        {data?.map((el) => (
          <div className="bg-red-200 px-4 py-2" key={el.id}>
            <Link href={`${RouterName.posts}/${el.id}`}>
              {el.id} -- {el.title}
            </Link>
          </div>
        ))}
      </ScrollInfiniteList>
    </Container>
  );
}
