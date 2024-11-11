import { PropsWithChildren, createContext, useMemo } from 'react';

import { CitysModal } from '@common/components';
import { useModal } from '@common/hooks';

type IContextLogin = {
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

export const CitysContext = createContext<IContextLogin | null>(null);

const CitysProvider = ({ children }: PropsWithChildren) => {
  const { isOpenModal, handleOpenModal, handleCloseModal } = useModal();

  const value = useMemo(() => {
    return { handleOpenModal, handleCloseModal };
  }, [handleCloseModal, handleOpenModal]);

  return (
    <CitysContext.Provider value={value}>
      <CitysModal open={isOpenModal} onCancel={handleCloseModal} />
      {children}
    </CitysContext.Provider>
  );
};

export default CitysProvider;
