import React from 'react';
import { Tag } from 'antd';
import classNames from 'classnames/bind';

import styles from './tag_app.module.scss';

interface ITagAppProps {
  title: string;
  roundedFull?: boolean;
  className?: string;
  sx?: any;
}

const cx = classNames.bind(styles);

const TagApp = ({
  title,
  roundedFull = false,
  className = '',
  sx = {},
}: ITagAppProps) => {
  return (
    <Tag
      className={cx('root', className.split(' '))}
      style={
        roundedFull
          ? {
              width: '24px',
              minWidth: 'unset',
              height: '24px',
              minHeight: 'unset',
              borderRadius: '100%',
              ...sx,
            }
          : { ...sx }
      }
    >
      {title}
    </Tag>
  );
};

export default TagApp;
