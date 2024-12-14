import { Plus } from 'lucide-react';

import { Button } from '@components';

import { useModal } from '@common/hooks';

import PortfolioModal from '../modal/PortfolioModal';

const CreatePortfolio = () => {
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
      <PortfolioModal
        isModalOpen={isOpenModal}
        handleCancel={handleCloseModal}
        actionType="create"
      />
    </>
  );
};

export default CreatePortfolio;
