import React, { PropsWithChildren, createContext, useMemo } from 'react';

import { LoginModal } from '@common/components';
import { useModal } from '@common/hooks';

type IContextLogin = {
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

export const LoginContext = createContext<IContextLogin | null>(null);

const LoginProvider = ({ children }: PropsWithChildren) => {
  const { isOpenModal, handleOpenModal, handleCloseModal } = useModal();

  const value = useMemo(() => {
    return { handleOpenModal, handleCloseModal };
  }, [handleCloseModal, handleOpenModal]);

  return (
    <LoginContext.Provider value={value}>
      <LoginModal open={isOpenModal} onCancel={handleCloseModal} />
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
