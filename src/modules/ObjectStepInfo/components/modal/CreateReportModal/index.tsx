import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Input, Select, Textarea } from '@components';

import { ICreateReport, useCreateReport, useEmployeesList } from '@common/api/services/objects';
import { useAuth } from '@common/hooks';

import { Alert, Flex, Modal, Typography } from 'antd';

import { defaultValues } from './constnst';
import { ICreateReportModalProps } from './types';

const CreateReportModal = ({ isModalOpen, handleCancel }: ICreateReportModalProps) => {
  const user = useAuth();
  const { id, step } = useParams();

  const { data: employees } = useEmployeesList(user?.employee?.contractorId!, isModalOpen);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ICreateReport>({ defaultValues, mode: 'onChange' });

  const { mutate: createReport, isPending } = useCreateReport(+id!, +step!, handleCancel, reset);

  const handleOkModal = (data: ICreateReport) => {
    createReport(data);
  };

  return (
    <Modal
      centered
      title={<Typography.Title level={4}>Создание отчета</Typography.Title>}
      width={800}
      okText="Сохранить"
      open={isModalOpen}
      onOk={handleSubmit(handleOkModal)}
      okButtonProps={{
        disabled: !isValid,
        htmlType: 'submit',
        loading: isPending,
      }}
      onCancel={handleCancel}
    >
      <form onSubmit={handleSubmit(handleOkModal)}>
        <Flex vertical gap={16}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Это обязательное поле' }}
            render={({ field }) => <Input label="Название" isRequired {...field} />}
          />
          <Controller
            name="author"
            control={control}
            rules={{ required: 'Это обязательное поле' }}
            render={({ field }) => (
              <Select
                options={employees}
                label="Автор"
                showSearch
                optionFilterProp="label"
                isRequired
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
                label="Описание"
                autoSize={{ minRows: 2, maxRows: 6 }}
                isRequired
                {...field}
              />
            )}
          />
          <Controller
            name="result"
            control={control}
            rules={{ required: 'Это обязательное поле' }}
            render={({ field }) => (
              <Textarea
                label="Результаты"
                autoSize={{ minRows: 2, maxRows: 6 }}
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
                label="Фото (ссылки через запятую)"
                autoSize={{ minRows: 2, maxRows: 6 }}
                {...field}
              />
            )}
          />
          <Alert
            message="Как только отчет будет сохранен, он станет финальным и не подлежит изменениям или удалению"
            type="info"
            showIcon
          />
        </Flex>
      </form>
    </Modal>
  );
};

export default CreateReportModal;
