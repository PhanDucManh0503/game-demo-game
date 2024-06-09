import React from 'react';
import classNames from 'classnames/bind';

import styles from './no_data.module.scss';

const cx = classNames.bind(styles);

interface INoDataProps {
  text?: string;
}

const NoData = ({ text }: INoDataProps) => {
  return (
    <div className={cx('root')}>
      <p>{text || 'No data'}</p>
    </div>
  );
};

export default NoData;
