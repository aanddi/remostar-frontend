import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@components';

import { IObjectList } from '@common/api/services/objects';
import { Map } from '@common/icon';
import { formatDate, formatNumber, formatStatusObject } from '@common/utils';

import { Descriptions, Flex, Image, Tag, Watermark } from 'antd';

import styles from './ObjectCard.module.scss';

const ObjectCard = ({ data }: { data: IObjectList }) => {
  const navigate = useNavigate();
  const [restDesc, setRestDesc] = useState(false);
  const card = useMemo(
    () => (
      <div className={styles.card}>
        <div className={styles.wrapper}>
          <div className={styles.gallery}>
            <Swiper
              loop
              spaceBetween={25}
              slidesPerView={1}
              pagination={{ type: 'fraction' }}
              navigation
              modules={[Pagination, Navigation]}
            >
              {data?.gallery &&
                data?.gallery?.split(',').map((image, index) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <SwiperSlide key={index}>
                      <Image.PreviewGroup items={data?.gallery?.split(',') ?? []}>
                        <Watermark content="Ремостар">
                          <Image src={image} className={styles.galleryImage} />
                        </Watermark>
                      </Image.PreviewGroup>
                    </SwiperSlide>
                  );
                })}
              {data?.gallery === null && (
                <SwiperSlide>
                  <Image
                    src="https://cdn1.ozone.ru/s3/multimedia-1-z/6980409107.jpg"
                    className={styles.galleryImage}
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              <div className={styles.header}>
                <Flex gap={16}>
                  <Link to={`/objects/${data.id}/dashboard`}>{data?.name}</Link>
                  {formatStatusObject(data?.status) === 'Завершен' ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      {formatStatusObject(data?.status)}
                    </Tag>
                  ) : (
                    <Tag icon={<SyncOutlined spin />} color="processing">
                      {formatStatusObject(data?.status)}
                    </Tag>
                  )}
                </Flex>
                <span>{formatNumber(data?.budget)} ₽</span>
              </div>
              <div className={styles.info}>
                <div className={styles.item}>
                  <Map size={15} />
                  {data?.address}
                </div>
              </div>
              <Descriptions className={styles.info} column={1}>
                <Descriptions.Item label="Дата создания">
                  {formatDate(data?.createdAt, 'DD.MM.YYYY HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="Последнее редактирование">
                  {formatDate(data?.updateAt, 'DD.MM.YYYY HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="Вид работы">{data?.type}</Descriptions.Item>
                <Descriptions.Item label="Общая площадь">{data?.footage} м²</Descriptions.Item>
                <Descriptions.Item label="Сроки"> {data?.finishing}</Descriptions.Item>
              </Descriptions>
              <div className={styles.desc}>
                <div className={styles.title}>Обзор проекта:</div>
                <div className={restDesc ? styles.fullText : styles.text}>{data?.desc}</div>
                <Button className={styles.rest} type="text" onClick={() => setRestDesc(!restDesc)}>
                  {restDesc ? 'Скрыть' : 'Прочитать полностью'}
                </Button>
              </div>
            </div>
            <div className={styles.footer}>
              <div className={styles.actions}>
                <Button type="primary" onClick={() => navigate(`/objects/${data.id}/dashboard`)}>
                  Подробнее
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [data, navigate, restDesc],
  );
  return card;
};

export default ObjectCard;
