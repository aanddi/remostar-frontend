interface IObjectList {
  id: number;
  updateAt: string;
  createdAt: string;
  name: string;
  address: string;
  status: number;
  gallery: string;
  desc: string;
  budget: number;
  footage: number;
  type: string;
  finishing: string;
}

interface IActionsObject {
  usersId: string;
  name: string;
  address: string;
  status: number;
  footage: number;
  rooms: number;
  budget: number;
  type: string;
  squareKitchen: number;
  squareLived: number;
  floor: string;
  finishing: string;
  gallery: string;
  desc: string;
}

interface IObjectInfo {
  id: number;
  createdAt: string;
  updateAt: string;
  name: string;
  address: string;
  status: number;
  footage: number;
  rooms: number;
  budget: number;
  type: string;
  squareKitchen: number;
  squareLived: number;
  floor: string;
  finishing: string;
  gallery: string;
  desc: string;
  usersId: string;
  contractorsId: number;
  contractor: {
    id: number;
    legalName: string;
  };
  user: {
    id: string;
    name: string;
    surname: string;
    patronymic: string;
  };
}

export type { IObjectList, IActionsObject, IObjectInfo };
