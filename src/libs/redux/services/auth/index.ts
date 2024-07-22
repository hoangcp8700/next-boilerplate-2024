import { createApi } from '@reduxjs/toolkit/query/react';

import { Env } from '@/shares/constants/env';

import { UserStateType } from '../users/type';
import { customFetchBaseQuery } from '../../helpers';

export type AuthType = {
  accessToken: string;
  refreshToken: string;
  user: UserStateType;
};

export type LoginPayloads = {
  email: string;
  password: string;
};

export type SignUpPayloads = {
  email: string;
  userName: string;
  phone: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBaseQuery({
    baseUrl: `${Env.NEXT_PUBLIC_API_BASE_URL}/auth`,
  }),
  endpoints: (builder) => ({
    getAuth: builder.query<ResponseRTK<AuthType>, void>({
      query: () => ({ url: '/' }),
    }),
    login: builder.mutation<ResponseRTK<AuthType>, LoginPayloads>({
      query: (payloads) => ({
        url: '/login',
        method: 'POST',
        body: payloads,
      }),
    }),
    singUp: builder.mutation<void, SignUpPayloads>({
      query: (payloads) => ({
        url: '/register',
        method: 'POST',
        body: payloads,
      }),
    }),
    refresh: builder.mutation<AuthType, { refreshToken: string }>({
      query: (payloads) => ({
        url: '/refresh',
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
