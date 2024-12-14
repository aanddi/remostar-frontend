import { Controller, useFormContext } from 'react-hook-form';

import { useRegisterContactor } from '@modules/Registration/api';

import { Button, Input, InputNumber, InputPhone, Select } from '@components';
import ErrorMessage from '@components/Form/ErrorMessage';

import { IRegisterContractors } from '@common/api/services/auth/types/register.type';
import { optionTypeCompany } from '@common/config/dictionary';

import { IoIosArrowBack } from 'react-icons/io';

import styles from './ContractorForm.module.scss';

import { IRegisterFormProps, Steps } from '../types';

const ContractorForm = ({ setStepRegister }: IRegisterFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<IRegisterContractors>();

  const { mutate: registerContractor, error, isPending } = useRegisterContactor();

  const handleRegisterContractor = (data: IRegisterContractors) => {
    registerContractor(data);
  };

  return (
    <div className={styles.userForm}>
      <div className={styles.header}>
        <Button
          className={styles.back}
          onClick={() => setStepRegister(Steps.User)}
          icon={<IoIosArrowBack size={20} />}
        />
        <p>Регистрация компании</p>
      </div>
      <form onSubmit={handleSubmit(handleRegisterContractor)} className={styles.form}>
        <Controller
          name="nameCompany"
          control={control}
          rules={{ required: 'Введите название' }}
          render={({ field }) => (
            <Input label="Название" isRequired error={errors.nameCompany?.message} {...field} />
          )}
        />
        <Controller
          name="inn"
          control={control}
          rules={{
            required: 'Введите ИНН',
            validate: {
              minLength: (value) => {
                // в проде должна быть утилита, которая проверяет корректность ИНН по алгоритму
                if (
                  String(value).length < 10 ||
                  String(value).length === 11 ||
                  String(value).length > 12
                ) {
                  return 'ИНН должен состоять из 10 или 12 цифр';
                }
                return undefined;
              },
            },
          }}
          render={({ field }) => (
            <InputNumber
              label="ИНН"
              isRequired
              controls={false}
              error={errors.inn?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="typeCompany"
          control={control}
          rules={{ required: 'Введите тип компании' }}
          render={({ field }) => (
            <Select
              label="Тип компании"
              isRequired
              {...field}
              error={errors.typeCompany?.message}
              options={optionTypeCompany}
            />
          )}
        />
        <Controller
          name="mainCity"
          control={control}
          rules={{ required: 'Введите город' }}
          render={({ field }) => (
            <Input label="Город" error={errors.mainCity?.message} isRequired {...field} />
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{
            validate: {
              minLength: (value) => String(value).length > 17,
            },
          }}
          render={({ field }) => (
            <InputPhone
              label="Контактный телефон"
              isRequired
              error={errors.phone?.message}
              inputField={field}
            />
          )}
        />
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          disabled={!isValid}
          loading={isPending}
        >
          Зарегистрироваться
        </Button>
        <ErrorMessage message={error?.response?.data?.message} />
      </form>
    </div>
  );
};

export default ContractorForm;
