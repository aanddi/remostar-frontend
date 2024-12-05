import { Skeleton, Title } from '@components';

import { IContractorPortfolio } from '@common/api/services/contractor';

import { Empty } from 'antd';

import Card from './components/Card';

import styles from './Portfolio.module.scss';

const Portfolio = ({ data, loading }: { data?: IContractorPortfolio[]; loading: boolean }) => {
  return (
    <section className={styles.portfolio}>
      <Title title="Портфолио" afterContent={data?.length} level={3} />
      <div className={styles.ribbon}>
        {loading &&
          // eslint-disable-next-line react/no-array-index-key
          Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} height="300px" />)}

        {data?.map((work) => {
          return <Card key={work.id} data={work} />;
        })}

        {!data?.length && !loading && <Empty description="Работы не найдены" />}
      </div>
    </section>
  );
};

export default Portfolio;
