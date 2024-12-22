import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Select, Textarea } from '@components';

import {
  IActionsReview,
  useCreateReview,
  useEditReview,
  useReviewById,
} from '@common/api/services/reviews';
import { typeWork } from '@common/config/dictionary';
import { useAuth } from '@common/hooks';

import { Flex, Modal, Rate, Skeleton, Typography } from 'antd';

import { defaultValues } from './constans';
import { IReviewModalProps } from './types';

const ReviewModal = ({
  isModalOpen,
  handleCancel,
  actionType,
  reviewId,
  contractorId,
}: IReviewModalProps) => {
  const { user } = useAuth();

  const isEditType = actionType === 'edit';
  const isCreateType = actionType === 'create';

  const { data: reviewInfo, isLoading } = useReviewById(reviewId!, isModalOpen);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IActionsReview>({ defaultValues, mode: 'onChange' });

  useEffect(() => {
    reset(reviewInfo);
  }, [reviewInfo, reset]);

  const { mutate: createReview, isPending: isPendingCreateReview } = useCreateReview(
    user?.id!,
    contractorId!,
    handleCancel,
    reset,
  );

  const { mutate: editReview, isPending: isPendingEditReview } = useEditReview(
    reviewId!,
    handleCancel,
  );

  const handleOkModal = (data: IActionsReview) => {
    if (isEditType) editReview(data);
    if (isCreateType) createReview(data);
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
        loading: isPendingCreateReview || isPendingEditReview,
      }}
      onCancel={handleCancel}
    >
      {isLoading ? (
        <Skeleton paragraph active />
      ) : (
        <form onSubmit={handleSubmit(handleOkModal)}>
          <Flex vertical gap={16}>
            <Controller
              name="typeWork"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <Select options={typeWork} label="Тип работы" isRequired {...field} />
              )}
            />
            <Controller
              name="gradeTotal"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => (
                <Flex gap={16} align="center">
                  <Typography.Text style={{ width: '150px' }}>Общая оценка</Typography.Text>
                  <Rate {...field} />
                </Flex>
              )}
            />
            <Flex gap={40}>
              <Controller
                name="gradeQuality"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Flex gap={16} align="center">
                    <Typography.Text style={{ width: '150px' }}>Качество работы</Typography.Text>
                    <Rate {...field} />
                  </Flex>
                )}
              />
              <Controller
                name="gradeMaterials"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Flex gap={16} align="center">
                    <Typography.Text style={{ width: '180px' }}>
                      Качество материалов
                    </Typography.Text>
                    <Rate {...field} />
                  </Flex>
                )}
              />
            </Flex>
            <Flex gap={40}>
              <Controller
                name="gradePrice"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Flex gap={16} align="center">
                    <Typography.Text style={{ width: '150px' }}>Стоимость</Typography.Text>
                    <Rate {...field} />
                  </Flex>
                )}
              />
              <Controller
                name="gradeExperience"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Flex gap={16} align="center">
                    <Typography.Text style={{ width: '180px' }}>
                      Профессионализм и опыт
                    </Typography.Text>
                    <Rate {...field} />
                  </Flex>
                )}
              />
            </Flex>
            <Flex gap={40}>
              <Controller
                name="gradeDeadlines"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Flex gap={16} align="center">
                    <Typography.Text style={{ width: '150px' }}>Соблюдение сроков</Typography.Text>
                    <Rate {...field} />
                  </Flex>
                )}
              />
              <Controller
                name="gradeCommunication"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Flex gap={16} align="center">
                    <Typography.Text style={{ width: '180px' }}>Коммуникация</Typography.Text>
                    <Rate {...field} />
                  </Flex>
                )}
              />
            </Flex>
            <Controller
              name="descDignity"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => <Textarea label="Достоинства" isRequired {...field} />}
            />
            <Controller
              name="descFlaws"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => <Textarea label="Недостатки" isRequired {...field} />}
            />
            <Controller
              name="descReview"
              control={control}
              rules={{ required: 'Это обязательное поле' }}
              render={({ field }) => <Textarea label="Комментарий" isRequired {...field} />}
            />
            <Controller
              name="images"
              control={control}
              render={({ field }) => <Textarea label="Фото (ссылки через запятую)" {...field} />}
            />
          </Flex>
        </form>
      )}
    </Modal>
  );
};

export default ReviewModal;
