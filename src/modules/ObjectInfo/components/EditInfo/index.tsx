import { FilePenLine } from 'lucide-react';

import { Button } from '@components';

import { ObjectModal } from '@common/components';
import { useModal } from '@common/hooks';

const EditInfo = ({ objectId }: { objectId: string }) => {
  const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();
  return (
    <>
      <Button type="primary" icon={<FilePenLine size={14} />} onClick={handleOpenModal}>
        Редактировать
      </Button>
      <ObjectModal
        isModalOpen={isOpenModal}
        handleCancel={handleCloseModal}
        actionType="edit"
        objectId={objectId}
      />
    </>
  );
};

export default EditInfo;
