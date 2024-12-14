import { Plus } from 'lucide-react';

import { Button } from '@components';

import { useModal } from '@common/hooks';

import ServicesModal from '../modal/ServicesModal';

const CreateServices = () => {
  const { isOpenModal, handleOpenModal, handleCloseModal } = useModal();
  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<Plus />}
        style={{ width: 'max-content' }}
        onClick={handleOpenModal}
      >
        Добавить
      </Button>
      <ServicesModal
        isModalOpen={isOpenModal}
        handleCancel={handleCloseModal}
        actionType="create"
      />
    </>
  );
};

export default CreateServices;
