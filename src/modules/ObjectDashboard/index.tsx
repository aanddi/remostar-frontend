import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { ArrowRight, FileChartColumnIncreasing, Folder, Info } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumb, Title } from '@components';

import { useObjectInfo } from '@common/api/services/objects';
import { formatStatusObject } from '@common/utils';

import { Flex, Skeleton, Tag } from 'antd';

import styles from './ObjectDashboard.module.scss';

const ObjectDashboard = () => {
  const { id } = useParams();

  const { data: object, isLoading } = useObjectInfo(+id!);

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
        <Flex gap={16} align="center" justify="space-between">
          {isLoading ? (
            <Skeleton.Input style={{ margin: '16px 0' }} active />
          ) : (
            <Title title={object?.name!} />
          )}
          {isLoading ? (
            <Skeleton.Input style={{ margin: '16px 0' }} active />
          ) : (
            <Flex>
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
          )}
        </Flex>
        <Flex vertical gap={16}>
          <Flex gap={16} vertical>
            <Flex gap={16}>
              <Link to={`/objects/${id}/info`} className={styles.card}>
                <Flex gap={8} align="center">
                  <Info size={25} />
                  <span>Общая информация</span>
                </Flex>
                <ArrowRight size={25} />
              </Link>
              <Link to={`/objects/${id}/files`} className={styles.card}>
                <Flex gap={8} align="center">
                  <Folder size={25} />
                  <span>Файлы проекта</span>
                </Flex>
                <ArrowRight size={25} />
              </Link>
            </Flex>
            <Flex>
              <Link to={`/objects/${id}/steps`} className={styles.card}>
                <Flex gap={8} align="center">
                  <FileChartColumnIncreasing size={25} />
                  <span>Этапы работ и отчетность</span>
                </Flex>
                <ArrowRight size={25} />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default ObjectDashboard;
