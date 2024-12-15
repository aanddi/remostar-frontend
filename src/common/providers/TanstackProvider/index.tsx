import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as TanstackProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';
import toast from 'react-hot-toast';

import { notification } from 'antd';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      // refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },

  queryCache: new QueryCache({
    onError: (error: any) => {
      const axiosError = error?.response?.data;
      notification.error({
        message: `Ошибка ${axiosError?.status ?? error.name}`,
        description: axiosError?.message ?? error.message,
        duration: 6,
        showProgress: true,
        pauseOnHover: true,
      });
    },
  }),

  mutationCache: new MutationCache({
    onError: (error: any) => {
      toast.remove();
      const axiosError = error?.response?.data;
      notification.error({
        message: `Ошибка ${axiosError?.status ?? error.name}`,
        description: axiosError?.message ?? error.message,
        duration: 6,
        showProgress: true,
        pauseOnHover: true,
      });
    },
  }),
});

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <TanstackProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackProvider>
  );
};

export default QueryClientProvider;
