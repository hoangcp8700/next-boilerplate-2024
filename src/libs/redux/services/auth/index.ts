import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserStateType } from '../users/type';

import { LoginPayloads, SignUpPayloads } from './type';

export type AuthType = {
  accessToken: string;
  refreshToken: string;
  user: UserStateType;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (builder) => ({
    getAuth: builder.query<UserStateType, void>({
      query: () => '/auth',
    }),
    login: builder.mutation<AuthType, LoginPayloads>({
      query: (payloads) => ({
        url: '/login',
        method: 'POST',
        body: payloads,
      }),
    }),
    singUp: builder.mutation<void, SignUpPayloads>({
      query: (payloads) => ({
        url: '/signUp',
        method: 'POST',
        body: payloads,
      }),
    }),
    refresh: builder.mutation<AuthType, { refreshToken: string }>({
      query: (payloads) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: payloads,
      }),
    }),
  }),
});

export const {
  useGetAuthQuery,
  useLoginMutation,
  useSingUpMutation,
  useRefreshMutation,
} = authApi;
