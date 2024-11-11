import { Controller, useForm } from 'react-hook-form';

import { useRegisterOwner } from '@modules/Registration/api';

import { Button, Input } from '@components';
import ErrorMessage from '@components/Form/ErrorMessage';

import { IRegisterOwner } from '@common/api/services/auth/types/register.type';

import { Radio } from 'antd';

import styles from './Owners.module.scss';

interface IOwnersRegister {
  phone: string;
}

const OwnersRegister = ({ phone }: IOwnersRegister) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IRegisterOwner>({
    mode: 'onChange',
    defaultValues: {
      phone,
    },
  });

  const { mutate: registerOwner, error, isPending } = useRegisterOwner();

  const handleRegisterOwner = (data: IRegisterOwner) => {
    registerOwner(data);
  };
  return (
    <div className={styles.contactor}>
      <form onSubmit={handleSubmit(handleRegisterOwner)} className={styles.form}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Введите имя' }}
          render={({ field }) => (
            <Input label="Имя" isRequired error={errors.name?.message} {...field} />
          )}
        />
        <Controller
          name="surname"
          control={control}
          rules={{ required: 'Введите фамилию' }}
          render={({ field }) => (
            <Input label="Фамилия" isRequired error={errors.surname?.message} {...field} />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => <Input disabled isRequired label="Номер телефона" {...field} />}
        />
        <Controller
          name="gender"
          control={control}
          defaultValue="Мужчина"
          render={({ field }) => (
            <Radio.Group onChange={(e) => field.onChange(e.target.value)} value={field.value}>
              <Radio value="Мужчина">Мужчина</Radio>
              <Radio value="Женщина">Женщина</Radio>
            </Radio.Group>
          )}
        />
        <Button
          type="primary"
          size="large"
          disabled={!isValid}
          htmlType="submit"
          loading={isPending}
        >
          Зарегистрироваться
        </Button>
        <ErrorMessage message={error?.response?.data?.message} />
      </form>
    </div>
  );
};

export default OwnersRegister;
