import { Controller, useForm } from 'react-hook-form';

import { Button, InputPassword, InputPhone } from '@components';
import ErrorMessage from '@components/Form/ErrorMessage';

import { ILoginPassword } from '@common/api/services/auth/types/login.type';
import { useModalLogin } from '@common/hooks';

import styles from './Password.module.scss';

import { useLoginPassword } from '../../api';

const PasswordLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ILoginPassword>({
    mode: 'onChange',
  });

  const { handleCloseModal } = useModalLogin();
  const { mutate: loginUser, isPending, error } = useLoginPassword(handleCloseModal);

  const handleIPasswordLogin = (data: ILoginPassword) => {
    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(handleIPasswordLogin)} className={styles.form}>
      <Controller
        name="phone"
        control={control}
        rules={{
          validate: {
            minLength: (value) => String(value).length > 17,
          },
        }}
        render={({ field }) => <InputPhone label="Номер телефона" inputField={field} />}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Введите пароль',
          minLength: { value: 6, message: 'Пароль должен содержать не менее 6 символов' },
        }}
        render={({ field }) => (
          <InputPassword label="Пароль" error={errors.password?.message} {...field} />
        )}
      />
      <Button disabled={!isValid} size="large" type="primary" htmlType="submit" loading={isPending}>
        Войти
      </Button>
      <ErrorMessage message={error?.response?.data?.message} />
    </form>
  );
};

export default PasswordLogin;
