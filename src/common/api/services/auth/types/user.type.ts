import ITokens from './tokens.type';

enum Tokens {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

enum Roles {
  Owner = 'OWNER',
  Employee = 'EMPLOYEE',
}

enum RolesEmployee {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Brigadier = 'BRIGADIER',
}

export interface IRole {
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
}

export interface IEmployee {
  employeeId: string;
  contractorId: string;
}

interface User {
  id: string;
  pathImage: string;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  email: string;
  gender: string;
  employee?: IEmployee;
  roles: IRole;
}

interface IAuthResponse extends ITokens {
  user: User;
}

export { Roles, RolesEmployee, Tokens };

export type { IAuthResponse, User };
