'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { logger } from '@/libs/logger';
import {
  authAction,
  AuthType,
  useDispatch,
  useGetAuthQuery,
  useLoginMutation,
  useSelector,
} from '@/libs/redux';
import { LoginPayloads } from '@/libs/redux/services/auth/type';
import { useRouter } from '@/i18n/i18nNavigation';
import { RouterName } from '@/shares/constants/router';
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from '@/shares/utils/token';

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

  const dispatch = useDispatch();

  const getAuth = async () => {
    const accessToken = getAccessToken();
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
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
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

  const handleLogout = () => {
    dispatch(authAction.logout());
    // TODO: redirect to login includes pathname back to next page
  };

  const initialize = async () => {
    setIsChecking(true);
    try {
      const accessToken = getAccessToken();
      if (accessToken && user) return;

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
    isLoading: refetchUserLoading || loginLoading || isChecking,
    getAuth,
    handleLogin,
    initialize,
  };
};

export default useAuth;
