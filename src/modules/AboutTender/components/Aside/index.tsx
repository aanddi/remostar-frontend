import { Button } from '@components';

import { ITender } from '@common/api/services/tenders';
import { Heart, Map, MessageReport } from '@common/icon';
import { formatNumber } from '@common/utils';

import { Avatar } from 'antd';

import styles from './Aside.module.scss';

const Aside = ({ data, className }: { data?: ITender; className: string }) => {
  return (
    <aside className={`${styles.aside} ${className}`}>
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.wrapper}>
            <div className={styles.title}>
              {data?.rooms}-комн. {data?.type} {data?.footage} м²
            </div>
            <div className={styles.salary}>{formatNumber(data?.budget)} ₽ </div>
            <div className={styles.adress}>
              <Map size={18} />
              <span>{data?.address}</span>
            </div>
            <div className={styles.user}>
              <Avatar>{data?.user.name[0]}</Avatar>
              <div className={styles.name}>
                {data?.user.surname} {data?.user.name} {data?.user.patronymic}
              </div>
            </div>
            <Button type="primary" size="large" className={styles.button}>
              Сделать предложение
            </Button>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.item}>
            <Heart className={styles.favorite} size={19} />
            <span>Избранное</span>
          </div>
          <div className={styles.item}>
            <MessageReport className={styles.icon} size={22} />
            <span>Пожаловаться</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
