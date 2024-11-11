import apiInstance from '@common/api/instance';

import { ILoginPassword, ILoginPhone } from './types/login.type';
import {
  IOtpGenerate,
  IOtpGenerateResponse,
  IOtpVerification,
  IOtpVerificationResponse,
} from './types/otp.type';
import { IRegisterContractors, IRegisterOwner } from './types/register.type';
import { IAuthResponse } from './types/user.type';

const loginPassword = async (body: ILoginPassword) => {
  const response = await apiInstance.post<IAuthResponse>('/auth/login/password', body);
  return response.data;
};

const loginPhone = async (body: ILoginPhone) => {
  const response = await apiInstance.post<IAuthResponse>('/auth/login/phone', body);
  return response.data;
};

const registerOwner = async (body: IRegisterOwner) => {
  const response = await apiInstance.post<IAuthResponse>('/auth/register/owner', body);
  return response.data;
};

const registerContactor = async (body: IRegisterContractors) => {
  const response = await apiInstance.post<IAuthResponse>('/auth/register/conractor', body);
  return response.data;
};

const getNewTokens = async (currentRefreshToken: string | null) => {
  const response = await apiInstance.post<IAuthResponse>('/auth/tokens/new', {
    refreshToken: currentRefreshToken,
  });
  return response.data;
};

const otpGenerate = async (body: IOtpGenerate, typeVerification: string) => {
  const response = await apiInstance.post<IOtpGenerateResponse>(
    `/auth/otp/generate?type=${typeVerification}`,
    body,
  );
  return response.data;
};

const otpVerification = async (body: IOtpVerification) => {
  const response = await apiInstance.post<IOtpVerificationResponse>('/auth/otp/verification', body);
  return response.data;
};

export {
  loginPassword,
  loginPhone,
  registerOwner,
  registerContactor,
  getNewTokens,
  otpGenerate,
  otpVerification,
};
