import apiInstance from '@common/api/instance';

import {
  IActionsObject,
  ICreateReport,
  IFile,
  IGetReports,
  IObjectInfo,
  IObjectList,
} from './types';

const getObjectsOwner = async (userId: string) => {
  const response = await apiInstance.get<IObjectList[]>(`/objects/list/owner/${userId}`);
  return response.data;
};

const getObjectContractor = async (contractorId: string) => {
  const response = await apiInstance.get<IObjectList[]>(`/objects/list/contractor/${contractorId}`);
  return response.data;
};

const createObject = async (contractorId: string, dto: IActionsObject) => {
  const response = await apiInstance.post(`/objects/${contractorId}/create`, dto);
  return response.data;
};

const editObject = async (objectId: string, dto: IActionsObject) => {
  const response = await apiInstance.put(`/objects/${objectId}/edit`, dto);
  return response.data;
};

const editStatusObject = async (objectId: number, status: number) => {
  const response = await apiInstance.patch(`/objects/${objectId}/status?status=${status}`);
  return response.data;
};

const getOwnersList = async () => {
  const response = await apiInstance.get<{ id: number; fullName: string }[]>(`/objects/list`);
  return response.data;
};

const getObjectInfo = async (objectId: number) => {
  const response = await apiInstance.get<IObjectInfo>(`/objects/${objectId}/info`);
  return response.data;
};

const getReportsForStatus = async (objectId: number, statusId: number) => {
  const response = await apiInstance.get<IGetReports[]>(
    `/objects/reports?objectId=${objectId}&statusId=${statusId}`,
  );
  return response.data;
};

const createReport = async (objectId: number, statusId: number, body: ICreateReport) => {
  const response = await apiInstance.post(
    `/objects/report/${objectId}/create?statusId=${statusId}`,
    body,
  );
  return response.data;
};

const getListEmployees = async (contractorId: string) => {
  const response = await apiInstance.get<{ id: number; fullName: string }[]>(
    `/objects/list/employees/${contractorId}`,
  );
  return response.data;
};

const uploadFile = async (objectId: number, formData: FormData) => {
  const response = await apiInstance.post<{ id: number; name: string }>(
    `/objects/${objectId}/file/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

const getFileContent = async (objectId: number) => {
  const response = await apiInstance.get<Blob>(`/objects/file/${objectId}/content`, {
    responseType: 'blob',
  });
  return response.data;
};

const getListFiles = async (objectId: number) => {
  const response = await apiInstance.get<IFile[]>(`/objects/${objectId}/files/list`);
  return response.data;
};

export {
  getObjectsOwner,
  getObjectContractor,
  createObject,
  editObject,
  editStatusObject,
  getOwnersList,
  getObjectInfo,
  getReportsForStatus,
  createReport,
  getListEmployees,
  uploadFile,
  getFileContent,
  getListFiles,
};
