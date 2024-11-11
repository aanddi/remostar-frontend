import apiInstance from '@common/api/instance';

import {
  IPopularContractorResponse,
  IRibbonContractorQuery,
  IRibbonContractorResponse,
} from './types';

const getRibbonContractors = async (querys?: IRibbonContractorQuery) => {
  const response = await apiInstance.get<IRibbonContractorResponse>('/contractor/ribbon', {
    params: querys,
  });
  return response.data;
};

const getPopularContractors = async () => {
  const response = await apiInstance.get<IPopularContractorResponse[]>('/contractor/popular');
  return response.data;
};

export { getRibbonContractors, getPopularContractors };
