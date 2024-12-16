import { Skeleton, Title } from '@components';

import { useObjectList } from '@common/api/services/objects';
import { ObjectCard } from '@common/components';
import { useAuth, useRoles } from '@common/hooks';

import { Empty, Flex } from 'antd';

import CreateObject from './components/Create';

import styles from './Objects.module.scss';

const Objects = () => {
  const user = useAuth();
  const { isOwner } = useRoles();
  const { isEmployee } = useRoles();

  const { data: objects, isLoading } = useObjectList(
    isOwner,
    user?.id!,
    user?.employee?.contractorId!,
  );

  return (
    <div className={styles.objects}>
      <div className="container">
        <Flex vertical>
          <Title title="Объекты" level={2} />
          {isEmployee && <CreateObject />}
        </Flex>
        <Flex gap={16} vertical>
          {isLoading &&
            // eslint-disable-next-line react/no-array-index-key
            Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} height="300px" />)}
        </Flex>
        <Flex gap={16} vertical>
          {objects?.map((item) => {
            return (
              <Flex vertical gap={8} style={{ marginTop: '16px' }}>
                {/* <Actions reviewId={item.id} contractorId={item.contractorsId} /> */}
                <ObjectCard key={item.id} data={item} />
              </Flex>
            );
          })}
        </Flex>
        {!objects?.length && !isLoading && <Empty description="Объекты не найдены" />}
      </div>
    </div>
  );
};

export default Objects;
