import apiInstance from '@common/api/instance';

import { IRibbonTendersResponse, ITender, ITenderActions, ITendersRibbon } from './types';

const getTenders = async (query: string) => {
  const response = await apiInstance.get<IRibbonTendersResponse>(`/tenders?${query}`);
  return response.data;
};

const getTenderById = async (tenderId: string) => {
  const response = await apiInstance.get<ITender>(`/tenders/${tenderId}`);
  return response.data;
};

const getMyTenders = async (userId: string) => {
  const response = await apiInstance.get<ITendersRibbon[]>(`/tenders/my/${userId}`);
  return response.data;
};

const getTenderInfoById = async (tenderId: string) => {
  const response = await apiInstance.get(`/tenders/info/${tenderId}`);
  return response.data;
};

const createTender = async (userId: string, data: ITenderActions) => {
  const response = await apiInstance.post(`/tenders/create/${userId}`, data);
  return response.data;
};

const editTender = async (tenderId: string, data: ITenderActions) => {
  const response = await apiInstance.put(`/tenders/edit/${tenderId}`, data);
  return response.data;
};

const deleteTender = async (tenderId: string) => {
  const response = await apiInstance.delete(`/tenders/delete/${tenderId}`);
  return response.data;
};

export {
  getTenders,
  getTenderById,
  getMyTenders,
  createTender,
  editTender,
  getTenderInfoById,
  deleteTender,
};
