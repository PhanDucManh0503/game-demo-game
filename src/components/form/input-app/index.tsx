import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames/bind';

import styles from './input_app.module.scss';

interface IInputAppProps {
  placeholder?: string;
  sx?: any;
}

const cx = classNames.bind(styles);

const InputApp = ({ placeholder, sx = {}, ...props }: IInputAppProps) => {
  return (
    <Input
      className={cx('root')}
      style={{ ...sx }}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default InputApp;
