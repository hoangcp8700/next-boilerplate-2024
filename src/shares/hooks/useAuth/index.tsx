'use client';

import { useSearchParams } from 'next/navigation';
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
import { usePathname, useRouter } from '@/i18n/i18nNavigation';
import { RouterName } from '@/shares/constants/router';
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from '@/shares/utils/token';
import { ErrorResponse } from '@/libs/redux/types';

const delay = (time = 3000) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, time);
  });

const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  const [isChecking, setIsChecking] = useState(false);

  const redirectUrl = searchParams.get('redirect');

  const { refetch: _refetchUser, isLoading: refetchUserLoading } =
    useGetAuthQuery(undefined, {
      skip: true,
    });

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [signUp, { isLoading: signUpLoading, error: signUpError }] =
    useSingUpMutation();

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
      const response = await login(payloads).unwrap();
      if (response?.data) handleAuthResponse(response?.data);

      toast({
        description: 'Welcome to ABC',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      router.push(redirectUrl || RouterName.profile);
    } catch (err) {
      toast({
        description: (err as Error)?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignUp = async (payloads: SignUpPayloads) => {
    try {
      const response = await signUp(payloads);

      if (response?.error) {
        const errorResponse = (response?.error as ErrorResponse)?.errors;

        return toast({
          title: response?.error?.message,
          ...(errorResponse && {
            description: (
              <div>
                {Object.values(errorResponse).map((el: any, idx) => (
                  <p key={`message-${idx}`}>{el.message}</p>
                ))}
              </div>
            ),
          }),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }

      toast({
        title: 'Sign up successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      router.push(RouterName.login);
    } catch (error) {
      toast({
        description: (error as Error)?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    dispatch(authAction.logout());
    router.push('/');
  };

  const initialize = async (isPrivateRouter?: boolean) => {
    try {
      if (user) return setIsChecking(false);
      const accessToken = getAccessToken();

      if (isPrivateRouter && !accessToken && !user) {
        return router.push(`${RouterName.login}?redirect=${pathname}`);
      }
      if (accessToken) {
        setIsChecking(true);
        await getAuth();
      }
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
  };
};

export default useAuth;
