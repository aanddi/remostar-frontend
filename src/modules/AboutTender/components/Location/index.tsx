import { Title } from '@components';

import styles from './Location.module.scss';

const Location = ({ address }: { address: string }) => {
  return (
    <div className={styles.location}>
      <Title title="Расположение" level={4} />
      <div className={styles.adress}>{address}</div>
      <iframe
        title="Карта с расположением"
        src={
          'https://yandex.ru/map-widget/v1/?um=constructor%3Ad5ed443567868256bd812048a4f983da684be123d919cf5c85abb20c0acadcce&amp;source=constructor'
        }
        className={styles.map}
        width="100%"
        height="500"
      />
    </div>
  );
};

export default Location;
