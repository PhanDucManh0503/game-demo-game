import React, { useEffect, useState } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { ColumnsType } from 'antd/es/table';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import Box from '@components/common/box';
import PaginationApp from '@components/common/pagination';
import TableApp from '@components/common/table-app';
import SelectApp from '@components/form/select-app';
import { GAME_TYPES, RESULT_GAME } from '@utils/constants/common.constant';
import { numberWithCommas } from '@utils/functions/common.function';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

export interface IProps {
  staffSelected: any;
  tabSelected: any;
}

const defaultFilter = {
  type: GAME_TYPES[0].value,
  result: RESULT_GAME[0].value,
  page: 1,
  limit: 10,
};

const EXAMPLE_DATA = [
  {
    id: 1,
    game_type: 'GAME_CHICKEN_FIGHT',
    game_code: 'GCFZBC',
    result_game: 'green',
    play_time: '2024-06-06 10:00',
    staked_token: 500000,
    result_staked: 'WIN',
  },
  {
    id: 2,
    game_type: 'GAME_CHICKEN_FIGHT',
    game_code: 'GCFERT',
    result_game: 'green',
    play_time: '2024-06-07 10:00',
    staked_token: 555000,
    result_staked: 'WIN',
  },
  {
    id: 3,
    game_type: 'GAME_CHICKEN_FIGHT',
    game_code: 'GCQQWC',
    result_game: 'red',
    play_time: '2024-06-08 10:00',
    staked_token: 900000,
    result_staked: 'LOSE',
  },
  {
    id: 4,
    game_type: 'GAME_CHICKEN_FIGHT',
    game_code: 'GCFFGD',
    result_game: 'green',
    play_time: '2024-06-10 10:00',
    staked_token: 500000,
    result_staked: 'WIN',
  },
  {
    id: 5,
    game_type: 'GAME_CHICKEN_FIGHT',
    game_code: 'FDGFDF',
    result_game: 'red',
    play_time: '2024-06-11 10:00',
    staked_token: 100000,
    result_staked: 'LOSE',
  },
];

const PlayHistory = ({ staffSelected, tabSelected }: IProps) => {
  const { t } = useTranslations();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playHistory, setPlayHistory] = useState<any>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [filter, setFilter] = useState<any>({});

  const getPlayHistory = async () => {
    setIsLoading(true);
    try {
      setPlayHistory(EXAMPLE_DATA);
      setTotalElements(EXAMPLE_DATA.length);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangeFilter = (name: string, value: any) => {
    console.log('value', value);
    setFilter({
      ...filter,
      [name]: value,
    });
  };
  const handleChangePage = (page: number) => {
    setFilter({
      ...filter,
      page,
    });
  };
  useEffect(() => {
    if (filter?.page && filter?.limit) {
      getPlayHistory();
    }
  }, [filter]);
  useEffect(() => {
    if (staffSelected?.stf_no || tabSelected === 'USER_PLAY_HISTORY') {
      setFilter({ ...defaultFilter });
    }
  }, [staffSelected, tabSelected]);
  const columns: ColumnsType<any> = [
    {
      title: 'No',
      className: cx('cell'),
      dataIndex: 'id',
      align: 'center',
      width: 60,
      render(value, record, index) {
        return index + 1;
      },
    },
    {
      title: t('user_play_history_table.game_type'),
      className: cx('cell'),
      dataIndex: 'game_type',
      align: 'center',
      width: 150,
      render(value) {
        return value
          ? t(`${GAME_TYPES.find((x: any) => x.value === value)?.label}`)
          : '';
      },
    },
    {
      title: t('user_play_history_table.game_code'),
      className: cx('cell'),
      dataIndex: 'game_code',
      align: 'center',
      width: 150,
    },
    {
      title: t('user_play_history_table.result_game'),
      className: cx('cell'),
      dataIndex: 'result_game',
      align: 'center',
      width: 150,
      render(value) {
        return value ? t(`${value}`) : '';
      },
    },
    {
      title: t('user_play_history_table.play_time'),
      className: cx('cell'),
      dataIndex: 'play_time',
      align: 'center',
      width: 200,
      render(value) {
        return value ? dayjs(value).format('YYYY.MM.DD') : '';
      },
    },

    {
      title: t('user_play_history_table.staked_token'),
      className: cx('cell'),
      dataIndex: 'staked_token',
      align: 'center',
      width: 150,
      render(value) {
        return numberWithCommas(value || 0);
      },
    },
    {
      title: t('user_play_history_table.result_staked'),
      className: cx('cell'),
      dataIndex: 'result_staked',
      align: 'center',
      width: 150,
      render(value) {
        return (
          <span
            style={{
              color: value === RESULT_GAME[1].value ? 'blue' : 'red',
              fontWeight: '500',
            }}
          >
            {value
              ? t(`${RESULT_GAME.find((x: any) => x.value === value)?.label}`)
              : ''}
          </span>
        );
      },
    },
  ];
  return (
    <Box>
      <div className={cx('root')}>
        <div className={cx('header')}>
          <div className={cx('button-group')}>
            <SelectApp
              options={[
                { ...GAME_TYPES[0], label: t(GAME_TYPES[0].label) },
                { ...GAME_TYPES[1], label: t(GAME_TYPES[1].label) },
                { ...GAME_TYPES[2], label: t(GAME_TYPES[2].label) },
                { ...GAME_TYPES[3], label: t(GAME_TYPES[3].label) },
                { ...GAME_TYPES[4], label: t(GAME_TYPES[4].label) },
                { ...GAME_TYPES[5], label: t(GAME_TYPES[5].label) },
              ]}
              sx={{ width: 150, height: 40 }}
              value={filter?.type}
              onChange={(value: string) => handleChangeFilter('type', value)}
              placeholder={t('select')}
            />
            <SelectApp
              options={[
                { ...RESULT_GAME[0], label: t(RESULT_GAME[0].label) },
                { ...RESULT_GAME[1], label: t(RESULT_GAME[1].label) },
                { ...RESULT_GAME[2], label: t(RESULT_GAME[2].label) },
              ]}
              sx={{ width: 150, height: 40 }}
              value={filter?.result}
              onChange={(value: string) => handleChangeFilter('result', value)}
              placeholder={t('select')}
            />
          </div>
        </div>
        <div>
          <TableApp
            tableId="a5b97f9c-74c4-4bc4-bb07-ea530d34b3f0"
            columns={columns}
            dataSource={playHistory}
            rowClassName={cx('row')}
            pagination={false}
            loading={isLoading}
            rowKey={(record: any) => record.stf_no}
            scroll={{
              x: 'max-content',
            }}
          />
          <PaginationApp
            total={totalElements}
            pageSize={filter?.limit}
            current={filter?.page}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </Box>
  );
};

export default PlayHistory;
