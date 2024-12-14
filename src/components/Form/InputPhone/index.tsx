import React, { forwardRef, useMemo } from 'react';
import InputMask from 'react-input-mask';

import { Input, InputProps, InputRef } from 'antd';

import styles from './InputNumber.module.scss';
import './InputNumber.scss';

import WrapperWithLabel from '../WrapperWithLabel';

interface IPhoneProps extends InputProps {
  className?: string;
  label?: string;
  labelClassName?: string;
  isRequired?: boolean;
  error?: string;
  inputField: any;
}

const InputPhone = forwardRef<InputRef, IPhoneProps>(
  ({ className, error, size, isRequired = false, label, inputField, ...restProps }, ref) => {
    const field = useMemo(
      () => (
        <InputMask
          mask="+7 (999)-999-99-99"
          maskPlaceholder={null}
          beforeMaskedStateChange={({ nextState }) => {
            let { value } = nextState;
            if (
              nextState.value.endsWith('(') ||
              nextState.value.endsWith(')') ||
              nextState.value.endsWith('-')
            )
              value = value.slice(0, -1);
            return {
              ...nextState,
              value,
            };
          }}
          {...inputField}
        >
          <Input
            ref={ref}
            className={`inputPhone ${className}  ${styles.input}`}
            type="tel"
            inputMode="numeric"
            size={size ?? 'large'}
            autoComplete="tel"
            maxLength={18}
            {...restProps}
          />
        </InputMask>
      ),
      [inputField, ref, size, className, restProps],
    );

    if (label) {
      return (
        <WrapperWithLabel
          label={label}
          formItem={field}
          value={!!inputField.value}
          name={restProps.name}
          error={error}
          isRequired={isRequired}
        />
      );
    }

    return field;
  },
);

export default InputPhone;
