import React, { useMemo } from 'react';

import { Tabs, Title } from '@components';

import { useContractorInfo } from '@common/api/services/contractor/hooks';
import { useAuth } from '@common/hooks';

import Info from './components/Info';
import Portfolio from './components/Portfolio';
import Services from './components/Services';

import styles from './MyCompany.module.scss';

const MyCompany = () => {
  const user = useAuth();

  const { data: contractor, isLoading } = useContractorInfo(user?.employee?.contractorId!);

  const items = useMemo(
    () => [
      {
        key: 'info',
        label: 'Информация',
        children: (
          <Info
            contractorId={user?.employee?.contractorId!}
            info={contractor}
            loading={isLoading}
          />
        ),
      },
      {
        key: 'services',
        label: 'Услуги',
        children: <Services data={contractor?.services} loading={isLoading} />,
      },
      {
        key: 'portfolio',
        label: 'Портфолио',
        children: <Portfolio data={contractor?.portfolio} loading={isLoading} />,
      },
    ],
    [contractor, isLoading, user],
  );

  return (
    <div className={styles.company}>
      <div className="container">
        <Title title="Моя компания" level={2} />
        <Tabs defaultActiveKey="info" items={items} size="large" />
      </div>
    </div>
  );
};

export default MyCompany;
