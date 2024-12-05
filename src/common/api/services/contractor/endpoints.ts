import apiInstance from '@common/api/instance';

import { IContractorProfile, IRibbonContractorQuery, IRibbonContractorResponse } from './types';

const getRibbonContractors = async (querys?: IRibbonContractorQuery) => {
  const response = await apiInstance.get<IRibbonContractorResponse>('/contractor/ribbon', {
    params: querys,
  });
  return response.data;
};

const getContractorPortfolio = async (contractorId: string) => {
  const response = await apiInstance.get<IContractorProfile>(`/contractor/${contractorId}`);
  return response.data;
};

export { getRibbonContractors, getContractorPortfolio };
