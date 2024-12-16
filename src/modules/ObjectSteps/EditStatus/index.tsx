import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Select } from '@components';

import { useEditStatus } from '@common/api/services/objects';
import { statusWork } from '@common/config/dictionary';

import { Flex } from 'antd';

const EditStatus = ({ objectId, currentStatus }: { objectId: number; currentStatus?: number }) => {
  const { control, reset, handleSubmit } = useForm<{ status: number }>({
    defaultValues: { status: currentStatus },
  });

  const [isVisibleSelect, setIsVisibleSelect] = useState(false);

  const { mutate: editStatus, isPending } = useEditStatus(objectId, setIsVisibleSelect);

  const onApply = (data: { status: number }) => {
    editStatus(data.status);
  };

  const onReset = () => {
    reset();
    setIsVisibleSelect(false);
  };

  return (
    <form onSubmit={handleSubmit(onApply)}>
      {isVisibleSelect ? (
        <Flex gap={8}>
          <Controller
            name="status"
            control={control}
            rules={{ required: 'Это обязательное поле' }}
            render={({ field }) => (
              <Select
                options={statusWork}
                defaultValue={currentStatus}
                style={{ width: '250px' }}
                {...field}
              />
            )}
          />
          <Button size="large" type="primary" htmlType="submit" loading={isPending}>
            Сохранить
          </Button>
          <Button size="large" onClick={onReset}>
            Отменить
          </Button>
        </Flex>
      ) : (
        <Button size="large" type="primary" onClick={() => setIsVisibleSelect(true)}>
          Сменить статус
        </Button>
      )}
    </form>
  );
};

export default EditStatus;
