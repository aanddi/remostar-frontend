import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Pagination } from '@components';

import { ArrowsSort } from '@common/icon';

import { Select, Typography } from 'antd';

import styles from './Ribbon.module.scss';
import IribbonProps from './type';

const Ribbon = ({
  children,
  listCount,
  classNameList,
  pagination,
  totalPage,
  perPage,
  sortOptions,
  onSorting,
}: IribbonProps) => {
  const handleSort = useCallback(
    (value: string) => {
      onSorting?.(value);
    },
    [onSorting],
  );

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const currentPage = parseInt(params.get('page') || '1', 10);

  const handlePageChange = (page: number) => {
    params.set('page', page.toString());

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });

    window.scrollTo({
      top: 0,
    });
  };

  return (
    <section className={styles.ribbon}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Typography.Title level={5} className={styles.count}>
              {listCount} найдено
            </Typography.Title>
            {sortOptions && (
              <Select
                defaultValue={sortOptions[0]}
                options={sortOptions}
                className={styles.selectSort}
                suffixIcon={<ArrowsSort size={20} className={styles.icon} />}
                onChange={(value) => handleSort(value as unknown as string)}
              />
            )}
          </div>
          <div className={`${classNameList}`}>{children}</div>
        </div>
        {pagination && (
          <Pagination
            current={currentPage}
            defaultCurrent={currentPage}
            total={totalPage}
            showSizeChanger={false}
            pageSize={perPage}
            defaultPageSize={10}
            onChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default Ribbon;
