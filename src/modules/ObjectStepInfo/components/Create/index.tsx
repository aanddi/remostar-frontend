import { Plus } from 'lucide-react';
import React from 'react';

import { Button } from '@components';

import { useModal } from '@common/hooks';

import CreateReportModal from '../modal/CreateReportModal';

const CreateReport = () => {
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
        Новый отчет
      </Button>
      <CreateReportModal isModalOpen={isOpenModal} handleCancel={handleCloseModal} />
    </>
  );
};

export default CreateReport;
