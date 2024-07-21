'use client';

import React from 'react';

import { Link, Message, Text } from '@/components';
import ScrollInfiniteList from '@/components/organisms/ScrollInfiniteList';
import { useMessages } from '@/i18n/hooks';
import { RouterName } from '@/shares/constants/router';
import {
  counterAction,
  useDispatch,
  useGetUsersQuery,
  useSelector,
} from '@/libs/redux';

export function UsersView() {
  const messages = useMessages();
  const { isLoading, isFetching, data } = useGetUsersQuery();
  const count = useSelector((state) => state.counter.value); // Access the counter state
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button onClick={() => dispatch(counterAction.increment())}>
          increment
        </button>
        <button
          onClick={() => dispatch(counterAction.decrement())}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button onClick={() => dispatch(counterAction.reset())}>reset</button>
      </div>

      <ScrollInfiniteList
        className="flex flex-col gap-3 gap-y-4"
        loading={isLoading || isFetching}
        // onLoadMore={onLoadMore}
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
            <Link href={`${RouterName.users}/${el.id}`}>
              {el.id} -- {el.name}
            </Link>
          </div>
        ))}
      </ScrollInfiniteList>
    </>
  );
}
