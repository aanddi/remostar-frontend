import apiInstance from '@common/api/instance';

import {
  IActionPortfolio,
  IActionServices,
  IContractorProfile,
  IEditContractorInfo,
  IResponseContractorInfo,
  IRibbonContractorQuery,
  IRibbonContractorResponse,
} from './types';

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

const getContractorInfo = async (contractorId: string) => {
  const response = await apiInstance.get<IResponseContractorInfo>(
    `/contractor/info/${contractorId}`,
  );
  return response.data;
};

const editContractorInfo = async (contractorId: string, body: IEditContractorInfo) => {
  const response = await apiInstance.put(`/contractor/info/${contractorId}/edit`, body);
  return response.data;
};

const getServiceById = async (serviceId: number) => {
  const response = await apiInstance.get<IActionServices>(`/contractor/services/${serviceId}`);
  return response.data;
};

const getPortfolioById = async (portfolioId: number) => {
  const response = await apiInstance.get<IActionPortfolio>(`/contractor/portfolio/${portfolioId}`);
  return response.data;
};

const createServices = async (contractorId: string, body: IActionServices) => {
  const response = await apiInstance.post(`/contractor/services/${contractorId}/create`, body);
  return response.data;
};

const editServices = async (servicesId: number, body: IActionServices) => {
  const response = await apiInstance.put(`/contractor/services/${servicesId}/edit`, body);
  return response.data;
};

const deleteService = async (servicesId: number) => {
  const response = await apiInstance.delete(`/contractor/services/${servicesId}/delete`);
  return response.data;
};

const createPortfolio = async (contractorId: string, body: IActionPortfolio) => {
  const response = await apiInstance.post(`/contractor/portfolio/${contractorId}/create`, body);
  return response.data;
};

const editPortfolio = async (portfolioId: number, body: IActionPortfolio) => {
  const response = await apiInstance.put(`/contractor/portfolio/${portfolioId}/edit`, body);
  return response.data;
};

const deletePortfolio = async (portfolioId: number) => {
  const response = await apiInstance.delete(`/contractor/portfolio/${portfolioId}/delete`);
  return response.data;
};

export {
  getRibbonContractors,
  getContractorPortfolio,
  getContractorInfo,
  editContractorInfo,
  createServices,
  editServices,
  deleteService,
  createPortfolio,
  editPortfolio,
  deletePortfolio,
  getServiceById,
  getPortfolioById,
};
