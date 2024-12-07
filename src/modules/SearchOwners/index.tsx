import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Skeleton } from '@components';

import { useGetTenders } from '@common/api/services/tenders/hooks';
import { Ribbon, Search, TenderCard } from '@common/components';
import { useModal } from '@common/hooks';

import { Empty } from 'antd';

import FilterModal from './components/modal/Filter';

import styles from './SearchOwners.module.scss';

const SearchOwners = () => {
  const [params] = useSearchParams();
  const { isOpenModal, handleOpenModal, handleCloseModal } = useModal();

  const { data: tenders, refetch, isFetching } = useGetTenders(params.toString());

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <div>
      <div className="container">
        <Search title="Поиск тендеров" onOpenFilter={handleOpenModal} />
      </div>
      {!isFetching && !tenders?.items.length ? (
        <Empty description="Тендеры не найдены" />
      ) : (
        <Ribbon
          pagination
          totalPage={tenders?.pages}
          perPage={tenders?.page_per}
          listCount={tenders?.found}
          classNameList={styles.listAnnouncements}
        >
          {isFetching &&
            [...Array(3)].map((_, index) => {
              // eslint-disable-next-line react/no-array-index-key
              return <Skeleton key={index} width="100%" height="300px" />;
            })}

          {tenders?.items?.map((tender) => {
            return <TenderCard key={tender.id} data={tender} />;
          })}
        </Ribbon>
      )}
      <FilterModal open={isOpenModal} onCancel={handleCloseModal} />
    </div>
  );
};

export default SearchOwners;
