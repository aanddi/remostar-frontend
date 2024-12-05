import React from 'react';

import { IContractorServices } from '@common/api/services/contractor';

import styles from './ServiceItem.module.scss';

const ServiceItem = ({ service }: { service: IContractorServices }) => (
  <div className={styles.serviceItem}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{service.servicesName}</div>
        <div className={styles.desc}>{service.servicesDesc}</div>
      </div>
      <div className={styles.salary}>от {service.servicesSalary}</div>
    </div>
  </div>
);

export default ServiceItem;
