import { useMemo } from 'react';

import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

import styles from './Textarea.module.scss';
import './Textarea.scss';

import WrapperWithLabel from '../WrapperWithLabel';

interface ITextareaProps extends TextAreaProps {
  label?: string;
  labelClassName?: string;
  isRequired?: boolean;
  error?: string;
}

const Textarea = ({
  label,
  error,
  labelClassName,
  isRequired = false,
  ...restProps
}: ITextareaProps) => {
  const field = useMemo(
    () => (
      <Input.TextArea
        className={`textareaWrapper ${styles.textarea} ${error && styles.error}`}
        {...restProps}
      />
    ),
    [error, restProps],
  );

  if (label) {
    return (
      <WrapperWithLabel
        label={label}
        formItem={field}
        value={!!restProps.value}
        name={restProps.name}
        error={error}
        isRequired={isRequired}
      />
    );
  }

  return field;
};

export default Textarea;
