import ITokens from './tokens.type';

enum Roles {
  Owner = 'OWNER',
  Employee = 'EMPLOYEE',
}

enum RolesEmployee {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Brigadier = 'BRIGADIER',
}

interface IRole {
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

interface IEmployee {
  employeeId: string;
  contractorId: string;
}

interface User {
  id: string;
  pathImage: string;
  name: string;
  surname: string;
  employee?: IEmployee;
  roles: IRole;
}

interface IAuthResponse extends ITokens {
  user: User;
}

export { Roles, RolesEmployee };

export type { IAuthResponse, User };
