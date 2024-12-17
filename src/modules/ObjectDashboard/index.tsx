import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { FileChartColumnIncreasing, Folder, Info, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumb, Title } from '@components';

import { useObjectInfo } from '@common/api/services/objects';
import { formatStatusObject } from '@common/utils';

import { Avatar, Flex, Tag } from 'antd';

import styles from './ObjectDashboard.module.scss';

const ObjectDashboard = () => {
  const { id } = useParams();

  const { data: object } = useObjectInfo(+id!);

  const itemsBreadcrumb = [
    {
      title: 'Мои объекты',
      href: '/objects',
    },
    {
      title: object?.name || 'Название',
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className="container">
        <Breadcrumb items={itemsBreadcrumb} />
        <Flex vertical gap={16}>
          <Flex gap={16} align="center" justify="space-between">
            <Title title={object?.name!} />
            {formatStatusObject(object?.status) === 'Завершен' ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                {formatStatusObject(object?.status)}
              </Tag>
            ) : (
              <Tag icon={<SyncOutlined spin />} color="processing">
                {formatStatusObject(object?.status)}
              </Tag>
            )}
          </Flex>
          <Flex gap={16} vertical>
            <Flex className={styles.contractor} align="center" gap={16}>
              <Avatar
                size={60}
                src="https://static.tildacdn.com/tild3865-3065-4436-a138-323766306537/BuildersLabourer_Ico.png"
              />
              <Link className={styles.contractorName} to={`/contractor/${object?.contractor.id}`}>
                {object?.contractor.name}
              </Link>
            </Flex>
            <Flex className={styles.user} align="center" gap={16}>
              <Avatar size={60} icon={<User size={30} />} />
              <div className={styles.userName}>
                {object?.user.surname} {object?.user.name} {object?.user.patronymic}
              </div>
            </Flex>
          </Flex>
          <Flex gap={16} vertical>
            <Flex gap={16}>
              <Link
                to={`/objects/${id}/info`}
                className={styles.card}
                style={{ backgroundColor: '#F4F0DD' }}
              >
                <span>Общая информация</span>
                <Info size={30} />
              </Link>
              <Link
                to={`/objects/${id}/files`}
                className={styles.card}
                style={{ backgroundColor: '#F0E2D9' }}
              >
                <span>Файлы проекта</span>
                <Folder size={30} />
              </Link>
            </Flex>
            <Flex>
              <Link
                to={`/objects/${id}/steps`}
                className={styles.card}
                style={{ backgroundColor: '#E2F9EA' }}
              >
                <span>Этапы работ и отчетность</span>
                <FileChartColumnIncreasing size={30} />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default ObjectDashboard;
