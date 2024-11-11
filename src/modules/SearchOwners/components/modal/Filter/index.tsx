import { Button, InputNumber, Modal, Title } from '@components';

import styles from './Filter.module.scss';

const FilterModal = ({ ...restProps }) => {
  return (
    <Modal
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
            <Title title="Стоимость в ₽" level={5} />
            <div className={styles.blockInput}>
              <InputNumber label="от" min={0} />

              <InputNumber label="до" min={0} />
            </div>
          </div>
          <div className={styles.block}>
            <Title title="Площадь в м²" level={5} />
            <div className={styles.blockInput}>
              <InputNumber label="от" min={0} />
              <InputNumber label="до" min={0} />
            </div>
          </div>
          <div className={styles.block}>
            <Title title="Кол-во комнат" level={5} />
            <div className={styles.blockInput}>
              <InputNumber label="Количество" min={0} />
            </div>
          </div>
          <div className={styles.block}>
            <Title title="Теги" level={5} />
            {/* <div className={styles.blockContent}>
              {tags.map(({ value, key }) => {
                const isActive = filters.tags.includes(value);
                return (
                  <Button
                    key={key}
                    shape="round"
                    className={`${isActive && styles.btnActive} ${styles.btnFilter}`}
                    onClick={() => handleTagsChange(value, isActive)}
                  >
                    {value}
                  </Button>
                );
              })}
            </div> */}
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
