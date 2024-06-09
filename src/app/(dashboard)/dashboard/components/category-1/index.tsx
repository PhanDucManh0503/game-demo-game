import React from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { Grid } from 'antd';
import classNames from 'classnames/bind';

import Card from '../card';
import styles from './style.module.scss';

const { useBreakpoint } = Grid;

const cx = classNames.bind(styles);

interface ICard {
  type: 'default' | 'primary';
  title: string;
  desc: string;
  count: string;
  countColor: 'red' | 'black' | 'white' | 'primary';
}

interface ICategory1 {
  data: any;
}

const Category1 = ({ data }: ICategory1) => {
  const screens = useBreakpoint();
  const { t } = useTranslations();

  const yearData: ICard[] = [
    {
      type: 'primary',
      title: t('game_chicken_fight'),
      desc: `(${t('dashboard.profits')} / ${t('dashboard.games')})`,
      count:
        (data?.game_chicken_fight?.profits || 0) +
        ' / ' +
        (data?.game_chicken_fight?.games || 0),
      countColor: 'white',
    },
    {
      type: 'primary',
      title: t('game_crab_gourd'),
      desc: `(${t('dashboard.profits')} / ${t('dashboard.games')})`,
      count:
        (data?.game_crab_gourd?.profits || 0) +
        ' / ' +
        (data?.game_crab_gourd?.games || 0),
      countColor: 'white',
    },
    {
      type: 'primary',
      title: t('game_chinese_dice'),
      desc: `(${t('dashboard.profits')} / ${t('dashboard.games')})`,
      count:
        (data?.game_chinese_dice?.profits || 0) +
        ' / ' +
        (data?.game_chinese_dice?.games || 0),
      countColor: 'white',
    },
    {
      type: 'primary',
      title: t('game_disk_sock'),
      desc: `(${t('dashboard.profits')} / ${t('dashboard.games')})`,
      count:
        (data?.game_disk_sock?.profits || 0) +
        ' / ' +
        (data?.game_disk_sock?.games || 0),
      countColor: 'white',
    },
    {
      type: 'primary',
      title: t('game_scratch_card'),
      desc: `(${t('dashboard.profits')} / ${t('dashboard.games')})`,
      count:
        (data?.game_scratch_card?.profits || 0) +
        ' / ' +
        (data?.game_scratch_card?.games || 0),
      countColor: 'white',
    },
  ];

  return (
    <div className={cx('root')}>
      <div className={cx('card-list', screens)}>
        {yearData.map((item) => (
          <Card
            key={item.title}
            type={item.type}
            title={item.title}
            desc={item.desc}
            count={item.count}
            countColor={item.countColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Category1;
