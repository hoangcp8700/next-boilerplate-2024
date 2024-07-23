import { createApi } from '@reduxjs/toolkit/query/react';

import { Env } from '@/shares/constants/env';

import {
  customFetchBaseQuery,
  provideTagDetail,
  provideTagList,
} from '../../helpers';

import { UserRequest, UserStateType } from './type';

const tagType = 'Users' as const;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: [tagType],
  refetchOnFocus: true,
  baseQuery: customFetchBaseQuery({
    baseUrl: Env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserStateType[], void>({
      query: () => ({
        url: '/users',
        credentials: 'include', // to tell RTK Query to send the cookies along with the request.
      }),
      providesTags: (result) => provideTagList(tagType, result),
    }),
    getUserById: builder.query<UserStateType, { id: string }>({
      query: ({ id }) => `/users/${id}`,
      providesTags: (result, error, arg) => provideTagDetail(tagType, arg.id),
    }),
    createUser: builder.mutation<void, UserRequest>({
      query: (newUser) => ({
        url: '/users/create',
        method: 'POST',
        body: newUser,
        credentials: 'include',
      }),
      invalidatesTags: provideTagDetail(tagType, 'List'),
    }),
    updateUser: builder.mutation<
      UserStateType,
      Partial<UserStateType> & Pick<UserStateType, 'id'>
    >({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'POST',
        body,
        credentials: 'include',
      }),
      invalidatesTags: (result, error, arg) =>
        provideTagDetail(tagType, arg.id),
    }),

    deleteUser: builder.mutation<
      UserStateType,
      Partial<UserStateType> & Pick<UserStateType, 'id'>
    >({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'DELETE',
        body,
        credentials: 'include',
      }),
      invalidatesTags: provideTagDetail(tagType, 'List'),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi;
