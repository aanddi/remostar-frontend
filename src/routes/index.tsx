import React, { PropsWithChildren, Suspense, lazy, useLayoutEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';

import { Roles, RolesEmployee } from '@common/api/services/auth/types/user.type';
import { AppLayout, AuthLayout } from '@common/components';
import FullScreenLoader from '@common/components/FullScreenLoader';
import AuthProvider from '@common/providers/AuthProtectedProvider';

const SearchOwnersPage = lazy(() => import('@modules/SearchOwners'));
const SearchContractorsPage = lazy(() => import('@modules/SearchContractors'));
const AboutPlatformPage = lazy(() => import('@modules/AboutPlatform'));
const ProfileContractorsPage = lazy(() => import('@modules/ProfileContractor'));
const AboutTenderPage = lazy(() => import('@modules/AboutTender'));

const RegistrationPage = lazy(() => import('@modules/Registration'));

const ProfilePage = lazy(() => import('@modules/Profile'));
const MyTendersPage = lazy(() => import('@modules/MyTenders'));
const EmployeesPage = lazy(() => import('@modules/Employees'));
const ChatsPage = lazy(() => import('@modules/Chats'));
const FavoritesPage = lazy(() => import('@modules/Favorites'));
const MyCompanyPage = lazy(() => import('@modules/MyCompany'));
const MyReviewsPage = lazy(() => import('@modules/MyReviews'));

const ObjectsListPage = lazy(() => import('@modules/ObjectsList'));
const ObjectDashboardPage = lazy(() => import('@modules/ObjectDashboard'));
const ObjectInfoPage = lazy(() => import('@modules/ObjectInfo'));
const ObjectFilesPage = lazy(() => import('@modules/ObjectsFiles'));
const ObjectStepsPage = lazy(() => import('@modules/ObjectSteps'));
const ObjectStepInfoPage = lazy(() => import('@modules/ObjectStepInfo'));

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
            <ObjectsListPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/objects/:id/dashboard',
      element: (
        <AppLayout>
          <AuthProvider>
            <ObjectDashboardPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/objects/:id/info',
      element: (
        <AppLayout>
          <AuthProvider>
            <ObjectInfoPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/objects/:id/files',
      element: (
        <AppLayout>
          <AuthProvider>
            <ObjectFilesPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/objects/:id/steps',
      element: (
        <AppLayout>
          <AuthProvider>
            <ObjectStepsPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/objects/:id/steps/:step',
      element: (
        <AppLayout>
          <AuthProvider>
            <ObjectStepInfoPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/my-tenders',
      element: (
        <AppLayout>
          <AuthProvider protectionUser={[Roles.Employee]}>
            <MyTendersPage />
          </AuthProvider>
        </AppLayout>
      ),
    },
    {
      path: '/my-reviews',
      element: (
        <AppLayout>
          <AuthProvider protectionUser={[Roles.Employee]}>
            <MyReviewsPage />
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
