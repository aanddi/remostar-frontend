import { useContext } from 'react';

import { LoginContext } from '@common/context/ModalContext/LoginContext';

const useModalLogin = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) throw new Error('Нет контекста LoginContext');

  return loginContext;
};

export default useModalLogin;
