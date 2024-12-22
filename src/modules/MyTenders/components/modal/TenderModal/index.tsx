import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Input, InputNumber, Select, Textarea, Title } from '@components';

import {
  useCreateTender,
  useEditTender,
  useGetTenderInfo,
} from '@common/api/services/tenders/hooks';
import { typeWork } from '@common/config/dictionary';
import { useAuth } from '@common/hooks';
import { formatNumber, parserNumber } from '@common/utils';

import { Flex, Modal } from 'antd';

import './TenderModal.scss';
import { IModalTenderProps } from './types';

const TenderModal = ({
  isOpenModal,
  handleCloseModal,
  typeActions,
  tenderId,
}: IModalTenderProps) => {
  const isEditType = typeActions === 'edit';
  const isCreateType = typeActions === 'create';

  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const { data: tenderInfo, isLoading } = useGetTenderInfo(tenderId!, isOpenModal);

  const { mutate: createTender, isPending: isPendingCreate } = useCreateTender(
    user?.id!,
    handleCloseModal,
    reset,
  );
  const { mutate: editTender, isPending: isPendingEdit } = useEditTender(
    tenderId!,
    handleCloseModal,
    reset,
  );

  useEffect(() => {
    reset(tenderInfo);
  }, [isLoading, reset, tenderInfo]);

  const handleOkModal = (data: any) => {
    if (isCreateType) createTender(data);
    if (isEditType) editTender(data);
  };

  return (
    <Modal
      centered
      width={700}
      title={<Title level={3} title={isEditType ? 'Редактировать тендер' : 'Создание тендера'} />}
      open={isOpenModal}
      onCancel={handleCloseModal}
      className="userModal"
      okText={isEditType ? 'Сохранить' : 'Создать'}
      onOk={handleSubmit(handleOkModal)}
      okButtonProps={{
        disabled: !isValid,
        htmlType: 'submit',
        loading: isPendingEdit || isPendingCreate,
      }}
    >
      <form onSubmit={handleSubmit(handleOkModal)} style={{ marginRight: '16px' }}>
        <Flex vertical gap={16}>
          <Flex gap={16} style={{ width: '100%' }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <Input label="Название" style={{ width: '100%' }} isRequired {...field} />
              )}
            />
            <Controller
              name="budget"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <InputNumber
                  label="Бюджет"
                  style={{ width: '100%' }}
                  formatter={(valueInput) => formatNumber(valueInput as number)}
                  parser={(valueInput) => parserNumber(valueInput) as unknown as string}
                  isRequired
                  {...field}
                />
              )}
            />
          </Flex>
          <Flex vertical>
            <Title level={5} title="Основная информация" />
            <Flex vertical gap={16}>
              <Flex gap={16} style={{ width: '100%' }}>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: 'Это обязательное поле' }}
                  render={({ field }) => <Input label="Адрес" isRequired {...field} />}
                />
                <Controller
                  name="floor"
                  control={control}
                  rules={{ required: 'Это обязательное поле' }}
                  render={({ field }) => <Input label="Этаж" isRequired {...field} />}
                />
                <Controller
                  name="rooms"
                  control={control}
                  rules={{ required: 'Это обязательное поле' }}
                  render={({ field }) => (
                    <InputNumber label="Кол-во комнат" isRequired {...field} />
                  )}
                />
              </Flex>
              <Flex gap={16}>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: 'Это обязательное поле' }}
                  render={({ field }) => (
                    <Select label="Тип ремонта" options={typeWork} isRequired {...field} />
                  )}
                />
                <Controller
                  name="finishing"
                  control={control}
                  rules={{ required: 'Это обязательное поле' }}
                  render={({ field }) => <Input label="Сроки" isRequired {...field} />}
                />
              </Flex>
              <Flex gap={16}>
                <Controller
                  name="footage"
                  control={control}
                  rules={{ required: 'Это обязательное поле' }}
                  render={({ field }) => <InputNumber label="Площадь" isRequired {...field} />}
                />
                <Controller
                  name="squareKitchen"
                  control={control}
                  rules={{ required: 'Это обязательное поле' }}
                  render={({ field }) => (
                    <InputNumber label="Площадь кухни" isRequired {...field} />
                  )}
                />
                <Controller
                  name="squareLived"
                  control={control}
                  rules={{ required: 'Это обязательное поле' }}
                  render={({ field }) => (
                    <InputNumber label="Жилая площадь" isRequired {...field} />
                  )}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex vertical>
            <Title level={5} title="Доп информация" />
            <Flex vertical gap={16}>
              <Controller
                name="desc"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Textarea
                    autoSize={{ minRows: 2, maxRows: 10 }}
                    label="Описание"
                    isRequired
                    {...field}
                  />
                )}
              />
              <Controller
                name="gallery"
                control={control}
                render={({ field }) => (
                  <Textarea
                    autoSize={{ minRows: 2, maxRows: 10 }}
                    label="Фото (ссылки через запятую)"
                    {...field}
                  />
                )}
              />
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default TenderModal;
