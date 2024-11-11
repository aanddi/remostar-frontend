import React, { useCallback } from 'react';

import { AnnouncementCard, Ribbon, Search } from '@common/components';
import { useModal } from '@common/hooks';

import FilterModal from './components/modal/Filter';

import styles from './SearchOwners.module.scss';
import sortOptions from './constans';
import responseGetAnnouncements from './mock';

const SearchOwners = () => {
  const { isOpenModal, handleOpenModal, handleCloseModal } = useModal();

  const handleSearch = useCallback((data: any) => {
    console.log(data);
  }, []);

  const handleSorting = useCallback((value: string) => {
    console.log(value);
  }, []);

  return (
    <div>
      <div className="container">
        <Search title="Поиск собственника" onOpenFilter={handleOpenModal} onSearch={handleSearch} />
      </div>
      <Ribbon
        pagination
        sortOptions={sortOptions}
        onSorting={handleSorting}
        totalPage={responseGetAnnouncements.totalPage}
        listCount={responseGetAnnouncements.countItems}
        classNameList={styles.listAnnouncements}
      >
        {responseGetAnnouncements.announcements.map((announcement) => {
          return <AnnouncementCard key={announcement.id} data={announcement} />;
        })}
      </Ribbon>
      <FilterModal open={isOpenModal} onCancel={handleCloseModal} />
    </div>
  );
};

export default SearchOwners;
