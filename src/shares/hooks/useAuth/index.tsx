'use client';

import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { logger } from '@/libs/logger';
import {
  authAction,
  AuthType,
  LoginPayloads,
  SignUpPayloads,
  useDispatch,
  useGetAuthQuery,
  useLoginMutation,
  useSelector,
  useSingUpMutation,
} from '@/libs/redux';
import { useRouter } from '@/i18n/i18nNavigation';
import { RouterName } from '@/shares/constants/router';
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from '@/shares/utils/token';
import { ErrorResponse } from '@/libs/redux/types';
import { UserStateType } from '@/libs/redux/services/users/type';
import { AppRoles } from '@/shares/constants/enum';

const delay = (time = 3000) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, time);
  });

const useAuth = () => {
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  const [isChecking, setIsChecking] = useState(true);

  const { refetch: _refetchUser, isLoading: refetchUserLoading } =
    useGetAuthQuery(undefined, {
      skip: true,
    });

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [signUp, { isLoading: signUpLoading, error: signUpError }] =
    useSingUpMutation();

  const dispatch = useDispatch();

  const setAuth = (userResponse?: UserStateType) => {
    dispatch(authAction.setAuth(userResponse));
  };

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
          role: AppRoles.User,
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
      const response = await login(payloads).unwrap();
      if (response?.data) handleAuthResponse(response?.data);

      toast({
        description: 'Welcome to ABC',
        status: 'success',
        isClosable: true,
      });
      await initialize();
    } catch (err) {
      toast({
        description: (err as Error)?.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleSignUp = async (payloads: SignUpPayloads) => {
    try {
      const response = await signUp(payloads);

      if (response?.error) {
        const errorResponse = (response?.error as ErrorResponse)?.errors;

        if (!errorResponse) {
          return toast({
            description: response?.error?.message,
            status: 'error',
            isClosable: true,
          });
        }
        return Object.values(errorResponse).forEach((el: any) =>
          toast({
            title: response?.error?.message,
            description: el.message,
            status: 'error',
            isClosable: true,
          }),
        );
      }

      toast({
        title: 'Sign up successfully',
        status: 'success',
        isClosable: true,
      });
      router.push(RouterName.login);
    } catch (error) {
      toast({
        description: (error as Error)?.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    dispatch(authAction.logout());
  };

  const initialize = async () => {
    try {
      setIsChecking(true);
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
      refetchUserLoading || loginLoading || signUpLoading || isChecking,
    signUpError,
    getAuth,
    handleLogin,
    handleSignUp,
    initialize,
    handleLogout,
    setAuth,
  };
};

export default useAuth;
