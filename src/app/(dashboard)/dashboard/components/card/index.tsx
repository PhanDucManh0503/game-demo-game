import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface CardProps {
  type: 'default' | 'primary';
  title: string;
  desc: string;
  count: string;
  countColor: 'red' | 'black' | 'white' | 'primary';
  button?: ReactNode;
  onClick?: () => void;
}

const Card = ({
  type,
  title,
  desc,
  count,
  countColor,
  button = null,
  onClick,
}: CardProps) => {
  return (
    <div
      className={cx('card', {
        primary: type === 'primary',
        pointer: onClick,
      })}
      onClick={onClick}
    >
      <div className={cx('title')}>{title}</div>
      <div className={cx('desc')}>{desc}</div>
      <div className={cx('count', countColor)}>{count}</div>
      {button && <div className={cx('button')}>{button}</div>}
    </div>
  );
};

export default Card;
