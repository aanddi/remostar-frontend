import { Breadcrumb, Image, Skeleton } from '@components';

import { IContractorInfo } from '@common/api/services/contractor';
import { Verify } from '@common/components';
import { formatDate } from '@common/utils';

import styles from './Header.module.scss';

const Header = ({ data, loading }: { data?: IContractorInfo; loading: boolean }) => {
  const itemsBreadcrumb = [
    {
      title: 'Поиск подрядчика',
      href: '/contractors',
    },
    {
      title: data?.name ?? 'Подрядчик',
    },
  ];

  return (
    <div className={styles.header}>
      <Breadcrumb items={itemsBreadcrumb} />
      <div className={styles.card}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {loading ? (
              <Skeleton height="30px" />
            ) : (
              <div className={styles.name}>
                {data?.name}
                {data?.veryfi && <Verify />}
              </div>
            )}
            {loading ? (
              <Skeleton height="30px" />
            ) : (
              <div className={styles.info}>
                <div className={styles.type}> {data?.typeCompany}</div>
                <div className={styles.time}>
                  Зарегистрирован - {formatDate(data?.createdAt, 'MMMM YYYY')}
                </div>
              </div>
            )}
          </div>
          <div className={styles.logo}>
            <Image
              preview={false}
              src={
                data?.pathLogo ??
                'https://static.tildacdn.com/tild3865-3065-4436-a138-323766306537/BuildersLabourer_Ico.png'
              }
              width={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
