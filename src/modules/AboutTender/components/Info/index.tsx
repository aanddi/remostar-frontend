import { Title } from '@components';

import { ITender } from '@common/api/services/tenders';

import { Descriptions } from 'antd';

import styles from './Info.module.scss';

const fontSize = '16px';

const Info = ({ data }: { data?: ITender }) => {
  return (
    <div className={styles.info}>
      <Title title="Общая информация" level={4} />
      <Descriptions contentStyle={{ fontSize }} labelStyle={{ fontSize }}>
        <Descriptions.Item label="Площадь">{data?.footage} м²</Descriptions.Item>
        <Descriptions.Item label="Комнат">{data?.rooms}</Descriptions.Item>
        <Descriptions.Item label="Этаж">{data?.floor}</Descriptions.Item>
        <Descriptions.Item label="Отделка"> {data?.finishing}</Descriptions.Item>
        <Descriptions.Item label="Кухня">{data?.squareKitchen} м²</Descriptions.Item>
        <Descriptions.Item label="Жилая">{data?.squareLived} м²</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Info;
