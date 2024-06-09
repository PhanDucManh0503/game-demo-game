import React from 'react';
import { Pagination, PaginationProps } from 'antd';
import classNames from 'classnames/bind';

import styles from './pagination.module.scss';

const cx = classNames.bind(styles);

interface IPaginationAppProps extends PaginationProps {
  total?: number;
  pageSize?: number;
}

const PaginationApp = ({
  total = 0,
  pageSize = 10,
  ...props
}: IPaginationAppProps) => {
  const itemRender: PaginationProps['itemRender'] = (
    _,
    type,
    originalElement,
  ) => {
    if (type === 'prev') {
      return <a className={cx('btn-prev')}>Prev</a>;
    }
    if (type === 'next') {
      return <a className={cx('btn-next')}>Next</a>;
    }
    return originalElement;
  };

  return (
    <div className={cx('root')}>
      <Pagination
        total={total}
        pageSize={pageSize}
        itemRender={itemRender}
        showSizeChanger={false}
        {...props}
      />
    </div>
  );
};

export default PaginationApp;
