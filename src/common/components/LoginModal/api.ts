import { useMutation } from '@tanstack/react-query';

import { AuthServices } from '@common/api/services/auth';
import { ILoginPassword, ILoginPhone } from '@common/api/services/auth/types/login.type';
import ITokens from '@common/api/services/auth/types/tokens.type';
import { useAppDispatch } from '@common/hooks';
import { setAuthTokens } from '@common/utils';

import { authorized } from '@store/slices/user.slice';

const useLoginPassword = (handleCloseModal: () => void) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (data: ILoginPassword) => AuthServices.loginPassword(data),
    onSuccess: (data: ITokens) => {
      setAuthTokens(data.accessToken, data.refreshToken);
      dispatch(authorized(true));
      handleCloseModal();
    },
    onError: (err: any) => {
      return err.response?.data?.message;
    },
  });
};

const useLoginPhone = (handleCloseModal: () => void) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (data: ILoginPhone) => AuthServices.loginPhone(data),
    onSuccess: (data: ITokens) => {
      setAuthTokens(data.accessToken, data.refreshToken);
      dispatch(authorized(true));
      handleCloseModal();
    },
    onError: (err: any) => {
      return err.response?.data?.message;
    },
  });
};

export { useLoginPassword, useLoginPhone };
