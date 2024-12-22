import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { getAuthTokens, setAuthTokens } from '@common/utils';

import { AuthServices } from './services/auth';
import { Tokens } from './services/auth/types/user.type';

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthTokens();

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<{ message: string }>) => {
    const originalRequest = error.config as AxiosRequestConfig & { retry?: boolean };

    if (
      error.response?.status === 401 &&
      error.response.data.message === 'Unauthorized' &&
      originalRequest.retry !== true
    ) {
      try {
        originalRequest.retry = true;
        const { refreshToken } = getAuthTokens();

        if (refreshToken) {
          const response = await AuthServices.getNewTokens(refreshToken);

          if (response.accessToken && response.refreshToken) {
            setAuthTokens(response.accessToken, response.refreshToken);
          }

          return await apiInstance(originalRequest);
        }
      } catch (err) {
        console.log(err);
        Cookies.remove(Tokens.AccessToken);
        Cookies.remove(Tokens.RefreshToken);
        localStorage.removeItem('userProfile');
        window.location.href = '/';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default apiInstance;
