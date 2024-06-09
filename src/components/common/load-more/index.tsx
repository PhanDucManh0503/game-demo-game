import React from 'react';
import { Spin } from 'antd';
import classNames from 'classnames/bind';

import styles from './load_more.module.scss';

const cx = classNames.bind(styles);

const LoadMore = () => {
  return (
    <div className={cx('root')}>
      <Spin />
    </div>
  );
};

export default LoadMore;
