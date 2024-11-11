import React, { PropsWithChildren, Suspense, lazy, useLayoutEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';

import { Roles, RolesEmployee } from '@common/api/services/auth/types/user.type';
import { AppLayout, AuthLayout } from '@common/components';
import FullScreenLoader from '@common/components/FullScreenLoader';
import AuthProvider from '@common/providers/AuthProtectedProvider';

const SearchOwnersPage = lazy(() => import('./SearchOwners'));
const SearchContractorsPage = lazy(() => import('./SearchContractors'));
const AboutPlatformPage = lazy(() => import('./AboutPlatform'));
const ProfileContractorsPage = lazy(() => import('./ProfileContractor'));
const AboutTenderPage = lazy(() => import('./AboutTender'));

const RegistrationPage = lazy(() => import('./Registration'));

const ProfilePage = lazy(() => import('./Profile'));
const ObjectsPage = lazy(() => import('./Objects'));
const AnnouncementsPage = lazy(() => import('./Announcements'));
const EmployeesPage = lazy(() => import('./Employees'));
const ChatsPage = lazy(() => import('./Chats'));
const FavoritesPage = lazy(() => import('./Favorites'));
const MyCompanyPage = lazy(() => import('./MyCompany'));

const NotFoundPage = lazy(() => import('./NotFound'));
const ForbiddenPage = lazy(() => import('./Forbidden'));

export const ScrollToTop = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

const Router = () => {
  const routes = useRoutes([
    {
      path: '*',
      element: (
        <AppLayout>
          <NotFoundPage />
        </AppLayout>
      ),
    },
    {
      path: '/',
      element: (
        <AppLayout>
          <AboutPlatformPage />
        </AppLayout>
      ),
    },
    {
      path: '/register',
      element: (
        <AuthLayout>
          <RegistrationPage />
        </AuthLayout>
      ),
    },
    {
      path: '/contractors',
      element: (
        <AppLayout>
          <SearchContractorsPage />
        </AppLayout>
      ),
    },

    {
      path: '/contractor/:id',
      element: (
        <AppLayout>
          <ProfileContractorsPage />
        </AppLayout>
      ),
    },
    {
      path: '/tenders',
      element: (
        <AppLayout>
          <SearchOwnersPage />
        </AppLayout>
      ),
    },
    {
      path: '/tender/:id',
      element: (
        <AppLayout>
          <AboutTenderPage />
        </AppLayout>
      ),
    },

    {
      path: '/forbidden',
      element: (
        <AppLayout>
          <ForbiddenPage />
        </AppLayout>
      ),
    },
    {
      path: '/profile',
      element: (
        <AppLayout>
          <AuthProvider>
            <ProfilePage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/employees',
      element: (
        <AppLayout>
          <AuthProvider
            protectionUser={[Roles.Owner]}
            protectionEmployee={[RolesEmployee.Manager, RolesEmployee.Brigadier]}
          >
            <EmployeesPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/objects',
      element: (
        <AppLayout>
          <AuthProvider>
            <ObjectsPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/announcements',
      element: (
        <AppLayout>
          <AuthProvider protectionUser={[Roles.Employee]}>
            <AnnouncementsPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/chats',
      element: (
        <AppLayout>
          <AuthProvider>
            <ChatsPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/favorites',
      element: (
        <AppLayout>
          <AuthProvider>
            <FavoritesPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/company',
      element: (
        <AppLayout>
          <AuthProvider
            protectionUser={[Roles.Owner]}
            protectionEmployee={[RolesEmployee.Manager, RolesEmployee.Brigadier]}
          >
            <MyCompanyPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
  ]);

  return (
    <Suspense fallback={<FullScreenLoader />}>
      <ScrollToTop>{routes}</ScrollToTop>
    </Suspense>
  );
};

export default Router;
