import { PropsWithChildren } from 'react';

import { useGetUserProfile } from '@common/api/services/user';
import { AppFooter, AppHeader } from '@common/components';
import FullScreenLoader from '@common/components/FullScreenLoader';
import { ModalContext } from '@common/context';
import { useAuth } from '@common/hooks';

import { FloatButton, Layout } from 'antd';

import { FaArrowUp } from 'react-icons/fa6';

import styles from './AppLayout.module.scss';

const { Content } = Layout;

const AppLayout = ({ children }: PropsWithChildren) => {
  const { isAuthorized } = useAuth();

  const { isFetching } = useGetUserProfile(isAuthorized);

  if (isFetching) return <FullScreenLoader />;

  return (
    <ModalContext>
      <Layout className={styles.layout}>
        <AppHeader />
        <Content className={styles.content}>{children}</Content>
        <FloatButton.BackTop icon={<FaArrowUp />} />
        <AppFooter />
      </Layout>
    </ModalContext>
  );
};

export default AppLayout;
