import { useMutation } from '@tanstack/react-query';

import { AuthServices } from '@common/api/services/auth';
import { ILoginPassword, ILoginPhone } from '@common/api/services/auth/types/login.type';
import { IAuthResponse } from '@common/api/services/auth/types/user.type';
import { useAppDispatch } from '@common/hooks';

import { loginUser } from '@store/slices/user.slice';

const useLoginPassword = (handleCloseModal: () => void) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (data: ILoginPassword) => AuthServices.loginPassword(data),
    onSuccess: (data: IAuthResponse) => {
      dispatch(loginUser(data));
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
    onSuccess: (data: IAuthResponse) => {
      dispatch(loginUser(data));
      handleCloseModal();
    },
    onError: (err: any) => {
      return err.response?.data?.message;
    },
  });
};

export { useLoginPassword, useLoginPhone };
