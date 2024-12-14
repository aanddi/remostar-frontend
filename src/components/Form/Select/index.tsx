import type { BaseSelectRef } from 'rc-select';
import React, { forwardRef, useMemo } from 'react';

import { ArrowDown } from '@common/icon';

import { SelectProps, Select as UISelect } from 'antd';

import styles from './Select.module.scss';
import './Select.scss';

import WrapperWithLabel from '../WrapperWithLabel';

interface ISelectProps extends SelectProps {
  label?: string;
  labelClassName?: string;
  isRequired?: boolean;
  className?: string;
  error?: string;
}

const Select = forwardRef<BaseSelectRef, ISelectProps>(
  ({ className, label, size, isRequired = false, error, ...restProps }, ref) => {
    const select = useMemo(
      () => (
        <UISelect
          className={`select ${styles.select} ${className}`}
          suffixIcon={<ArrowDown size={20} />}
          ref={ref}
          variant="filled"
          size={size ?? 'large'}
          status={error && 'error'}
          popupClassName="dropdown"
          {...restProps}
        />
      ),
      [className, error, ref, size, restProps],
    );

    if (label) {
      return (
        <WrapperWithLabel
          label={label}
          formItem={select}
          value={!!restProps.value}
          error={error}
          isRequired={isRequired}
        />
      );
    }

    return select;
  },
);

export default Select;
