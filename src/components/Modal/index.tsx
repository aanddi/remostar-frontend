import { Button } from '@components';

import { ModalProps, Modal as UIModal } from 'antd';

import styles from './Modal.module.scss';
import './Modal.scss';

interface IModalProps extends ModalProps {
  className?: string;
  okText?: string;
  cancelText?: string;
  handleClose?: () => void;
  handleSubmit?: () => void;
}

const Modal = ({
  children,
  className,
  okText = 'Ок',
  cancelText = 'Отменить',
  handleClose,
  handleSubmit,
  ...restProps
}: IModalProps) => {
  return (
    <UIModal
      className={`modal ${className}`}
      footer={[
        <Button
          disabled={restProps.okButtonProps?.disabled}
          className={styles.modalBtn}
          key="ok"
          type="primary"
          onClick={handleSubmit}
        >
          {okText}
        </Button>,
        <Button className={styles.modalBtn} key="cancel" onClick={handleClose}>
          {cancelText}
        </Button>,
      ]}
      {...restProps}
    >
      {children}
    </UIModal>
  );
};

export default Modal;
