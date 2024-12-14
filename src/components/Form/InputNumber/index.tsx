import React, { forwardRef, useMemo } from 'react';

import { InputNumberProps, InputNumber as UIInputNumber } from 'antd';

import styles from './InputNumber.module.scss';
import './InputNumber.scss';

import WrapperWithLabel from '../WrapperWithLabel';

interface IInputNumberProps extends InputNumberProps {
  label?: string;
  labelClassName?: string;
  isRequired?: boolean;
  error?: string;
}

const InputNumber = forwardRef<HTMLInputElement, IInputNumberProps>(
  (
    { label, error, labelClassName, size, isRequired = false, type = 'text', ...restProps },
    ref,
  ) => {
    const field = useMemo(
      () => (
        <UIInputNumber
          type={type}
          ref={ref}
          status={error && 'error'}
          size={size ?? 'large'}
          className={`inputNumber ${styles.inputNumber} ${error && styles.error}`}
          {...restProps}
        />
      ),
      [type, ref, error, size, restProps],
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
  },
);

export default InputNumber;
