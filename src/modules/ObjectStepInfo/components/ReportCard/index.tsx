import { useMemo, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@components';

import { IGetReports } from '@common/api/services/objects';
import { formatDate } from '@common/utils';

import { Descriptions, Image, Watermark } from 'antd';

import styles from './ReportCard.module.scss';

const ReportCard = ({ data }: { data?: IGetReports }) => {
  const [restDesc, setRestDesc] = useState(false);
  const [restResult, setRestResult] = useState(false);
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
                <div className={styles.title}>{data?.title}</div>
              </div>
              <Descriptions column={1} className={styles.date}>
                <Descriptions.Item label="Автор">{data?.author}</Descriptions.Item>
                <Descriptions.Item label="Дата создания">
                  {formatDate(data?.createdAt, 'DD.MM.YYYY HH:mm')}
                </Descriptions.Item>
              </Descriptions>
              <div className={styles.desc}>
                <div className={styles.subtitle}>Описание:</div>
                <div className={restDesc ? styles.fullText : styles.text}>{data?.desc}</div>
                <Button className={styles.rest} type="text" onClick={() => setRestDesc(!restDesc)}>
                  {restDesc ? 'Скрыть' : 'Прочитать полностью'}
                </Button>
              </div>
              <div className={styles.desc}>
                <div className={styles.subtitle}>Результат:</div>
                <div className={restDesc ? styles.fullText : styles.text}>{data?.result}</div>
                <Button
                  className={styles.rest}
                  type="text"
                  onClick={() => setRestResult(!restDesc)}
                >
                  {restResult ? 'Скрыть' : 'Прочитать полностью'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [data, restDesc, restResult, setRestResult],
  );
  return card;
};

export default ReportCard;
