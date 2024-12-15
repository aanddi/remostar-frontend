import { FilePenLine, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@components';

import { useDeleteReview } from '@common/api/services/reviews';
import { ReviewModal } from '@common/components';
import { useModal } from '@common/hooks';

import { Flex, Popconfirm } from 'antd';

import styles from './Actions.module.scss';

const ActionsAdmin = ({ reviewId, contractorId }: { reviewId: number; contractorId: number }) => {
  const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();

  const { mutate: deleteService, isPending } = useDeleteReview();

  const onDelete = () => {
    deleteService(reviewId);
  };

  return (
    <Flex gap={16} align="center" className={styles.adminPanel}>
      <Button size="middle" type="text" icon={<FilePenLine size={16} />} onClick={handleOpenModal}>
        Редактировать
      </Button>
      <Popconfirm
        placement="bottom"
        title="Удаление отзыва"
        description="Вы действительно хотите удалить отзыв?"
        onConfirm={onDelete}
        okText="Удалить"
        cancelText="Отменить"
      >
        <Button size="middle" type="text" danger icon={<Trash2 size={16} />} loading={isPending}>
          Удалить
        </Button>
      </Popconfirm>
      <Link to={`/contractor/${contractorId}`}>Ссылка на подрядчика</Link>
      <ReviewModal
        isModalOpen={isOpenModal}
        handleCancel={handleCloseModal}
        actionType="edit"
        reviewId={reviewId}
      />
    </Flex>
  );
};

export default ActionsAdmin;
