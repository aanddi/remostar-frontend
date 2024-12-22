import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Input, InputNumber, Textarea } from '@components';

import { IActionServices } from '@common/api/services/contractor';
import {
  useCreateServicesContractor,
  useEditServiceContractor,
  useServiceInfo,
} from '@common/api/services/contractor/hooks';
import { useAuth } from '@common/hooks';
import { formatNumber, parserNumber } from '@common/utils';

import { Flex, Modal, Skeleton, Typography } from 'antd';

import { defaultValues } from './constans';
import { IServicesModalProps } from './types';

const ServicesModal = ({
  isModalOpen,
  handleCancel,
  actionType,
  serviceId,
}: IServicesModalProps) => {
  const { user } = useAuth();

  const isEditType = actionType === 'edit';
  const isCreateType = actionType === 'create';

  const { data: serviceInfo, isLoading } = useServiceInfo(serviceId!, isModalOpen);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IActionServices>({ defaultValues, mode: 'onChange' });

  useEffect(() => {
    reset(serviceInfo);
  }, [serviceInfo, reset]);

  const { mutate: createService, isPending: isPendingCreateService } = useCreateServicesContractor(
    user?.employee?.contractorId!,
    handleCancel,
    reset,
  );

  const { mutate: editService, isPending: isPendingEditService } = useEditServiceContractor(
    serviceId!,
    handleCancel,
  );

  const handleOkModal = (data: IActionServices) => {
    if (isEditType) editService(data);
    if (isCreateType) createService(data);
  };

  return (
    <Modal
      centered
      title={
        <Typography.Title level={4}>
          {isEditType ? 'Редактирование услуги' : 'Добавление услуги'}
        </Typography.Title>
      }
      width={600}
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
            <Controller
              name="servicesName"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => <Input label="Название" isRequired {...field} />}
            />
            <Controller
              name="servicesDesc"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <Textarea
                  label="Описание"
                  autoSize={{ minRows: 2, maxRows: 10 }}
                  isRequired
                  {...field}
                />
              )}
            />
            <Flex gap={16}>
              <Controller
                name="servicesSalary"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <InputNumber
                    label="Цена (руб.)"
                    formatter={(valueInput) => formatNumber(valueInput as number)}
                    parser={(valueInput) => parserNumber(valueInput) as unknown as string}
                    isRequired
                    {...field}
                  />
                )}
              />
              <Controller
                name="servicesUnit"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Input
                    label="Единица измерения за одну услугу (шт., единица, м²)"
                    isRequired
                    {...field}
                  />
                )}
              />
            </Flex>
          </Flex>
        </form>
      )}
    </Modal>
  );
};

export default ServicesModal;
