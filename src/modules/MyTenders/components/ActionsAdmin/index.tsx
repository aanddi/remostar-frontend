import { FilePenLine, Trash2 } from 'lucide-react';

import { Button } from '@components';

import { useDeleteTender } from '@common/api/services/tenders/hooks';
import { useModal } from '@common/hooks';

import { Flex, Popconfirm } from 'antd';

import styles from './ActionsAdmin.module.scss';

import TenderModal from '../modal/TenderModal';

const ActionsAdmin = ({ tenderId }: { tenderId: string }) => {
  const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();

  const { mutate: deleteTender, isPending } = useDeleteTender();

  const onDelete = () => {
    deleteTender(tenderId);
  };

  return (
    <Flex gap={16} align="flex-end" className={styles.adminPanel}>
      <Button size="middle" type="text" icon={<FilePenLine size={16} />} onClick={handleOpenModal}>
        Редактировать
      </Button>
      <Popconfirm
        placement="bottom"
        title="Удаление тендера"
        description="Вы действительно хотите удалить тендер?"
        onConfirm={onDelete}
        okText="Удалить"
        cancelText="Отменить"
      >
        <Button size="middle" type="text" danger icon={<Trash2 size={16} />} loading={isPending}>
          Удалить
        </Button>
      </Popconfirm>
      <TenderModal
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        typeActions="edit"
        tenderId={tenderId}
      />
    </Flex>
  );
};

export default ActionsAdmin;
