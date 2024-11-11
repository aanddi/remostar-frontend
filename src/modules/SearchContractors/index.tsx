import { useCallback, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Skeleton } from '@components';

import { ContractorsCard, Ribbon, Search } from '@common/components';
import { useModal } from '@common/hooks';

import { Empty } from 'antd';

import FilterModal from './components/modal/Filter';

import styles from './SearchContractors.module.scss';
import { useRibbonContractor } from './api';
import { sortOptions } from './constans';

const SearchContractors = () => {
  const location = useLocation();
  const [params] = useSearchParams();

  const { isOpenModal, handleOpenModal, handleCloseModal } = useModal();

  const {
    data: dataRibbon,
    isFetching: isFetchingRibbon,
    refetch,
  } = useRibbonContractor(params as any);

  const handleSearch = useCallback((data: any) => {
    console.log(data);
  }, []);

  const handleSort = useCallback((value: string) => {
    console.log(value);
  }, []);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  return (
    <div className={styles.contartors}>
      <div className="container">
        <Search title="Поиск подрядчиков" onSearch={handleSearch} onOpenFilter={handleOpenModal} />
      </div>
      {!isFetchingRibbon && !dataRibbon ? (
        <Empty description="Подрядчики не найдены" />
      ) : (
        <Ribbon
          pagination
          sortOptions={sortOptions}
          onSorting={handleSort}
          totalPage={dataRibbon?.pages}
          perPage={dataRibbon?.page_per}
          listCount={dataRibbon?.found}
          classNameList={styles.listConractors}
        >
          <div className={styles.contractors}>
            {isFetchingRibbon &&
              [...Array(3)].map((_, index) => {
                // eslint-disable-next-line react/no-array-index-key
                return <Skeleton key={index} width="100%" height="300px" />;
              })}

            {dataRibbon?.items.map((item: any) => {
              return <ContractorsCard key={item.id} data={item} />;
            })}
          </div>
        </Ribbon>
      )}
      <FilterModal open={isOpenModal} onCancel={handleCloseModal} />
    </div>
  );
};

export default SearchContractors;
