import React, { ReactNode, useState } from 'react';

import styles from './WrapperWithLabel.module.scss';

import ErrorMessage from '../ErrorMessage';

interface IWrapperWithLabelpProps {
  formItem: ReactNode;
  label: string;
  name?: string;
  value: boolean;
  error?: string;
  isRequired: boolean;
}

const WrapperWithLabel = ({
  label,
  error,
  isRequired,
  value,
  formItem,
  name,
}: IWrapperWithLabelpProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={styles.wrapper}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    >
      <label
        htmlFor={name}
        className={`${styles.label} ${error && styles.error} ${isRequired && styles.required}`}
      >
        {label}
      </label>
      <div className={`${!isFocused && !value ? '' : styles.fieldUnActive}`}>{formItem}</div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default WrapperWithLabel;
