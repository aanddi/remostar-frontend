import { FilePenLine, Trash2 } from 'lucide-react';

import { Button } from '@components';

import { useDeleteServiceContractor } from '@common/api/services/contractor/hooks';
import { useModal } from '@common/hooks';

import { Flex, Popconfirm } from 'antd';

import styles from './Actions.module.scss';

import ServiceModal from '../modal/ServicesModal';

const ActionsAdmin = ({ serviceId }: { serviceId: number }) => {
  const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();

  const { mutate: deleteService, isPending } = useDeleteServiceContractor();

  const onDelete = () => {
    deleteService(serviceId);
  };

  return (
    <Flex gap={16} align="flex-end" className={styles.adminPanel}>
      <Button size="middle" type="text" icon={<FilePenLine size={16} />} onClick={handleOpenModal}>
        Редактировать
      </Button>
      <Popconfirm
        placement="bottom"
        title="Удаление услуги"
        description="Вы действительно хотите удалить услугу?"
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
        serviceId={serviceId}
      />
    </Flex>
  );
};

export default ActionsAdmin;
