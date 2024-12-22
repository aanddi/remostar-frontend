import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth, useModalLogin, useRoles } from '@common/hooks';

interface IAuthProfider {
  children: React.ReactNode;
  protectionUser?: string[];
  protectionEmployee?: string[];
}

const AuthProvider = ({ children, protectionUser, protectionEmployee }: IAuthProfider) => {
  const location = useLocation();
  const { handleOpenModal: handleModalLogin } = useModalLogin();

  const { user } = useAuth();
  const { userRole, employeeRole } = useRoles();

  if (!user) {
    handleModalLogin();
    return <Navigate to="/" state={location} replace />;
  }

  const userNoAccess = protectionUser?.some((role) => userRole?.roleName.includes(role));

  const employeeNoAccess = protectionEmployee?.some((role) =>
    employeeRole?.roleName.includes(role),
  );

  if (userNoAccess) return <Navigate to="/forbidden" state={location} replace />;
  if (employeeNoAccess) return <Navigate to="/forbidden" state={location} replace />;

  return children;
};

export default AuthProvider;
