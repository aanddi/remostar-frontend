import React, { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Tabs } from '@components';

import { useContractorPortfolio } from '@common/api/services/contractor/hooks';
import { Briefcase, Home } from '@common/icon';

import { HiChatAlt2 } from 'react-icons/hi';
import { HiMiniClipboardDocumentCheck } from 'react-icons/hi2';

import { AboutUs, Header, Portfolio, Reviews, Services } from './components';

import styles from './ProfileContractor.module.scss';
import './ProfileContractor.scss';
import { PortfolioEnum } from './types';

const ICON_SIZE = 25;

const ProfileContractor = () => {
  const { id } = useParams();
  const location = useLocation();

  const { data: contractorProfile, isLoading } = useContractorPortfolio(id!);

  const queryParams = new URLSearchParams(location.search);
  const queryParamValue = queryParams.get('view');

  const items = useMemo(
    () => [
      {
        key: PortfolioEnum.about,
        label: 'О нас',
        children: <AboutUs data={contractorProfile?.info} loading={isLoading} />,
        icon: <Home size={ICON_SIZE} />,
      },
      {
        key: PortfolioEnum.services,
        label: 'Услуги',
        children: <Services data={contractorProfile?.services} loading={isLoading} />,
        icon: <Briefcase size={ICON_SIZE} />,
      },
      {
        key: PortfolioEnum.portfolio,
        label: 'Портфолио',
        children: <Portfolio data={contractorProfile?.portfolio} loading={isLoading} />,
        icon: <HiMiniClipboardDocumentCheck size={ICON_SIZE} />,
      },
      {
        key: PortfolioEnum.reviews,
        label: 'Отзывы',
        children: <Reviews data={contractorProfile?.reviews} loading={isLoading} />,
        icon: <HiChatAlt2 size={ICON_SIZE} />,
      },
    ],
    [contractorProfile, isLoading],
  );

  return (
    <div className={styles.profile}>
      <div className="container">
        <Header data={contractorProfile?.info} loading={isLoading} />
        <Tabs
          className={`tabsProfile ${styles.tabs}`}
          defaultActiveKey={queryParamValue ?? PortfolioEnum.about}
          items={items}
        />
      </div>
    </div>
  );
};

export default ProfileContractor;
