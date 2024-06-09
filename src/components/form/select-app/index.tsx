import React from 'react';
import { Select } from 'antd';
import classNames from 'classnames/bind';

import styles from './select_app.module.scss';

interface ISelectAppProps {
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  sx?: any;
  onChange?: (value: string) => void;
}

const cx = classNames.bind(styles);

const SelectApp = ({
  options,
  className = '',
  sx = {},
  ...props
}: ISelectAppProps) => {
  return (
    <div className={cx('root', className.split(' '))}>
      <Select
        style={{ width: '100%', height: '48px', ...sx }}
        options={options}
        suffixIcon={<i className="xi-angle-down-min xi-2x"></i>}
        popupClassName={cx('customPopupSelect')}
        {...props}
      />
    </div>
  );
};

export default SelectApp;
