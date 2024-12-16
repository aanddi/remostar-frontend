import { useParams } from 'react-router-dom';

import { Breadcrumb, GalleryThumbs, Title } from '@components';

import { useObjectInfo } from '@common/api/services/objects';
import { useRoles } from '@common/hooks';
import { formatDate, formatNumber } from '@common/utils';

import { Descriptions, Flex, Skeleton } from 'antd';

import EditInfo from './components/EditInfo';

import styles from './ObjectInfo.module.scss';

const ObjectInfo = () => {
  const { id } = useParams();

  const { isEmployee } = useRoles();

  const { data: object, isLoading } = useObjectInfo(+id!);

  const itemsBreadcrumb = [
    {
      title: object?.name || 'Название',
      href: `/objects/${id}/dashboard`,
    },
    {
      title: 'Общая информация',
    },
  ];

  return (
    <div className="container">
      <Breadcrumb items={itemsBreadcrumb} />
      {isLoading ? (
        <Skeleton paragraph active />
      ) : (
        <>
          <Flex gap={16} align="center">
            <Title title="Информация о объекте" />
            {isEmployee && <EditInfo objectId={id!} />}
          </Flex>
          <Flex vertical gap={16}>
            <GalleryThumbs
              data={object?.gallery ? object?.gallery.split(',') : []}
              className={styles.gallery}
            />
            <Flex vertical gap={8}>
              <Title title="Описание" level={4} />
              <Descriptions column={3}>
                <Descriptions.Item label="Дата создания">
                  {formatDate(object?.createdAt, 'DD.MM.YYYY HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="Последнее редактирование">
                  {formatDate(object?.updateAt, 'DD.MM.YYYY HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="Адрес">{object?.address}</Descriptions.Item>
                <Descriptions.Item label="Этаж">{object?.floor}</Descriptions.Item>
                <Descriptions.Item label="Кол-во комнат">{object?.rooms}</Descriptions.Item>
                <Descriptions.Item label="Бюджет">
                  {formatNumber(object?.budget)} руб
                </Descriptions.Item>
                <Descriptions.Item label="Вид работы">{object?.type}</Descriptions.Item>
                <Descriptions.Item label="Общая площадь">{object?.footage} м²</Descriptions.Item>
                <Descriptions.Item label="Жилая площадь">
                  {object?.squareLived} м²
                </Descriptions.Item>
                <Descriptions.Item label="Площадь кухни">
                  {object?.squareKitchen} м²
                </Descriptions.Item>
                <Descriptions.Item label="Сроки">{object?.finishing}</Descriptions.Item>
              </Descriptions>
            </Flex>
            <Flex vertical>
              <Title title="Требования от заказчика" level={4} />
              <div className={styles.desc}>{object?.desc}</div>
            </Flex>
          </Flex>
        </>
      )}
    </div>
  );
};

export default ObjectInfo;
