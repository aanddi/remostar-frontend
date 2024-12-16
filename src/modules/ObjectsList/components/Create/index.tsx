import { Plus } from 'lucide-react';

import { Button } from '@components';

import { ObjectModal } from '@common/components';
import { useModal } from '@common/hooks';

const CreateObject = () => {
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
      <ObjectModal isModalOpen={isOpenModal} handleCancel={handleCloseModal} actionType="create" />
    </>
  );
};

export default CreateObject;
