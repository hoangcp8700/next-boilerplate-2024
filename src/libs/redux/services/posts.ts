import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Post = {
  id: number;
  title: string;
};

export const postsApi = createApi({
  reducerPath: 'postsApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], null>({
      query: () => '/users',
    }),
    getPostById: builder.query<Post, { id: string }>({
      query: ({ id }) => `/users/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
