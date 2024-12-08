import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { editUserProfile, getUserProfile } from './endpoints';
import { IEditUserProfile } from './types';

import ApiTags from '../apiTags';

const useGetUserProfile = (userId: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_USER_PROFILE],
    queryFn: () => getUserProfile(userId),
  });
};

const useEditUserProfile = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.EDIT_PROFILE_USER],
    mutationFn: (data: IEditUserProfile) => editUserProfile(userId, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_USER_PROFILE] });
      toast.success('Профиль успешно изменен');
    },
  });
};

export { useGetUserProfile, useEditUserProfile };
