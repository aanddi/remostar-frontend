import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Input, InputNumber, InputPhone, Select, Textarea } from '@components';

import { IEditContractorInfo } from '@common/api/services/contractor';
import { useEditContractorInfo } from '@common/api/services/contractor/hooks';
import { optionTypeCompany } from '@common/config/dictionary';

import { Avatar, Flex, Skeleton } from 'antd';

import { IInfoProps } from './types';

const Info = ({ contractorId, info, loading }: IInfoProps) => {
  const { mutate: editContractor, isPending } = useEditContractorInfo(contractorId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IEditContractorInfo>({
    defaultValues: info,
    mode: 'onChange',
  });

  useEffect(() => {
    reset(info);
  }, [info, reset]);

  const onApply = (data: IEditContractorInfo) => {
    editContractor(data);
  };

  const onReset = () => {
    reset(info);
  };

  return (
    <form onSubmit={handleSubmit(onApply)} style={{ width: '100%' }}>
      {loading ? (
        <Skeleton active paragraph />
      ) : (
        <Flex vertical gap={8}>
          <Flex gap={24} style={{ width: '100%' }}>
            <Flex>
              <Avatar
                style={{ width: '150px', height: '150px', fontSize: '40px' }}
                // className={styles.icon}
                src="https://static.tildacdn.com/tild3865-3065-4436-a138-323766306537/BuildersLabourer_Ico.png"
              >
                {info?.name[0]}
              </Avatar>
            </Flex>
            <Flex vertical gap={16} style={{ width: '100%' }}>
              <Controller
                name="legalName"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Input
                    label="Юр. название компании"
                    isRequired
                    error={errors.legalName?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Input
                    label="Название компании"
                    isRequired
                    error={errors.name?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="typeCompany"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Select
                    label="Тип компании"
                    isRequired
                    error={errors.typeCompany?.message}
                    options={optionTypeCompany}
                    {...field}
                  />
                )}
              />
            </Flex>
          </Flex>
          <Flex vertical gap={8}>
            <Flex gap={16}>
              <Controller
                name="mainCity"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Input label="Город" isRequired error={errors.mainCity?.message} {...field} />
                )}
              />
              <Controller
                name="adress"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Input label="Адрес" isRequired error={errors.adress?.message} {...field} />
                )}
              />
            </Flex>
            <Controller
              name="countEmployees"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <InputNumber
                  label="Размер компании (чел.)"
                  isRequired
                  error={errors.countEmployees?.message}
                  {...field}
                />
              )}
            />
            <Flex gap={16}>
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <InputPhone
                    label="Телефон"
                    isRequired
                    error={errors.phone?.message}
                    inputField={field}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Input label="Почта" isRequired error={errors.email?.message} {...field} />
                )}
              />
            </Flex>
            <Controller
              name="inn"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <InputNumber label="ИНН" isRequired error={errors.inn?.message} {...field} />
              )}
            />
            <Controller
              name="descCompany"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <Textarea
                  label="Описание"
                  autoSize={{ minRows: 2, maxRows: 10 }}
                  isRequired
                  error={errors.descCompany?.message}
                  {...field}
                />
              )}
            />
          </Flex>
          <Flex style={{ marginTop: '16px' }} justify="flex-end" gap={16}>
            <Button size="large" onClick={onReset}>
              Отменить
            </Button>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={isPending}
              disabled={!isDirty}
            >
              Сохранить
            </Button>
          </Flex>
        </Flex>
      )}
    </form>
  );
};

export default Info;
