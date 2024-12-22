import { IEmployee } from '../auth/types/user.type';

interface IUserProfile {
  id: string;
  createdAt: string;
  updateAt: string;
  name: string;
  surname: string;
  patronymic: string;
  gender: string;
  birthday: string;
  pathImage: string;
  email: string;
  phone: string;
  employee?: IEmployee;
  roles: {
    userRole: {
      roleId: number;
      roleName: string;
      roleDesc: string;
    };
    employeeRole?: {
      roleId: number;
      roleName: string;
      roleDesc: string;
    };
  };
}

interface IEditUserProfile {
  name: string;
  surname: string;
  patronymic: string;
  gender: string;
  email: string;
}

export type { IUserProfile, IEditUserProfile };
