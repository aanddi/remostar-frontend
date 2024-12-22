import apiInstance from '@common/api/instance';

import { IEditUserProfile, IUserProfile } from './types';

const getUserProfile = async () => {
  const response = await apiInstance.get<IUserProfile>(`/user/profile`);
  return response.data;
};

const editUserProfile = async (data: IEditUserProfile) => {
  const response = await apiInstance.put(`/user/edit`, data);
  return response.data;
};

export { getUserProfile, editUserProfile };
