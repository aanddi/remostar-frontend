import { PropsWithChildren } from 'react';

import { AppFooter, AppHeader } from '@common/components';
import { ModalContext } from '@common/context';

import { FloatButton, Layout } from 'antd';

import { FaArrowUp } from 'react-icons/fa6';

import styles from './AppLayout.module.scss';

const { Content } = Layout;

const AppLayout = ({ children }: PropsWithChildren) => (
  <ModalContext>
    <Layout className={styles.layout}>
      <AppHeader />
      <Content className={styles.content}>{children}</Content>
      <FloatButton.BackTop icon={<FaArrowUp />} />
      <AppFooter />
    </Layout>
  </ModalContext>
);

export default AppLayout;
