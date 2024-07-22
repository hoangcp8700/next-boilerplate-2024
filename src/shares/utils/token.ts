import {
  setCookie,
  getCookie,
  deleteCookie,
  CookieValueTypes,
} from 'cookies-next';

import { cookieKeys, sessionKeys } from '../constants';

import { createSession, removeSession } from './session';

import { isBrowser } from '.';

let accessToken: string | null = null;

if (isBrowser()) {
  accessToken = window.sessionStorage.getItem(sessionKeys.auth);
  /**
   * Listen for changes from other tabs
   */
  window.addEventListener('storage', (event) => {
    if (event.key === 'token') {
      accessToken = event.newValue;
    }
  });
}

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string): void => {
  accessToken = token;
  createSession(sessionKeys.auth, token);
};
// --------------------------
export const getRefreshToken = (): CookieValueTypes | null => {
  return getCookie(cookieKeys.refreshToken);
};

export const setRefreshToken = (token: string): void => {
  setCookie(cookieKeys.refreshToken, token);
};

export const removeAccessToken = (): void => {
  accessToken = null;
  removeSession(sessionKeys.auth);
  deleteCookie(cookieKeys.refreshToken);
};
