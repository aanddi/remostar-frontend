import apiInstance from '@common/api/instance';

import { IActionsReview } from './types';

import { IReview } from '../contractor';

const getListReviewsUser = async (userId: string) => {
  const response = await apiInstance.get<IReview[]>(`/reviews/list/${userId}`);
  return response.data;
};

const getReviewById = async (reviewId: number) => {
  const response = await apiInstance.get<IReview>(`/reviews/review/info/${reviewId}`);
  return response.data;
};

const getCheckReviewUser = async (userId: string, contractorId: number) => {
  const response = await apiInstance.get<{ id: number; createAt: string }>(
    `/reviews/review/check?userId=${userId}&contractorId=${contractorId}`,
  );
  return response.data;
};

const createReview = async (userId: string, contractorId: number, body: IActionsReview) => {
  const response = await apiInstance.post(
    `/reviews/review/create?userId=${userId}&contractorId=${contractorId}`,
    body,
  );
  return response.data;
};

const editReview = async (reviewId: number, body: IActionsReview) => {
  const response = await apiInstance.put(`/reviews/review/${reviewId}/edit`, body);
  return response.data;
};

const deleteReview = async (reviewId: number) => {
  const response = await apiInstance.delete(`/reviews/review/${reviewId}/delete`);
  return response.data;
};

export {
  getListReviewsUser,
  getReviewById,
  createReview,
  editReview,
  deleteReview,
  getCheckReviewUser,
};
