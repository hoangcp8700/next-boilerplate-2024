'use client';

import { setCookie, getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { logger } from '@/libs/logger';
import {
  authAction,
  AuthType,
  useDispatch,
  useGetAuthQuery,
  useLoginMutation,
  useRefreshMutation,
  useSelector,
} from '@/libs/redux';
import { LoginPayloads } from '@/libs/redux/services/auth/type';
import { cookieKeys, sessionKeys } from '@/shares/constants';
import { createSession, getSession } from '@/shares/utils/session';
import { useRouter } from '@/i18n/i18nNavigation';
import { RouterName } from '@/shares/constants/router';

const delay = (time = 3000) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, time);
  });

const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.auth.user);

  const [isChecking, setIsChecking] = useState(true);

  const redirectUrl = searchParams.get('redirect');

  const { refetch: _refetchUser, isLoading: refetchUserLoading } =
    useGetAuthQuery(undefined, {
      skip: true,
    });

  const [_login, { isLoading: loginLoading }] = useLoginMutation();
  const [refresh, { isLoading: refreshLoading }] = useRefreshMutation();

  const dispatch = useDispatch();

  const getAuth = async () => {
    const accessToken = getSession(sessionKeys.auth);
    if (!accessToken) return;

    try {
      // const userResponse = await refetchUser();
      // if (userResponse.data) {
      //   dispatch(authAction.setAuth(userResponse.data));
      // }
      // TODO: test
      await delay(5000);
      dispatch(
        authAction.setAuth({
          id: '1',
          email: 'test@gmail.com',
          name: 'Hoang',
        }),
      );
    } catch (err) {
      logger.error('Failed to fetch user:', err);
      handleLogout();
    }
  };

  const handleAuthResponse = (response: AuthType) => {
    dispatch(authAction.setAuth(response.user));
    createSession(sessionKeys.auth, response.accessToken);
    setCookie(cookieKeys.refreshToken, response.refreshToken);
  };

  const handleLogin = async (payloads: LoginPayloads) => {
    try {
      // const response = await login(payloads).unwrap();
      // if (response) handleAuthResponse(response);

      // TODO: TEST
      await delay(5000);
      handleAuthResponse({
        accessToken: '123',
        refreshToken: '123',
        user: {
          id: '1',
          email: payloads.email,
          name: 'Hoang',
        },
      });

      router.push(redirectUrl || RouterName.profile);
    } catch (err) {
      logger.error('Failed to login:', err);
    }
  };

  const handleRefresh = async () => {
    const refreshToken = getCookie(cookieKeys.refreshToken);

    if (refreshToken) {
      try {
        const refreshedResponse = await refresh({ refreshToken }).unwrap();

        if (refreshedResponse) handleAuthResponse(refreshedResponse);
      } catch (err) {
        logger.error('Failed to refresh token:', err);
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    dispatch(authAction.logout());
    // TODO: redirect to login includes pathname back to next page
  };

  const initialize = async () => {
    setIsChecking(true);
    try {
      const accessToken = getSession(sessionKeys.auth);
      if (accessToken && user) return;

      // NOTE: uncomment if use refresh token
      // const refreshToken = getCookie(cookieKeys.refreshToken);
      // if (refreshToken) return await handleRefresh();

      await getAuth();
    } catch (err) {
      logger.error('Failed to initialize auth:', err);
    } finally {
      setIsChecking(false);
    }
  };

  return {
    user,
    isAuth: !!user,
    isLoading:
      refetchUserLoading || loginLoading || refreshLoading || isChecking,
    getAuth,
    handleLogin,
    handleRefresh,
    initialize,
  };
};

export default useAuth;
