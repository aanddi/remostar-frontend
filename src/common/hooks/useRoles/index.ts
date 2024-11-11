import { Roles, RolesEmployee } from '@common/api/services/auth/types/user.type';
import { useAppSelector } from '@common/hooks';

export const useRoles = () =>
  useAppSelector((state) => {
    const userRole = state?.user.user?.roles.userRole;
    const employeeRole = state?.user.user?.roles.employeeRole;

    const isOwner = userRole?.roleName === Roles.Owner;
    const isEmployee = userRole?.roleName === Roles.Employee;

    const isAdmin = employeeRole?.roleName === RolesEmployee.Admin;
    const isManager = employeeRole?.roleName === RolesEmployee.Manager;
    const isBrigadier = employeeRole?.roleName === RolesEmployee.Brigadier;

    return { isOwner, isEmployee, isAdmin, isManager, isBrigadier, userRole, employeeRole };
  });

export default useRoles;
