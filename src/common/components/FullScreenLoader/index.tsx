import { Loading } from '@common/icon';

import Logo from '@assets/Logo.svg?react';

import { Spin } from 'antd';

import styles from './FullScreenLoader.module.scss';

const FullScreenLoader = () => {
  return (
    <div className={styles.load}>
      <Logo />
      <Spin indicator={<Loading className={styles.icon} spin />} size="large" />
    </div>
  );
};

export default FullScreenLoader;
