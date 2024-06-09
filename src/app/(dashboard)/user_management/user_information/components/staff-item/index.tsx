import React from 'react';
import Image from 'next/image';
import { useTranslations } from '@hooks/locales.hook';
import { Avatar } from 'antd';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { IMAGES } from 'public/images';
import { numberWithCommas } from '@utils/functions/common.function';

import { filterRole } from '../../page';
import styles from './style.module.scss';

interface IStaffItemProps {
  data: any;
  active: boolean;
}

const cx = classNames.bind(styles);

const StaffItem = ({ data, active }: IStaffItemProps) => {
  const { t } = useTranslations();

  return (
    <div className={cx('root')}>
      <div style={{ position: 'relative' }}>
        <Avatar src={data?.avt_path || null}>
          <Image
            src={IMAGES.BlankProfilePicture}
            width={0}
            height={0}
            alt=""
            sizes="100vw"
            className={cx('avatar-default')}
          />
        </Avatar>
        <div
          className={cx(
            'btn-role',
            data?.role === filterRole[1]?.value ? 'bg-222' : 'bg-blue',
          )}
        >
          {filterRole?.find((x: any) => x.value === data?.role)?.label
            ? t(
                `${filterRole?.find((x: any) => x.value === data?.role)
                  ?.label}`,
              )
            : ''}
        </div>
      </div>
      <div className={cx('information')}>
        <p>
          <span className={cx('text-222')}>{data?.full_name || ''}</span>
        </p>
        <p>
          <span className={cx('text-000')} style={{ wordBreak: 'break-all' }}>
            {data?.username}
          </span>
          <span className={cx('text-000')}>
            {dayjs(data?.brdt).format('YYYY.MM.DD')}(
            {dayjs().year() - dayjs(data?.brdt).year()})
          </span>
          <span className={cx('text-777')}>
            {numberWithCommas(data?.total_token || 0)}
          </span>
        </p>
      </div>
      {active && <div className={cx('tick')}></div>}
    </div>
  );
};

export default StaffItem;
