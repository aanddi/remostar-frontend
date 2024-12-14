import { FilePenLine, Trash2 } from 'lucide-react';

import { Button } from '@components';

import { useDeleteServicePortfolio } from '@common/api/services/contractor/hooks';
import { useModal } from '@common/hooks';

import { Flex, Popconfirm } from 'antd';

import styles from './Actions.module.scss';

import ServiceModal from '../modal/PortfolioModal';

const ActionsAdmin = ({ portfolioId }: { portfolioId: number }) => {
  const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();

  const { mutate: deleteService, isPending } = useDeleteServicePortfolio();

  const onDelete = () => {
    deleteService(portfolioId);
  };

  return (
    <Flex gap={16} align="flex-end" className={styles.adminPanel}>
      <Button size="middle" type="text" icon={<FilePenLine size={16} />} onClick={handleOpenModal}>
        Редактировать
      </Button>
      <Popconfirm
        placement="bottom"
        title="Удаление работы"
        description="Вы действительно хотите удалить работу?"
        onConfirm={onDelete}
        okText="Удалить"
        cancelText="Отменить"
      >
        <Button size="middle" type="text" danger icon={<Trash2 size={16} />} loading={isPending}>
          Удалить
        </Button>
      </Popconfirm>
      <ServiceModal
        isModalOpen={isOpenModal}
        handleCancel={handleCloseModal}
        actionType="edit"
        portfolioId={portfolioId}
      />
    </Flex>
  );
};

export default ActionsAdmin;
