import apiInstance from '@common/api/instance';

import { IRibbonTendersResponse, ITender } from './types';

const getTenders = async (query: string) => {
  const response = await apiInstance.get<IRibbonTendersResponse>(`/tenders?${query}`);
  return response.data;
};

const getTenderById = async (tenderId: string) => {
  const response = await apiInstance.get<ITender>(`/tenders/${tenderId}`);
  return response.data;
};

export { getTenders, getTenderById };
