import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Modal, Segmented, Title } from '@components';

import { useModalLogin } from '@common/hooks';

import PasswordLogin from './components/Password';
import PhoneLogin from './components/Phone';

import styles from './LoginModal.module.scss';
import SegmentedLogin from './types';

const ModalLogin = ({ ...rest }) => {
  const [value, setValue] = useState(SegmentedLogin.Phone);
  const { handleCloseModal } = useModalLogin();

  return (
    <Modal centered footer={false} title={false} {...rest} className={styles.modal}>
      <Title title="Войти" level={3} className={styles.title} />
      <div className={styles.segmented}>
        <Segmented
          size="large"
          options={[
            { value: SegmentedLogin.Phone, label: 'По телефону' },
            { value: SegmentedLogin.Password, label: 'По паролю' },
          ]}
          value={value}
          onChange={(valueSegmented) => setValue(valueSegmented as SegmentedLogin)}
        />
      </div>
      <div className={styles.content}>
        {value === SegmentedLogin.Phone ? <PhoneLogin /> : <PasswordLogin />}
      </div>
      <div className={styles.footer}>
        <div className={styles.register}>
          У Вас нет аккаунта?{' '}
          <Link to="/register" onClick={() => handleCloseModal()}>
            Зарегистрироваться
          </Link>
        </div>
        {/* <Link to="/" onClick={() => handleCloseModal()} className={styles.help}>
          Не могу войти
        </Link> */}
      </div>
    </Modal>
  );
};

export default ModalLogin;
