import { Button, Modal, Title } from '@components';

import styles from './Filter.module.scss';
import { aboutContactor, subjects, tags } from './constans';

const FilterModal = ({ ...restProps }) => {
  return (
    <Modal
      centered
      className={styles.modal}
      okText="Сохранить"
      handleClose={restProps.onCancel}
      footer={false}
      {...restProps}
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Title title="Фильтры" level={3} className={styles.title} />
          {/* <span className={styles.count}>{totalCountFilter}</span> */}
        </div>
        <div className={styles.content}>
          <div className={styles.block}>
            <Title title="Субъекты" level={5} />
            <div className={styles.blockContent}>
              {subjects.map(({ value, key }) => {
                return (
                  <Button key={key} shape="round" className={`${styles.btnFilter}`}>
                    {value}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className={styles.block}>
            <Title title="О компании" level={5} />
            <div className={styles.blockContent}>
              {aboutContactor.map(({ value, key }) => {
                return (
                  <Button key={key} shape="round" className={`${styles.btnFilter}`}>
                    {value}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className={styles.block}>
            <Title title="Теги" level={5} />
            <div className={styles.blockContent}>
              {tags.map(({ value, key }) => {
                return (
                  <Button key={key} shape="round" className={`${styles.btnFilter}`}>
                    {value}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Button type="primary" size="large">
            Найти
          </Button>
          <Button type="text" size="large">
            Сбросить фильтры
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
