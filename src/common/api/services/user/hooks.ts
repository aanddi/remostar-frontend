import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useAppDispatch } from '@common/hooks';

import { loginUser } from '@store/slices/user.slice';

import { editUserProfile, getUserProfile } from './endpoints';
import { IEditUserProfile } from './types';

import ApiTags from '../apiTags';

const useGetUserProfile = (isAuthorized: boolean) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [ApiTags.GET_USER_PROFILE],
    queryFn: async () => {
      const response = await getUserProfile();
      dispatch(loginUser(response));
      return response;
    },
    enabled: isAuthorized,
  });
};

const useEditUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.EDIT_PROFILE_USER],
    mutationFn: (data: IEditUserProfile) => editUserProfile(data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_USER_PROFILE] });
      toast.success('Профиль успешно изменен');
    },
  });
};

export { useGetUserProfile, useEditUserProfile };
