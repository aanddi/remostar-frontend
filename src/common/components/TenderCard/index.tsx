import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button, Image } from '@components';

import { ITendersRibbon } from '@common/api/services/tenders';
import { Map } from '@common/icon';
import { formatNumber } from '@common/utils';

import { Image as AntdImage, Avatar, Watermark } from 'antd';

import styles from './AnnouncementCard.module.scss';

const AnnouncementCard = ({ data }: { data: ITendersRibbon }) => {
  const navigate = useNavigate();
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
                      <AntdImage.PreviewGroup items={data?.gallery?.split(',') ?? []}>
                        <Watermark content="Ремостар">
                          <Image src={image} className={styles.galleryImage} />
                        </Watermark>
                      </AntdImage.PreviewGroup>
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
                <Link to={`/tender/${data.id}`}>{data?.name}</Link>
                <span>{formatNumber(data?.budget)} ₽</span>
              </div>
              <div className={styles.info}>
                <div className={styles.item}>
                  <Map size={15} />
                  {data?.address}
                </div>
              </div>
              <div className={styles.desc}>{data?.desc}</div>
            </div>
            <div className={styles.footer}>
              <div className={styles.user}>
                <Avatar size={40} src="src/assets/User/default-avatar.png" />
                <div className={styles.userAbout}>
                  <div className={styles.name}>{data?.user.name}</div>
                </div>
              </div>
              <div className={styles.actions}>
                <Button type="primary" onClick={() => navigate(`/tender/${data.id}`)}>
                  Подробнее
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [data, navigate],
  );

  return card;
};

export default AnnouncementCard;
