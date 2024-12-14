import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  createPortfolio,
  createServices,
  deletePortfolio,
  deleteService,
  editContractorInfo,
  editPortfolio,
  editServices,
  getContractorInfo,
  getContractorPortfolio,
  getPortfolioById,
  getServiceById,
} from './endpoints';
import { IActionPortfolio, IActionServices, IEditContractorInfo } from './types';

import ApiTags from '../apiTags';

const useContractorPortfolio = (id: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_CONTRACTOR_PROFILE, id],
    queryFn: () => getContractorPortfolio(id),
  });
};

const useContractorInfo = (contractorId: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_CONTRACTOR_INFO],
    queryFn: () => getContractorInfo(contractorId),
  });
};

const useEditContractorInfo = (contractorId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.EDIT_INFO_CONTRACTOR],
    mutationFn: (body: IEditContractorInfo) => editContractorInfo(contractorId, body),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_CONTRACTOR_INFO] });
      toast.success('Информация изменена');
    },
  });
};

const useServiceInfo = (serviceId: number, isModalOpen: boolean) => {
  return useQuery({
    queryKey: [ApiTags.GET_SERVICE, serviceId],
    queryFn: () => getServiceById(serviceId),
    enabled: !!serviceId && isModalOpen,
    refetchOnMount: true,
  });
};

const usePortfolioInfo = (portfolioId: number, isModalOpen: boolean) => {
  return useQuery({
    queryKey: [ApiTags.GET_PORTFOLIO, portfolioId],
    queryFn: () => getPortfolioById(portfolioId),
    enabled: !!portfolioId && isModalOpen,
    refetchOnMount: true,
  });
};

const useEditServiceContractor = (servicesId: number, handleCancel: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.EDIT_SERVICE_CONTRACTOR],
    mutationFn: (body: IActionServices) => editServices(servicesId, body),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_CONTRACTOR_INFO] });
      handleCancel();
      toast.success('Услуга отредактирована');
    },
  });
};

const useEditPortfolioContractor = (portfolioId: number, handleCancel: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.EDIT_PORTFOLIO_CONTRACTOR],
    mutationFn: (body: IActionPortfolio) => editPortfolio(portfolioId, body),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_CONTRACTOR_INFO] });
      handleCancel();
      toast.success('Работа отредактирована');
    },
  });
};

const useCreatePortfolioContractor = (
  contractorId: string,
  handleCancel: () => void,
  reset: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.CREATE_PORTFOLIO_CONTRACTOR],
    mutationFn: (body: IActionPortfolio) => createPortfolio(contractorId, body),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_CONTRACTOR_INFO] });
      handleCancel();
      reset();
      toast.success('Работа создана');
    },
  });
};

const useCreateServicesContractor = (
  contractorId: string,
  handleCancel: () => void,
  reset: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.CREATE_SERVICE_CONTRACTOR],
    mutationFn: (body: IActionServices) => createServices(contractorId, body),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_CONTRACTOR_INFO] });
      handleCancel();
      reset();
      toast.success('Услуга создана');
    },
  });
};

const useDeleteServiceContractor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.DELETE_SERVICE_CONTRACTOR],
    mutationFn: (servicesId: number) => deleteService(servicesId),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_CONTRACTOR_INFO] });
      toast.success('Услуга удалена');
    },
  });
};

const useDeleteServicePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.DELETE_PORTFOLIO_CONTRACTOR],
    mutationFn: (portfolioId: number) => deletePortfolio(portfolioId),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_CONTRACTOR_INFO] });
      toast.success('Работа удалена');
    },
  });
};

export {
  useContractorPortfolio,
  useContractorInfo,
  useEditContractorInfo,
  useEditServiceContractor,
  useEditPortfolioContractor,
  useCreatePortfolioContractor,
  useCreateServicesContractor,
  useDeleteServiceContractor,
  useDeleteServicePortfolio,
  useServiceInfo,
  usePortfolioInfo,
};
