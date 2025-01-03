import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { AuthServices } from '@common/api/services/auth';
import '@common/api/services/auth/types/otp.type';
import {
  IRegisterContractors,
  IRegisterOwner,
} from '@common/api/services/auth/types/register.type';
import ITokens from '@common/api/services/auth/types/tokens.type';
import { useAppDispatch } from '@common/hooks';
import { setAuthTokens } from '@common/utils';

import { authorized } from '@store/slices/user.slice';

const useRegisterOwner = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (data: IRegisterOwner) => AuthServices.registerOwner(data),
    onSuccess: (data: ITokens) => {
      setAuthTokens(data.accessToken, data.refreshToken);
      dispatch(authorized(true));
      navigate('/profile');
    },
    onError: (err: any) => {
      return err.response?.data?.message;
    },
  });
};

const useRegisterContactor = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (data: IRegisterContractors) => AuthServices.registerContactor(data),
    onSuccess: (data: ITokens) => {
      setAuthTokens(data.accessToken, data.refreshToken);
      dispatch(authorized(true));
      navigate('/company');
    },
    onError: (err: any) => {
      return err.response?.data?.message;
    },
  });
};

export { useRegisterOwner, useRegisterContactor };
