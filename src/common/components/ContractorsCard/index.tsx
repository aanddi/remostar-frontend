import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@components';

import { IRibbonContractorItem } from '@common/api/services/contractor';
import { Verify } from '@common/components';
import { useRoles } from '@common/hooks';
import { Briefcase, Heart, Map, Message, MessageReport, Star } from '@common/icon';

import { Avatar, Tag, Tooltip, Typography } from 'antd';

import styles from './ContractorsCard.module.scss';

interface IRibbonProps {
  data: IRibbonContractorItem;
}

const ContractorsCard = ({ data }: IRibbonProps) => {
  const navigate = useNavigate();
  const { isOwner } = useRoles();

  const card = useMemo(
    () => (
      <div className={styles.card}>
        <div className={styles.wrapper}>
          <div className={styles.actions}>
            <div className={styles.actionItem}>
              <Heart className={styles.favorite} size={19} />
            </div>
            <Tooltip title="Сообщить о нарушении">
              <div className={styles.actionItem}>
                <MessageReport size={22} />
              </div>
            </Tooltip>
          </div>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Avatar
                size={110}
                src={data.pathLogo ? data.pathLogo : 'src/assets/Contractors/default-avatar.png'}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.title}>
                <div className={styles.name}>
                  <Link to={`/contractor/${data?.id}`}>{data?.name}</Link>
                  {data?.veryfi && <Verify strokeWidth={1} size={16} />}
                </div>
                <div className={styles.reviews}>
                  <div className={styles.reviewsItem}>
                    <Star size={18} className={styles.star} />
                    {data?.gradeTotal === 0 ? 'Нет оценок' : data?.gradeTotal}
                  </div>
                  <div className={styles.reviewsItem}>
                    <Message size={18} className={styles.comment} />
                    <Link
                      to={`/contractor/${data?.id}/?view=reviews`}
                      className={styles.commentLink}
                    >
                      {data?.reviewCount === 0 ? 'Нет отзывов' : data?.reviewCount}
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.infoScoupe}>
                <div className={styles.infoItem}>
                  <Map size={15} />
                  <div className={styles.citys}>
                    <span>{data?.mainCity}</span>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Briefcase size={15} />
                  {data?.typeCompany}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.desc}>{data?.descCompany ?? 'Нет описания'}</div>
          {data.tags && (
            <div className={styles.tags}>
              {data?.tags.split(',').map((elem, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Tag key={index} bordered={false} color="blue">
                    {elem}
                  </Tag>
                );
              })}
            </div>
          )}
          {data.services.length > 0 && (
            <div className={styles.services}>
              <Typography.Title level={5} className={styles.title}>
                Услуги <span>{data?.services.length}</span>
              </Typography.Title>
              {data?.services?.slice(0, 5).map((service) => {
                return (
                  <div key={service.id} className={styles.service}>
                    <div className={styles.name}>{service.servicesName}</div>
                    <div className={styles.salary}>от {service.servicesSalary} ₽ / м2</div>
                  </div>
                );
              })}
              <Link to={`/contractor/${data?.id}/?view=services`} className={styles.servicesMore}>
                Еще услуги
              </Link>
            </div>
          )}
          <div className={styles.footer}>
            <Button type="primary" onClick={() => navigate(`/contractor/${data?.id}`)}>
              Подробнее
            </Button>
            {isOwner && <Button type="default">Предложить заказ</Button>}
          </div>
        </div>
      </div>
    ),
    [data, isOwner, navigate],
  );

  return card;
};

export default ContractorsCard;
