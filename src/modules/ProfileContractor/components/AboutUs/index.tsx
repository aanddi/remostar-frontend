import React from 'react';
import { Link } from 'react-router-dom';

import { Title } from '@components';

import { IContractorInfo } from '@common/api/services/contractor';

import { Descriptions, Skeleton } from 'antd';

import styles from './AboutUs.module.scss';

const notIndicated = 'Не указано';
const fontSize = '16px';

const AboutUs = ({ data, loading }: { data?: IContractorInfo; loading: boolean }) => {
  return (
    <section className={styles.about}>
      <Title title="О нас" level={3} />
      {loading ? (
        <Skeleton paragraph active />
      ) : (
        <div className={styles.wrapper}>
          <Descriptions
            className={styles.info}
            contentStyle={{ fontSize }}
            labelStyle={{ fontSize }}
          >
            <Descriptions.Item label="Размер компании">
              {data?.countEmployees ?? notIndicated}
            </Descriptions.Item>
            <Descriptions.Item label="Телефон"> {data?.phone ?? notIndicated}</Descriptions.Item>
            <Descriptions.Item label="Сайт компании">
              {data?.cite ? (
                <Link to={data?.cite} target="_blank">
                  Ссылка
                </Link>
              ) : (
                notIndicated
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Юр. название">
              {data?.legalName ?? notIndicated}
            </Descriptions.Item>
          </Descriptions>
          <div className={styles.desc}>{data?.descCompany}</div>
        </div>
      )}
    </section>
  );
};

export default AboutUs;
