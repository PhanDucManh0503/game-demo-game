import React from 'react';
import classNames from 'classnames/bind';

import styles from './box.module.scss';

const cx = classNames.bind(styles);

interface IBoxProps {
  children: any;
  sx?: any;
}

const Box = ({ children, sx = {} }: IBoxProps) => {
  return (
    <div className={cx('root')} style={{ ...sx }}>
      {children}
    </div>
  );
};

export default Box;
