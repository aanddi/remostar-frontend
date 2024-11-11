import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { AuthServices } from '@common/api/services/auth';
import '@common/api/services/auth/types/otp.type';
import {
  IRegisterContractors,
  IRegisterOwner,
} from '@common/api/services/auth/types/register.type';
import { IAuthResponse } from '@common/api/services/auth/types/user.type';
import { useAppDispatch } from '@common/hooks';

import { loginUser } from '@store/slices/user.slice';

const useRegisterOwner = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: IRegisterOwner) => AuthServices.registerOwner(data),
    onSuccess: (data: IAuthResponse) => {
      dispatch(loginUser(data));
      navigate('/profile');
    },
    onError: (err: any) => {
      return err.response?.data?.message;
    },
  });
};

const useRegisterContactor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: IRegisterContractors) => AuthServices.registerContactor(data),
    onSuccess: (data: IAuthResponse) => {
      dispatch(loginUser(data));
      navigate('/company');
    },
    onError: (err: any) => {
      return err.response?.data?.message;
    },
  });
};

export { useRegisterOwner, useRegisterContactor };
