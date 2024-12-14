import { Plus } from 'lucide-react';

import { Button, Skeleton, Title } from '@components';

import { useGetMyTenders } from '@common/api/services/tenders/hooks';
import { Ribbon, TenderCard } from '@common/components';
import { useAuth, useModal } from '@common/hooks';

import { Empty, Flex } from 'antd';

import ActionsAdmin from './components/ActionsAdmin';
import TenderModal from './components/modal/TenderModal';

import styles from './Announcements.module.scss';

const Announcements = () => {
  const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();
  const user = useAuth();

  const { data: tenders, isFetching } = useGetMyTenders(user?.id!);

  return (
    <div className={styles.announcements}>
      <div className="container">
        <Flex gap={16} align="center" style={{ marginBottom: '16px' }}>
          <Title title="Тендеры" level={2} />
          <Button size="large" icon={<Plus />} type="primary" onClick={handleOpenModal}>
            Создать
          </Button>
        </Flex>
      </div>
      <Ribbon listCount={tenders?.length} classNameList={styles.ribbon}>
        {!isFetching && !tenders?.length ? (
          <Empty description="Тендеры не найдены" />
        ) : (
          <>
            <Flex gap={16} vertical>
              {isFetching &&
                [...Array(3)].map((_, index) => {
                  // eslint-disable-next-line react/no-array-index-key
                  return <Skeleton key={index} width="100%" height="300px" />;
                })}
            </Flex>

            <Flex vertical style={{ marginTop: '16px' }} gap={32}>
              {tenders?.map((tender) => {
                return (
                  <Flex vertical>
                    <ActionsAdmin tenderId={tender.id} />
                    <TenderCard key={tender.id} data={tender} />
                  </Flex>
                );
              })}
            </Flex>
          </>
        )}
      </Ribbon>
      <TenderModal
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        typeActions="create"
      />
    </div>
  );
};

export default Announcements;
