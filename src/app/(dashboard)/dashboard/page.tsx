'use client';

import { useEffect, useState } from 'react';
import { SEO } from '@configs/seo.config';
import { Button, Col, Row } from 'antd';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { DefaultSeo } from 'next-seo';
import BarChart from '@components/charts/BarChart';
import DoughnutChart from '@components/charts/DoughnutChart';

import Category1 from './components/category-1';
import Category2 from './components/category-2';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

const data = [
  { value: 1048, name: '직원급여', itemStyle: { color: '#ee6666' } },
  { value: 735, name: '운영비용 ', itemStyle: { color: '#2aad9b' } },
  { value: 580, name: '비품비', itemStyle: { color: '#92cc77' } },
  { value: 484, name: '기타', itemStyle: { color: '#fba72b' } },
];
const loopChart = (data: any) => {
  const list: any = [];
  for (let i = 1; i < 7; i++) {
    const date = dayjs()
      .startOf('month')
      .subtract(i, 'month')
      .format('YYYY-MM');
    const item = data?.find((x: any) => x?.yearMonth === date);
    list.push({
      value: item?.value || 0,
      name: date,
      itemStyle: {
        normal: { color: '#2AAD9A' },
        emphasis: { color: '#ee6666' },
      },
    });
  }
  return list.reverse();
};
const chart2 = [
  {
    yearMonth: '2024-01',
    value: 1,
    additionalData: {},
  },
  {
    yearMonth: '2024-02',
    value: 1,
    additionalData: {},
  },
  {
    yearMonth: '2024-03',
    value: 5,
    additionalData: {},
  },
  {
    yearMonth: '2024-04',
    value: 14,
    additionalData: {},
  },
  {
    yearMonth: '2024-05',
    value: 1,
    additionalData: {},
  },
  {
    yearMonth: '2023-12',
    value: 0,
    additionalData: {},
  },
];
const ELDERLY_CHART_TYPE = {
  ELDERLY_IMPROVED: 'ELDERLY_IMPROVED',
  ELDERLY_STATUS: 'ELDERLY_STATUS',
  ELDERLY_PER_MONTH: 'ELDERLY_PER_MONTH',
};

const dataCategory1 = {
  game_chicken_fight: {
    profits: '999M',
    games: '100',
  },
  game_crab_gourd: {
    profits: '888M',
    games: '100',
  },
  game_chinese_dice: {
    profits: '777M',
    games: '100',
  },
  game_disk_sock: {
    profits: '666M',
    games: '100',
  },
  game_scratch_card: {
    profits: '999M',
    games: '100',
  },
};

const Page = () => {
  const [chartData2, setChartData2] = useState<any>([]);

  useEffect(() => {
    const formatChart2 = loopChart(chart2);
    setChartData2(formatChart2);
  }, []);
  const elderlyChartTabs = [
    {
      title: '호전된 수급자',
      value: ELDERLY_CHART_TYPE.ELDERLY_IMPROVED,
    },
    {
      title: '수급자 현황',
      value: ELDERLY_CHART_TYPE.ELDERLY_STATUS,
    },
    {
      title: '월별 수급자 수',
      value: ELDERLY_CHART_TYPE.ELDERLY_PER_MONTH,
    },
  ];
  const [tabActiveChartElderly, setTabActiveChartElderly] = useState(
    ELDERLY_CHART_TYPE.ELDERLY_IMPROVED,
  );

  const [tabActiveChartFinancial, setTabActiveChartFinancial] = useState(
    ELDERLY_CHART_TYPE.ELDERLY_IMPROVED,
  );

  return (
    <>
      <DefaultSeo {...SEO} title="Page" />
      <Category1 data={dataCategory1} />
      <Category2 category1={[]} category2={[]} category3={[]} category4={[]} />

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
          <div className={cx('chart-wrapper')}>
            <div className={cx('header')}>
              <div className={cx('chart-header-title')}>5월 청구금 비율</div>
            </div>
            <DoughnutChart data={data} width={'100%'} height={270} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
          <div className={cx('chart-wrapper')}>
            <div className={cx('header')}>
              {elderlyChartTabs.map((tab) => (
                <Button
                  key={tab.value}
                  type={
                    tabActiveChartElderly === tab.value ? 'primary' : 'default'
                  }
                  className={cx('btn-tab', {
                    'btn-ok': tabActiveChartElderly === tab.value,
                  })}
                  onClick={() => setTabActiveChartElderly(tab.value)}
                >
                  {tab.title}
                </Button>
              ))}
            </div>
            <BarChart data={chartData2} widthChart={'100%'} heightChart={270} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
          <div className={cx('chart-wrapper')}>
            <div className={cx('header')}>
              {elderlyChartTabs.map((tab) => (
                <Button
                  key={tab.value}
                  type={
                    tabActiveChartFinancial === tab.value
                      ? 'primary'
                      : 'default'
                  }
                  className={cx('btn-tab', {
                    'btn-ok': tabActiveChartFinancial === tab.value,
                  })}
                  onClick={() => setTabActiveChartFinancial(tab.value)}
                >
                  {tab.title}
                </Button>
              ))}
            </div>
            <BarChart data={chartData2} widthChart={'100%'} heightChart={270} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Page;
