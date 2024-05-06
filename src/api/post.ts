import { Env } from '@/shares/constants/env';

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
  const response = await fetch(`${Env.NEXT_API_BASE_URL}/posts/${id}`);
  return response.json();
};

export const getPostList = async (): Promise<PostPaginateType> => {
  const response = await fetch(`${Env.NEXT_API_BASE_URL}/posts/`);
  return response.json();
};
