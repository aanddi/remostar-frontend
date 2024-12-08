import apiInstance from '@common/api/instance';

import { IEditUserProfile, IUserProfile } from './types';

const getUserProfile = async (userId: string) => {
  const response = await apiInstance.get<IUserProfile>(`/user/${userId}`);
  return response.data;
};

const editUserProfile = async (userId: string, data: IEditUserProfile) => {
  const response = await apiInstance.put(`/user/edit/${userId}`, data);
  return response.data;
};

export { getUserProfile, editUserProfile };
