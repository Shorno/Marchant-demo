import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getBaseUrl } from '../config/envConfig';
import { getFromCookies, getFromLocalStorage, setToLocalStorage } from '../../utils/local-storage';

const coreAxios = axios.create();

coreAxios.interceptors.request.use((req) => {
  const accessToken = getFromLocalStorage('access');

  if (accessToken) {
    req.headers.authorization = `Bearer ${accessToken}`;
  }

  return req;
});

// Function to refresh the access token
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refresh = getFromCookies('refresh');

    if (!refresh) {
      console.error('No refresh token available');
      return null; // Stop if there's no refresh token
    }

    const response = await coreAxios.post(
      `${getBaseUrl()}/accounts/token/refresh/`,
      { refresh },
    );
    const newAccessToken = response.data.access;
    setToLocalStorage('access', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

const axiosBaseQuery =
  (
    { baseUrl } = { baseUrl: process.env.APP_BASE_URL },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await coreAxios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      const isAuthRequest = url.includes('/login');

      if (!isAuthRequest && err.response?.status === 401) {
        // 401 error, but not a login request, try refreshing the token
        const refresh = await refreshAccessToken();
        if (refresh) {
          const res = await coreAxios({
            url: baseUrl + url,
            method,
            data,
            params,
            headers: { ...headers, authorization: `Bearer ${refresh}` },
          });
          return { data: res.data };
        }
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
