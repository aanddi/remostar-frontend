import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Input } from '@components';

import { useAppSelector, useModalCitys } from '@common/hooks';
import { Filter, Map } from '@common/icon';

import { Badge, Typography } from 'antd';

import { FiSearch } from 'react-icons/fi';

import styles from './Seacr.module.scss';
import { ISearch, ISearchProps } from './type';

const Search = ({ title, onOpenFilter, totalCountFilter }: ISearchProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlQueryParams = new URLSearchParams(location.search);

  const { control, getValues, reset } = useForm<ISearch>();

  const { handleOpenModal: handleModalCity } = useModalCitys();

  const { city } = useAppSelector((state) => state.citys);

  const handleFilter = useCallback(() => {
    onOpenFilter?.();
  }, [onOpenFilter]);

  const handleSearch = () => {
    const search = getValues().searchField;

    if (search) urlQueryParams.set('search', getValues().searchField);
    urlQueryParams.set('region', city);

    navigate({
      pathname: location.pathname,
      search: urlQueryParams.toString(),
    });
  };

  const handleReset = () => {
    reset();
    navigate({
      pathname: location.pathname,
      search: '',
    });
  };

  return (
    <section className={styles.search}>
      <div className={styles.wrapper}>
        <Typography.Title className={styles.title}>{title}</Typography.Title>
        <form className={styles.form}>
          <div className={styles.body}>
            <Controller
              name="searchField"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Поиск"
                  size="large"
                  prefix={<FiSearch className={styles.iconSearch} size={18} />}
                  className={styles.field}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.actions}>
            <Button
              type="default"
              size="large"
              icon={<Map size={18} />}
              onClick={() => handleModalCity()}
            >
              {city}
            </Button>
            {onOpenFilter && (
              <Badge count={totalCountFilter} className={styles.filter}>
                <Button type="default" size="large" onClick={handleFilter}>
                  <Filter size={20} />
                </Button>
              </Badge>
            )}
            <Button type="default" size="large" onClick={handleReset}>
              Сбросить
            </Button>
            <Button type="primary" size="large" onClick={handleSearch} className={styles.submit}>
              Найти
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;
