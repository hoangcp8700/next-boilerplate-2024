import {
  setCookie,
  getCookie,
  deleteCookie,
  CookieValueTypes,
} from 'cookies-next';

import { cookieKeys } from '../constants';

export const getAccessToken = () =>
  getCookie(cookieKeys.accessToken)?.toString();

export const setAccessToken = (token: string): void => {
  const expirationTime = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);

  setCookie(cookieKeys.accessToken, token, {
    expires: expirationTime,
  });
};
// --------------------------
export const getRefreshToken = (): CookieValueTypes | null => {
  return getCookie(cookieKeys.refreshToken);
};

export const setRefreshToken = (token: string): void => {
  setCookie(cookieKeys.refreshToken, token);
};

export const removeAccessToken = (): void => {
  deleteCookie(cookieKeys.accessToken);
  deleteCookie(cookieKeys.refreshToken);
};
