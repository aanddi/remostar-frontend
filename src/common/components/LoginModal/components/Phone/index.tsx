import React, { useCallback } from 'react';

import { ILoginPhone } from '@common/api/services/auth/types/login.type';
import { VerificationPhone } from '@common/components';
import { useModalLogin } from '@common/hooks';

import styles from './Phone.module.scss';

import { useLoginPhone } from '../../api';

const PhoneLogin = () => {
  const { handleCloseModal } = useModalLogin();

  const { mutate: login } = useLoginPhone(handleCloseModal);

  const handleLogin = useCallback(
    (data: ILoginPhone) => {
      login(data);
    },
    [login],
  );

  return (
    <div className={styles.verifivation}>
      <VerificationPhone
        handleVerification={handleLogin}
        typeVerification="login"
        classNameBackButton={styles.backVerification}
      />
    </div>
  );
};

export default PhoneLogin;
