import { Skeleton, Title } from '@components';

import { IContractorServices } from '@common/api/services/contractor';
import { ServiceItem } from '@common/components';

import { Empty } from 'antd';

import styles from './Services.module.scss';

const Services = ({ data, loading }: { data?: IContractorServices[]; loading: boolean }) => {
  return (
    <section className={styles.services}>
      <Title title="Услуги" afterContent={data?.length} level={3} />
      <div className={styles.rabbit}>
        {loading &&
          // eslint-disable-next-line react/no-array-index-key
          Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} height="100px" />)}

        {data?.map((item) => {
          return <ServiceItem key={item.id} service={item} />;
        })}

        {!data?.length && !loading && <Empty description="Услуги не найдены" />}
      </div>
    </section>
  );
};

export default Services;
