import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Input, Title } from '@components';

import { IUserProfile, useEditUserProfile, useGetUserProfile } from '@common/api/services/user';
import { useAppSelector } from '@common/hooks';
import { emailValidate } from '@common/utils/regexs';

import { Avatar, Flex, Radio, Skeleton } from 'antd';

import styles from './Profile.module.scss';

const Profile = () => {
  const userId = useAppSelector((state) => state.user.user?.id);

  const { data: profile, isLoading } = useGetUserProfile(userId!);
  const { mutate: editUser, isPending } = useEditUserProfile(userId!);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<IUserProfile>({
    defaultValues: profile,
    mode: 'onChange',
  });

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onApply = (data: IUserProfile) => {
    const userInfo = {
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      gender: data.gender,
      email: data.email,
    };
    editUser(userInfo);
  };

  return (
    <form onSubmit={handleSubmit(onApply)} className={styles.profile}>
      <div className="container">
        <Title title="Профиль" level={2} />
        <Flex gap={32}>
          <Flex>
            <Avatar
              style={{ width: '150px', height: '150px', fontSize: '40px' }}
              className={styles.icon}
            >
              {profile?.name[0]}
            </Avatar>
          </Flex>
          {isLoading ? (
            <Skeleton active paragraph />
          ) : (
            <Flex vertical gap={16} style={{ width: '100%' }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Input label="Имя" isRequired error={errors.name?.message} {...field} />
                )}
              />
              <Controller
                name="surname"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Input label="Фамилия" isRequired error={errors.surname?.message} {...field} />
                )}
              />
              <Controller
                name="patronymic"
                control={control}
                render={({ field }) => <Input label="Отчество" {...field} />}
              />
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Это обязательное поле' }}
                render={({ field }) => (
                  <Input
                    label="Номер телефона"
                    isRequired
                    disabled
                    error={errors.phone?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  pattern: {
                    value: emailValidate,
                    message: 'Введите корректную почту',
                  },
                }}
                render={({ field }) => (
                  <Input label="Почта" error={errors.email?.message} {...field} />
                )}
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
                htmlType="submit"
                style={{ width: 'max-content' }}
                loading={isPending}
                disabled={!isValid}
              >
                Сохранить
              </Button>
            </Flex>
          )}
        </Flex>
      </div>
    </form>
  );
};

export default Profile;
