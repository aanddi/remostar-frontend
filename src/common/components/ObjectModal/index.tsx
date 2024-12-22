import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Input, InputNumber, Select, Textarea } from '@components';

import {
  IActionsObject,
  useCreateObject,
  useEditObject,
  useObjectInfo,
  useOwnersList,
} from '@common/api/services/objects';
import { statusWork, typeWork } from '@common/config/dictionary';
import { useAuth } from '@common/hooks';
import { formatNumber, parserNumber } from '@common/utils';

import { Flex, Modal, Typography } from 'antd';

import { defaultValues } from './constans';
import { ICreateObjectModalProps } from './types';

const ObjectModal = ({
  isModalOpen,
  handleCancel,
  actionType,
  objectId,
}: ICreateObjectModalProps) => {
  const { user } = useAuth();

  const isEditType = actionType === 'edit';
  const isCreateType = actionType === 'create';

  const { data: owners } = useOwnersList(isModalOpen);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IActionsObject>({ defaultValues, mode: 'onChange' });

  const { data: object } = useObjectInfo(+objectId!);

  useEffect(() => {
    reset(object);
  }, [object, reset]);

  const { mutate: editObject, isPending: isPendingEditObject } = useEditObject(
    objectId!,
    handleCancel,
  );

  const { mutate: createObject, isPending: isPendingCreateObject } = useCreateObject(
    user?.employee?.contractorId!,
    handleCancel,
    reset,
  );

  const handleOkModal = (data: IActionsObject) => {
    if (isCreateType) createObject(data);
    if (isEditType) editObject(data);
  };

  return (
    <Modal
      centered
      title={<Typography.Title level={4}>Новый объект</Typography.Title>}
      width={800}
      okText="Сохранить"
      open={isModalOpen}
      onOk={handleSubmit(handleOkModal)}
      okButtonProps={{
        disabled: !isValid,
        htmlType: 'submit',
        loading: isPendingCreateObject || isPendingEditObject,
      }}
      onCancel={handleCancel}
    >
      <form onSubmit={handleSubmit(handleOkModal)}>
        <Flex vertical gap={16}>
          <Flex gap={16}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => <Input label="Название" isRequired {...field} />}
            />
            <Controller
              name="budget"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <InputNumber
                  label="Бюджет"
                  formatter={(valueInput) => formatNumber(valueInput as number)}
                  parser={(valueInput) => parserNumber(valueInput) as unknown as string}
                  isRequired
                  {...field}
                />
              )}
            />
          </Flex>
          <Controller
            name="usersId"
            control={control}
            rules={{ required: 'Это обязательное поле' }}
            render={({ field }) => (
              <Select
                options={owners}
                label="Собственник"
                showSearch
                optionFilterProp="label"
                isRequired
                disabled={isEditType}
                {...field}
              />
            )}
          />
          <Flex gap={16}>
            <Controller
              name="address"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => <Input label="Адрес" isRequired {...field} />}
            />
            <Controller
              name="rooms"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => <InputNumber label="Кол-во комнат" isRequired {...field} />}
            />
            <Controller
              name="floor"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => <Input label="Этаж" isRequired {...field} />}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="type"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <Select options={typeWork} label="Тип работы" isRequired {...field} />
              )}
            />
            <Controller
              name="status"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <Select
                  options={statusWork}
                  label="Статус"
                  disabled={isEditType}
                  isRequired
                  {...field}
                />
              )}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="footage"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => <InputNumber label="Метраж (м²)" isRequired {...field} />}
            />
            <Controller
              name="squareKitchen"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <InputNumber label="Метраж кухни (м²)" isRequired {...field} />
              )}
            />
            <Controller
              name="squareLived"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <InputNumber label="Жила площадь (м²)" isRequired {...field} />
              )}
            />
          </Flex>
          <Controller
            name="finishing"
            control={control}
            rules={{ required: 'Это обязательное поле' }}
            render={({ field }) => <Input label="Сроки" isRequired {...field} />}
          />
          <Controller
            name="gallery"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Фото (ссылки через запятую)"
                isRequired
                autoSize={{ minRows: 2, maxRows: 6 }}
                {...field}
              />
            )}
          />
          <Controller
            name="desc"
            control={control}
            rules={{ required: 'Это обязательное поле' }}
            render={({ field }) => (
              <Textarea
                label="Требования от заказчика"
                isRequired
                autoSize={{ minRows: 2, maxRows: 6 }}
                {...field}
              />
            )}
          />
        </Flex>
      </form>
    </Modal>
  );
};

export default ObjectModal;
