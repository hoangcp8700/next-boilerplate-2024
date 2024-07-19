import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { provideTagDetail, provideTagList } from '../../helpers';

import { UserRequest, UserStateType } from './type';

const tagType = 'Users' as const;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: [tagType],
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserStateType[], void>({
      query: () => '/users',
      providesTags: (result) => provideTagList(tagType, result),
    }),
    getUserById: builder.query<UserStateType, { id: string }>({
      query: ({ id }) => `/users/${id}`,
      providesTags: (result, error, arg) => provideTagDetail(tagType, arg.id),
    }),
    addUser: builder.mutation<void, UserRequest>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: provideTagDetail(tagType, 'List'),
    }),
    editUser: builder.mutation<
      UserStateType,
      Partial<UserStateType> & Pick<UserStateType, 'id'>
    >({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) =>
        provideTagDetail(tagType, arg.id),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
