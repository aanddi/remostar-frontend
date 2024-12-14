import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Input, InputNumber, Select, Textarea } from '@components';

import { IActionPortfolio } from '@common/api/services/contractor';
import {
  useCreatePortfolioContractor,
  useEditPortfolioContractor,
  usePortfolioInfo,
} from '@common/api/services/contractor/hooks';
import { typeFlat } from '@common/config/dictionary';
import { useAuth } from '@common/hooks';
import { formatNumber, parserNumber } from '@common/utils';

import { Flex, Modal, Skeleton, Typography } from 'antd';

import { defaultValues } from './constans';
import { IPortfolioModalProps } from './types';

const PortfolioModal = ({
  isModalOpen,
  handleCancel,
  actionType,
  portfolioId,
}: IPortfolioModalProps) => {
  const user = useAuth();

  const isEditType = actionType === 'edit';
  const isCreateType = actionType === 'create';

  const { data: serviceInfo, isLoading } = usePortfolioInfo(portfolioId!, isModalOpen);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IActionPortfolio>({ defaultValues, mode: 'onChange' });

  useEffect(() => {
    reset(serviceInfo);
  }, [serviceInfo, reset]);

  const { mutate: createPortfolio, isPending: isPendingCreateService } =
    useCreatePortfolioContractor(user?.employee?.contractorId!, handleCancel, reset);

  const { mutate: editPortfolio, isPending: isPendingEditService } = useEditPortfolioContractor(
    portfolioId!,
    handleCancel,
  );

  const handleOkModal = (data: IActionPortfolio) => {
    if (isEditType) editPortfolio(data);
    if (isCreateType) createPortfolio(data);
  };

  return (
    <Modal
      centered
      title={
        <Typography.Title level={4}>
          {isEditType ? 'Редактирование работы' : 'Добавление новой работы'}
        </Typography.Title>
      }
      width={800}
      okText="Сохранить"
      open={isModalOpen}
      onOk={handleSubmit(handleOkModal)}
      okButtonProps={{
        disabled: !isValid,
        htmlType: 'submit',
        loading: isPendingCreateService || isPendingEditService,
      }}
      onCancel={handleCancel}
    >
      {isLoading ? (
        <Skeleton paragraph active />
      ) : (
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
                    label="Бюджет (руб)"
                    formatter={(valueInput) => formatNumber(valueInput as number)}
                    parser={(valueInput) => parserNumber(valueInput) as unknown as string}
                    isRequired
                    {...field}
                  />
                )}
              />
            </Flex>
            <Flex gap={16}>
              <Controller
                name="type"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Select options={typeFlat} label="Тип" isRequired {...field} />
                )}
              />
              <Controller
                name="time"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => <Input label="Сроки" isRequired {...field} />}
              />
            </Flex>
            <Flex gap={16}>
              <Controller
                name="rooms"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => <InputNumber label="Кол-во комнат" isRequired {...field} />}
              />
              <Controller
                name="footage"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => <InputNumber label="Метраж (м²)" isRequired {...field} />}
              />
            </Flex>
            <Flex gap={16}>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => <Input label="Категория" isRequired {...field} />}
              />

              <Controller
                name="author"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => <Input label="Автор" isRequired {...field} />}
              />
            </Flex>
            <Controller
              name="gallery"
              control={control}
              render={({ field }) => (
                <Textarea autoSize={{ minRows: 2, maxRows: 10 }} label="Фото (ссылки)" {...field} />
              )}
            />
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
          </Flex>
        </form>
      )}
    </Modal>
  );
};

export default PortfolioModal;
