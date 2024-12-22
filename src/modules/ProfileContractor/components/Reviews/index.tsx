import { Link, useParams } from 'react-router-dom';

import { Button, Title } from '@components';

import { IContractorReviews } from '@common/api/services/contractor';
import { useCheckReviewUser } from '@common/api/services/reviews';
import { ReviewCard, ReviewModal } from '@common/components';
import { useAuth, useModal, useRoles } from '@common/hooks';
import { Add } from '@common/icon';
import { formatDate } from '@common/utils';

import { Empty, Skeleton, Tag } from 'antd';

import Statistics from './components/Statistics';

import styles from './Reviews.module.scss';

const Reviews = ({ data, loading }: { data?: IContractorReviews; loading: boolean }) => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isOwner } = useRoles();

  const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();

  const { data: checkReview, isLoading } = useCheckReviewUser(user?.id!, +id!);

  return (
    <section className={styles.reviews}>
      <div className={styles.header}>
        <Title title="Отзывы" afterContent={data?.items.length} level={3} />
        {checkReview?.createAt && (
          <Link to="/my-reviews">
            <Tag color="green">Вы оставили отзыв {formatDate(checkReview.createAt)}</Tag>
          </Link>
        )}
        {isOwner && !checkReview?.createAt && (
          <Button
            type="primary"
            icon={<Add size={18} />}
            onClick={handleOpenModal}
            loading={isLoading}
          >
            Написать отзыв
          </Button>
        )}
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Statistics data={data?.statistics!} count={data?.items.length} />
          <div className={styles.content}>
            <div className={styles.ribbon}>
              {data?.items.map((review) => {
                return <ReviewCard key={review.id} data={review} />;
              })}
              {!data?.items?.length && !loading && <Empty description="Отзывы не найдены" />}
            </div>
          </div>
        </>
      )}
      <ReviewModal
        isModalOpen={isOpenModal}
        handleCancel={handleCloseModal}
        actionType="create"
        contractorId={+id!}
      />
    </section>
  );
};

export default Reviews;
