import React from 'react';

import { Title } from '@components';

import styles from './Description.module.scss';

const Description = ({ data }: { data?: string }) => {
  return (
    <div className={styles.desc}>
      <Title title="Описание от собственника" level={4} />
      <div className={styles.text}>{data}</div>
    </div>
  );
};

export default Description;
