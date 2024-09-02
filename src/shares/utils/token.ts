'use server';
import { cookies } from 'next/headers';

import { cookieKeys } from '../constants';

export const getCookie = (keyValue: string) => {
  const cookieStore = cookies();
  return cookieStore.get(keyValue)?.toString();
};

export const getAccessToken = () => getCookie(cookieKeys.accessToken);

export const setAccessToken = (token: string): void => {
  const expirationTime = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);

  cookies().set({
    name: cookieKeys.accessToken,
    value: token,
    expires: expirationTime,
  });
};
// --------------------------
export const getRefreshToken = () => {
  return getCookie(cookieKeys.refreshToken);
};

export const setRefreshToken = (token: string): void => {
  cookies().set({
    name: cookieKeys.refreshToken,
    value: token,
  });
};

export const removeAccessToken = (): void => {
  cookies().delete(cookieKeys.accessToken);
  cookies().delete(cookieKeys.refreshToken);
};
