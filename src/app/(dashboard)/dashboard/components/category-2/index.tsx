import React, { useState } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { Grid } from 'antd';
import classNames from 'classnames/bind';
import Box from '@components/common/box';
import ButtonApp from '@components/common/button-app';

import Card from '../card';
import styles from './style.module.scss';

const { useBreakpoint } = Grid;

const cx = classNames.bind(styles);

const TAB_TYPE = {
  USERS: 'USERS',
  PROFITS: 'PROFITS',
  GAMES: 'GAMES',
};

interface ICategory2 {
  category1: any;
  category2: any;
  category3: any;
  category4: any;
}

const Category2 = ({
  category1,
  category2,
  category3,
  category4,
}: ICategory2) => {
  const screens = useBreakpoint();
  const { t } = useTranslations();
  const [tabActive, setTabActive] = useState<string>(TAB_TYPE.USERS);

  const monthlyTasks: any[] = [
    {
      key: 1,
      type: 'default',
      title: t('game_chicken_fight'),
      desc: `(${t('dashboard.profits')} / ${t('dashboard.games')})`,
      count: 999 + 'M / ' + 100,
      countColor: 'black',
    },
    {
      key: 2,
      type: 'default',
      title: t('game_chicken_fight'),
      desc: `(${t('dashboard.profits')} / ${t('dashboard.games')})`,
      count: 999 + 'M / ' + 100,
      countColor: 'black',
    },
    {
      key: 3,
      type: 'default',
      title: t('game_chicken_fight'),
      desc: `(${t('dashboard.profits')} / ${t('dashboard.games')})`,
      count: 999 + 'M / ' + 100,
      countColor: 'black',
    },
    {
      key: 4,
      type: 'default',
      title: t('game_chicken_fight'),
      desc: `(${t('dashboard.profits')} / ${t('dashboard.games')})`,
      count: 999 + 'M / ' + 100,
      countColor: 'black',
    },
    {
      key: 5,
      type: 'default',
      title: t('game_chicken_fight'),
      desc: `(${t('dashboard.profits')} / ${t('dashboard.games')})`,
      count: 999 + 'M / ' + 100,
      countColor: 'black',
    },
  ];

  return (
    <Box sx={{ height: 'auto', marginBottom: 30 }}>
      <div className={cx('root')}>
        <div className={cx('header')}>
          {Object.keys(TAB_TYPE).map((tab) => (
            <ButtonApp
              key={tab}
              title={t('dashboard.' + tab?.toLowerCase())}
              className={
                tabActive === tab
                  ? 'bg-primary text-white rounded-full'
                  : 'bg-transparent text-black rounded-full border-ccc'
              }
              sx={{ width: 120, height: 36 }}
              onClick={() => setTabActive(tab)}
            />
          ))}
        </div>
        <div className={cx('card-list', screens)}>
          {monthlyTasks?.map((item) => (
            <Card
              key={item.key}
              type={item.type}
              title={item.title}
              desc={item.desc}
              count={item.count}
              countColor={item.countColor}
              onClick={item?.onClick}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Category2;
