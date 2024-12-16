import apiInstance from '@common/api/instance';

import { IActionsObject, IObjectInfo, IObjectList } from './types';

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

export {
  getObjectsOwner,
  getObjectContractor,
  createObject,
  editObject,
  editStatusObject,
  getOwnersList,
  getObjectInfo,
};
