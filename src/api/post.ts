import { urlRequest } from './helpers';

// types
export interface PostPaginateType {
  posts: PostType[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostType {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

// services
export const getPostDetail = async (id: string): Promise<PostType> => {
  const response = await fetch(urlRequest(`/posts/${id}`));
  return response.json();
};

export const getPostList = async (
  params?: PaginationParamsType,
): Promise<PostPaginateType> => {
  const response = await fetch(urlRequest('/posts', params));
  return response.json();
};
