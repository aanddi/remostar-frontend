import React from 'react';

import { IPopularContractorResponse } from '@common/api/services/contractor';
// import { Skeleton } from '@components';
import { Verify } from '@common/components';

import { Avatar, Typography } from 'antd';

import styles from './PopularContractors.module.scss';

interface PopularContractorsProps {
  contractors?: IPopularContractorResponse[];
  loading: boolean;
}

const PopularContractors = ({ contractors }: PopularContractorsProps) => (
  <aside className={styles.popular}>
    <Typography.Title level={5} className={styles.title}>
      Популярные подрядчики
    </Typography.Title>
    <div className={styles.list}>
      {/* {loading && } */}
      {contractors?.map((contractor) => {
        return (
          <div key={contractor.id} className={styles.card}>
            <div className={styles.wrapper}>
              <Avatar
                size={110}
                src={
                  contractor.pathLogo
                    ? contractor.pathLogo
                    : 'src/assets/Contractors/default-avatar.png'
                }
              />
              <div className={styles.name}>
                <span>
                  {contractor.name} {contractor.veryfi && <Verify strokeWidth={1} size={16} />}
                </span>

                <div className={styles.statistick}>
                  {contractor.reviewCount} {contractor.gradeTotal}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </aside>
);

export default PopularContractors;
