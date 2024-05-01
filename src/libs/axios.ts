import axiosClient, { AxiosError, AxiosResponse } from 'axios';

import { getAccessToken } from '@/shares/utils/storage';

import { Env } from '../shares/constants/env';

// version: 0.27.2
/**
 * Creates an initial 'axios' instance with custom settings.
 */
const axiosInstance = axiosClient.create({
  baseURL: Env.NEXT_API_BASE_URL || '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

axiosInstance.interceptors.request.use(
  ($config) => {
    if ($config.headers) {
      const token = getAccessToken();
      if (token) {
        $config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return $config;
  },
  async (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosError> =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Promise.reject(
      error.response ? (error.response.data as any).errors : error,
    ),
);

export default axiosInstance;
