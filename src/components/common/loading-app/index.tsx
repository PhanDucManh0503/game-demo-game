import React from 'react';
import classNames from 'classnames/bind';
import ReactLoading from 'react-loading';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface ILoadingAppProps {
  heightBox?: number | string;
}

const LoadingApp = ({ heightBox = 'auto' }: ILoadingAppProps) => {
  return (
    <div className={cx('root')} style={{ height: heightBox }}>
      <ReactLoading
        type={'spin'}
        color={'#38475F'}
        height={'30px'}
        width={'30px'}
      />
    </div>
  );
};

export default LoadingApp;
