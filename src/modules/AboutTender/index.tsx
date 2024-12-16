import React from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumb, GalleryThumbs } from '@components';

import { useGetTenderById } from '@common/api/services/tenders/hooks';
import { formatDate } from '@common/utils';

import { Skeleton } from 'antd';

import { Aside, Description, Info, Location } from './components';

import styles from './AboutTender.module.scss';

const AboutTender = () => {
  const { id } = useParams();

  const { data: tender, isFetching } = useGetTenderById(id!);

  const itemsBreadcrumb = [
    {
      title: 'Поиск собственника',
      href: '/tenders',
    },
    {
      title: tender?.name ?? 'Название',
    },
  ];

  return (
    <div className={styles.tender}>
      <div className="container">
        <Breadcrumb items={itemsBreadcrumb} />
        {isFetching ? (
          <Skeleton active style={{ marginTop: '16px' }} />
        ) : (
          <>
            <div className={styles.date}>Опубликовано: {formatDate(tender?.createdAt)}</div>
            <div className={styles.content}>
              <div className={styles.body}>
                <GalleryThumbs
                  data={tender?.gallery ? tender?.gallery.split(',') : []}
                  className={styles.slider}
                />
                <Info data={tender} />
                <Description data={tender?.desc} />
                <Location address={tender?.address!} />
              </div>
              <Aside data={tender} className={styles.aside} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutTender;
