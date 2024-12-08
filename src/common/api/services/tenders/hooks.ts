import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  createTender,
  deleteTender,
  editTender,
  getMyTenders,
  getTenderById,
  getTenderInfoById,
  getTenders,
} from './endpoints';
import { ITenderActions } from './types';

import ApiTags from '../apiTags';

const useGetTenders = (query: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_TENDERS_RIBBON],
    queryFn: () => getTenders(query),
  });
};

const useGetTenderById = (tenderId: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_TENDER],
    queryFn: () => getTenderById(tenderId),
  });
};

const useGetMyTenders = (userId: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_MY_TENDERS],
    queryFn: () => getMyTenders(userId),
  });
};

const useGetTenderInfo = (tenderId: string, isModalOpen: boolean) => {
  return useQuery({
    queryKey: [ApiTags.GET_INFO_TENDER, tenderId],
    queryFn: () => getTenderInfoById(tenderId),
    enabled: !!tenderId && isModalOpen,
    refetchOnMount: true,
  });
};

const useCreateTender = (userId: string, handleCloseModal: () => void, reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.CREATE_TENDER],
    mutationFn: (data: ITenderActions) => createTender(userId, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_MY_TENDERS] });
      handleCloseModal();
      reset();
      toast.success('Тендер успешно создан');
    },
  });
};

const useEditTender = (tenderId: string, handleCloseModal: () => void, reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.EDIT_TENDER],
    mutationFn: (data: ITenderActions) => editTender(tenderId, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_MY_TENDERS] });
      handleCloseModal();
      reset();
      toast.success('Тендер успешно сохранен');
    },
  });
};

const useDeleteTender = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.DELETE_TENDER],
    mutationFn: (tenderId: string) => deleteTender(tenderId),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_MY_TENDERS] });
      toast.success('Тендер удален');
    },
  });
};

export {
  useGetTenders,
  useGetTenderById,
  useGetMyTenders,
  useGetTenderInfo,
  useCreateTender,
  useEditTender,
  useDeleteTender,
};
