import { Skeleton, Title } from '@components';

import { useListReviewsUser } from '@common/api/services/reviews';
import { ReviewCard } from '@common/components';
import { useAuth } from '@common/hooks';

import { Empty, Flex } from 'antd';

import Actions from './components/Actions';

const MyReviews = () => {
  const { user } = useAuth();

  const { data: reviews, isLoading } = useListReviewsUser(user?.id!);

  return (
    <div className="container">
      <Title title="Мои отзывы" level={2} />
      <Flex gap={16} vertical>
        {isLoading &&
          // eslint-disable-next-line react/no-array-index-key
          Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} height="300px" />)}
      </Flex>
      <Flex gap={16} vertical>
        {reviews?.map((item) => {
          return (
            <Flex vertical gap={8} style={{ marginTop: '16px' }}>
              <Actions reviewId={item.id} contractorId={item.contractorsId} />
              <ReviewCard key={item.id} data={item} />
            </Flex>
          );
        })}
        {!reviews?.length && !isLoading && <Empty description="Отзывы не найдены" />}
      </Flex>
    </div>
  );
};

export default MyReviews;
