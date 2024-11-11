import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { AuthServices } from '@common/api/services/auth';
import { ILoginPhone } from '@common/api/services/auth/types/login.type';
import {
  IOtpGenerate,
  IOtpGenerateResponse,
  IOtpVerification,
} from '@common/api/services/auth/types/otp.type';

const useOtpGenerate = (
  setResponseGenerateOtp: Dispatch<SetStateAction<IOtpGenerateResponse | null>>,
  typeVerification: 'login' | 'register',
) => {
  return useMutation({
    mutationFn: async (data: IOtpGenerate) => AuthServices.otpGenerate(data, typeVerification),
    onSuccess: (data: IOtpGenerateResponse) => {
      setResponseGenerateOtp(data);
    },
    onError: (err: any) => {
      console.log(err.response?.data?.message);
      return err.response;
    },
  });
};

const useOtpVerification = (
  handleVerification: (data: ILoginPhone) => void,
  setVerificationState: Dispatch<SetStateAction<IOtpGenerateResponse | null>>,
) => {
  return useMutation({
    mutationFn: async (data: IOtpVerification) => AuthServices.otpVerification(data),
    onSuccess(data) {
      handleVerification(data);
      setVerificationState(null);
    },
    onError: (err: any) => {
      return err.response?.data?.message;
    },
  });
};

export { useOtpGenerate, useOtpVerification };
