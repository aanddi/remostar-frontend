import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  createObject,
  createReport,
  editObject,
  editStatusObject,
  getFileContent,
  getListEmployees,
  getListFiles,
  getObjectContractor,
  getObjectInfo,
  getObjectsOwner,
  getOwnersList,
  getReportsForStatus,
  uploadFile,
} from './endpionts';
import { IActionsObject, ICreateReport } from './types';

import ApiTags from '../apiTags';

const useObjectList = (isOwner: boolean, userId: string, contractorId: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_OBJECTS_LIST],
    queryFn: () => {
      if (isOwner) return getObjectsOwner(userId);
      return getObjectContractor(contractorId);
    },
  });
};

const useCreateObject = (contractorId: string, handleCancel: () => void, reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.CREATE_OBJECT],
    mutationFn: (data: IActionsObject) => createObject(contractorId, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_OBJECTS_LIST] });
      handleCancel();
      reset();
      toast.success('Отзыв оставлен');
    },
  });
};

const useEditObject = (objectId: string, handleCancel: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.EDIT_OBJECT_INFO],
    mutationFn: (data: IActionsObject) => editObject(objectId, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_OBJECT_INFO] });
      handleCancel();
      toast.success('Информация изменена');
    },
  });
};

const useOwnersList = (isModalOpen: boolean) => {
  return useQuery({
    queryKey: [ApiTags.GET_OWNERS_LIST],
    queryFn: () => getOwnersList(),
    select: (data) => {
      return data.map((user) => {
        return {
          value: user.id,
          label: `${user.fullName} - ${user.id}`,
        };
      });
    },
    enabled: isModalOpen,
  });
};

const useEmployeesList = (contractorId: string, isModalOpen: boolean) => {
  return useQuery({
    queryKey: [ApiTags.GET_EMPLOYEES_LIST],
    queryFn: () => getListEmployees(contractorId),
    select: (data) => {
      return data.map((employee) => {
        return {
          value: employee.fullName,
          label: `${employee.fullName} - ${employee.id}`,
        };
      });
    },
    enabled: isModalOpen,
  });
};

const useObjectInfo = (objectId: number) => {
  return useQuery({
    queryKey: [ApiTags.GET_OBJECT_INFO, objectId],
    queryFn: () => getObjectInfo(objectId),
    refetchOnMount: false,
    enabled: !!objectId,
  });
};

const useEditStatus = (objectId: number, setIsVisibleSelect: (state: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.EDIT_OBJECT_INFO],
    mutationFn: (status: number) => editStatusObject(objectId, status),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_OBJECT_INFO] });
      setIsVisibleSelect(false);
      toast.success('Статус обновлен');
    },
  });
};

const useGetReports = (objectId: number, statusId: number) => {
  return useQuery({
    queryKey: [ApiTags.GET_REPORTS, statusId],
    queryFn: () => getReportsForStatus(objectId, statusId),
  });
};

const useCreateReport = (
  objectId: number,
  statusId: number,
  handleCancel: () => void,
  reset: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.CREATE_REPORT],
    mutationFn: (data: ICreateReport) => createReport(objectId, statusId, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_REPORTS] });
      handleCancel();
      reset();
      toast.success('Отчет добавлен');
    },
  });
};

const useUploadFile = (objectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.UPLOAD_FILE],
    mutationFn: (formData: FormData) => uploadFile(objectId, formData),
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_FILES_LIST] });
      toast.success(`Файл «${data.name}» загружен добавлен`);
    },
  });
};

const useListFiles = (objectId: number) => {
  return useQuery({
    queryKey: [ApiTags.GET_FILES_LIST],
    queryFn: () => getListFiles(objectId),
  });
};

const useDownloadFile = () => {
  return useMutation({
    mutationKey: [ApiTags.GET_FILE_CONTENT],
    mutationFn: async (payload: { fileId: number; fileName: string }) =>
      getFileContent(payload.fileId),
    onSuccess(data, { fileName }) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(data);
      link.download = fileName;
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    },
  });
};

export {
  useObjectList,
  useCreateObject,
  useOwnersList,
  useObjectInfo,
  useEditObject,
  useEditStatus,
  useGetReports,
  useCreateReport,
  useEmployeesList,
  useUploadFile,
  useListFiles,
  useDownloadFile,
};
