import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  createReview,
  deleteReview,
  editReview,
  getCheckReviewUser,
  getListReviewsUser,
  getReviewById,
} from './endpoints';
import { IActionsReview } from './types';

import ApiTags from '../apiTags';

const useListReviewsUser = (userId: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_REVIEWS_PROFILE],
    queryFn: () => getListReviewsUser(userId),
    refetchOnMount: true,
  });
};

const useReviewById = (reviewId: number, isModalOpen: boolean) => {
  return useQuery({
    queryKey: [ApiTags.GET_REVIEW_BY_ID_PROFILE, reviewId],
    queryFn: () => getReviewById(reviewId),
    enabled: !!reviewId && isModalOpen,
    refetchOnMount: true,
  });
};

const useCheckReviewUser = (userId: string, contractorId: number) => {
  return useQuery({
    queryKey: [ApiTags.GET_CHECK_REVIEW, contractorId],
    queryFn: () => getCheckReviewUser(userId, contractorId),
    enabled: !!userId && !!contractorId,
    refetchOnMount: true,
  });
};

const useCreateReview = (
  userId: string,
  contractorId: number,
  handleCancel: () => void,
  reset: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.CREATE_REVIEW],
    mutationFn: (data: IActionsReview) => createReview(userId, contractorId, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_CHECK_REVIEW] });
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_CONTRACTOR_PROFILE] });
      handleCancel();
      reset();
      toast.success('Отзыв оставлен');
    },
  });
};

const useEditReview = (reviewId: number, handleCancel: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.EDIT_REVIEW],
    mutationFn: (data: IActionsReview) => editReview(reviewId, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_REVIEWS_PROFILE] });
      handleCancel();
      toast.success('Отзыв отредактирован');
    },
  });
};

const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.DELETE_REVIEW],
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_REVIEWS_PROFILE] });
      toast.success('Отзыв удален');
    },
  });
};

export {
  useListReviewsUser,
  useReviewById,
  useCreateReview,
  useEditReview,
  useDeleteReview,
  useCheckReviewUser,
};
