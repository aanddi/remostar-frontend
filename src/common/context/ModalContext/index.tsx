import { PropsWithChildren } from 'react';

import CitysProvider from './CitysContext';
import LoginProvider from './LoginContext';

const ModalContext = ({ children }: PropsWithChildren) => {
  return (
    <LoginProvider>
      <CitysProvider>{children}</CitysProvider>
    </LoginProvider>
  );
};

export default ModalContext;
