import React from 'react';

import { Image, Progress, Rate } from '@components';

import { IReview } from '@common/api/services/contractor';
import { formatDate } from '@common/utils';

import grayBg from '@assets/Contractors/Reviews/bg_gray.png';

import { Image as AntdImage, Avatar } from 'antd';

import styles from './Review.module.scss';
import { IMAGES_PREVIEW, IMAGE_SIZE } from './constans';

const { PreviewGroup } = AntdImage;

const Card = ({ data }: { data: IReview }) => {
  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.content}>
            <div className={styles.user}>
              <Avatar>П</Avatar>
              <span className={styles.name}>Пользователь</span>
            </div>
            <span className={styles.date}>{formatDate(data?.createdAt)}</span>
          </div>
          <div className={styles.type}>{data?.typeWork}</div>
        </div>
        <div className={styles.body}>
          <Rate disabled allowHalf value={data?.gradeTotal} />
          <div className={styles.texts}>
            <div className={styles.textItem}>
              <div className={styles.textTitle}>Достоинства</div>
              <p>{data?.descDignity}</p>
            </div>
            <div className={styles.textItem}>
              <div className={styles.textTitle}>Недостатки</div>
              <p>{data?.descFlaws}</p>
            </div>
            <div className={styles.textItem}>
              <div className={styles.textTitle}>Комментарий</div>
              <p>{data?.descReview}</p>
            </div>
          </div>
        </div>
        <div className={styles.gradeGroupe}>
          <Progress
            label="Стоимость"
            className={styles.progressItem}
            // eslint-disable-next-line no-unsafe-optional-chaining
            percent={(data?.gradePrice / 5) * 100}
            format={() => data?.gradePrice}
          />
          <Progress
            label="Качество работы"
            // eslint-disable-next-line no-unsafe-optional-chaining
            percent={(data?.gradeQuality / 5) * 100}
            format={() => data?.gradeQuality}
          />
          <Progress
            label="Качество материалов"
            // eslint-disable-next-line no-unsafe-optional-chaining
            percent={(data.gradeMaterials / 5) * 100}
            format={() => data.gradeMaterials}
          />
          <Progress
            label="Профессионализм и опыт"
            // eslint-disable-next-line no-unsafe-optional-chaining
            // eslint-disable-next-line no-unsafe-optional-chaining
            percent={(data?.gradeExperience / 5) * 100}
            format={() => data?.gradeExperience}
          />
          <Progress
            label="Соблюдение сроков"
            // eslint-disable-next-line no-unsafe-optional-chaining
            percent={(data?.gradeDeadlines / 5) * 100}
            format={() => data?.gradeDeadlines}
          />
          <Progress
            label="Коммуникация и отзывчивость"
            // eslint-disable-next-line no-unsafe-optional-chaining
            percent={(data?.gradeCommunication / 5) * 100}
            format={() => data?.gradeCommunication}
          />
        </div>
        {data?.images && (
          <div className={styles.gallery}>
            <PreviewGroup items={data?.images.split(',')}>
              {data.images
                .split(',')
                .slice(0, IMAGES_PREVIEW)
                .map((image) => {
                  return <Image width={IMAGE_SIZE} height={IMAGE_SIZE} src={image} />;
                })}
              {data.images.split(',').length > IMAGES_PREVIEW && (
                <div className={styles.restImages}>
                  <Image width={IMAGE_SIZE} height={IMAGE_SIZE} src={grayBg} />
                  <div className={styles.restNumber}>
                    +{data.images.split(',').length - IMAGES_PREVIEW}
                  </div>
                </div>
              )}
            </PreviewGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
