import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';

import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  setAccessToken,
  setRefreshToken,
} from '@/shares/utils/token';

import { AuthType } from '../services';
import { CustomFetchBaseQueryArgs, ErrorResponse } from '../types';

// Example function to refresh access token
const refreshAccessToken = async (
  refreshTokenPayload: string,
): Promise<AuthType | null> => {
  // Make a request to refresh the token
  try {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      body: refreshTokenPayload,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch {
    return null;
  }
};

export const customFetchBaseQuery = (
  { baseUrl }: CustomFetchBaseQueryArgs = { baseUrl: '' },
): BaseQueryFn<string | FetchArgs, unknown, ErrorResponse> => {
  return async (args) => {
    let url: string;
    let method: string;
    let body: any;

    if (typeof args === 'string') {
      url = args;
      method = 'GET'; // Default to GET if only URL is provided
      body = undefined;
    } else {
      ({ url, method = 'GET', body } = args);
    }

    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    });

    const token = getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      let response = await fetch(`${baseUrl}${url}`, config);

      // Handle unauthorized response
      if (response.status === 401) {
        // Refresh token logic here, assuming you have a refreshAccessToken function
        const refreshToken = getRefreshToken();
        let refreshResponse;

        if (refreshToken) {
          refreshResponse = await refreshAccessToken(refreshToken); // Define this function to get a new token
          if (refreshResponse) {
            setAccessToken(refreshResponse.accessToken);
            setRefreshToken(refreshResponse.refreshToken);
            headers.set(
              'Authorization',
              `Bearer ${refreshResponse.accessToken}`,
            );

            // Retry the original request with new token
            response = await fetch(`${baseUrl}${url}`, { ...config, headers });
          } else {
            // Handle failed token refresh
            removeAccessToken();
            return {
              error: {
                status: response.status,
                message: 'Unauthorized',
              },
            };
          }
        }
      }

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        return {
          error: {
            status: response.status,
            errors: errorData.errors,
            message: errorData.message,
            ...errorData,
          },
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: {
          status: 'FETCH_ERROR',
          message: (error as Error).message,
        },
      };
    }
  };
};

// -----------------------------------
export function provideTagDetail<T extends string, R extends string | number>(
  tagType: T,
  resultsWithId: R | undefined,
) {
  return [{ type: tagType, id: resultsWithId }];
}

export function provideTagList<
  T extends string,
  R extends { id: string | number }[],
>(tagType: T, resultsWithIds: R | undefined) {
  return resultsWithIds
    ? [
        ...provideTagDetail(tagType, 'List'),
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : provideTagDetail(tagType, 'List');
}
