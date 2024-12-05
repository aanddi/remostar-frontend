import { useMemo } from 'react';

import { Progress, Rate } from '@components';

import { IReviewStatistics } from '@common/api/services/contractor';

import styles from './Statistics.module.scss';

const Statistics = ({ data }: { data: IReviewStatistics }) => {
  const statistics = useMemo(
    () => (
      <div className={styles.statistics}>
        <div className={styles.content}>
          <div className={styles.total}>
            <div className={styles.totalWrapper}>
              <div className={styles.grade}>{data?.gradeTotal}</div>
              <Rate disabled allowHalf value={data?.gradeTotal} />
            </div>
            <div className={styles.totalCount}>На основе {data?.gradeTotal} отзывов</div>
          </div>
          <div className={styles.progress}>
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
              percent={(data?.gradeMaterials / 5) * 100}
              format={() => data?.gradeMaterials}
            />
            <Progress
              label="Профессионализм и опыт"
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
        </div>
      </div>
    ),
    [data],
  );

  return statistics;
};

export default Statistics;
