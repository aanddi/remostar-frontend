import { Button, Title } from '@components';

import { IContractorReviews } from '@common/api/services/contractor';
import { Add } from '@common/icon';

import { Empty, Skeleton } from 'antd';

import Card from './components/Card';
import Statistics from './components/Statistics';

import styles from './Reviews.module.scss';

const Reviews = ({ data, loading }: { data?: IContractorReviews; loading: boolean }) => {
  return (
    <section className={styles.reviews}>
      <div className={styles.header}>
        <Title title="Отзывы" afterContent={data?.items.length} level={3} />
        <Button type="primary" icon={<Add size={18} />}>
          Написать отзыв
        </Button>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Statistics data={data?.statistics!} />
          <div className={styles.content}>
            <div className={styles.ribbon}>
              {data?.items.map((review) => {
                return <Card key={review.id} data={review} />;
              })}
              {!data?.items?.length && !loading && <Empty description="Отзывы не найдены" />}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Reviews;
