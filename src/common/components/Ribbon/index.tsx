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
}: IribbonProps) => {
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

  const urlQueryParams = new URLSearchParams(location.search);

  const handleChangeSortItem = (value: string) => {
    urlQueryParams.set('sort', value);
    navigate({
      pathname: location.pathname,
      search: urlQueryParams.toString(),
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
                onChange={(value) => handleChangeSortItem(value as unknown as string)}
              />
            )}
          </div>
          <div className={`${classNameList}`}>{children}</div>
        </div>
        {pagination && !!listCount && (
          <Pagination
            current={currentPage}
            total={totalPage! * perPage! || 1}
            showSizeChanger={false}
            pageSize={perPage}
            onChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default Ribbon;
