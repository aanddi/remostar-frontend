import axios from 'axios';

import { deleteAuthTokens, getAuthTokens, setAuthTokens } from '@common/utils';

import { AuthServices } from './services/auth';

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
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
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config.isRetry) {
      originalRequest.isRetry = true;
      try {
        const { refreshToken } = getAuthTokens();
        const response = await AuthServices.getNewTokens(refreshToken);
        deleteAuthTokens();
        setAuthTokens(response.accessToken, response.refreshToken);
        // обновление юзера ????
      } catch (err: any) {
        console.error('error', err);
        if (err.response.status === 401 || err.response.status === 400) {
          deleteAuthTokens();
          localStorage.removeItem('user');
        }
      }
      return apiInstance.request(originalRequest).catch(() => {
        throw error;
      });
    }
    return Promise.reject(error);
  },
);

export default apiInstance;
