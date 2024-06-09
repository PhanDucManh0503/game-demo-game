import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import classNames from 'classnames/bind';

import styles from './button_app.module.scss';

interface IButtonAppProps {
  icon?: any;
  title?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  sx?: any;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  loading?: boolean;
  loadingColor?: string;
}

const cx = classNames.bind(styles);

const ButtonApp = ({
  icon,
  title,
  type = 'button',
  sx = {},
  className = '',
  loading = false,
  loadingColor = '#fff',
  ...props
}: IButtonAppProps) => {
  return (
    <button
      type={type}
      className={cx('root', className.split(' '))}
      style={{ ...sx }}
      disabled={loading}
      {...props}
    >
      {loading && (
        <Spin
          indicator={
            <LoadingOutlined
              style={{ fontSize: 17, color: loadingColor }}
              spin
            />
          }
        />
      )}
      {icon && <span>{icon}</span>}
      {title && <span>{title}</span>}
    </button>
  );
};

export default ButtonApp;
