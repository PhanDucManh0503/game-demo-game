import React, { useEffect, useState } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { DatePicker, Form } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { ColumnsType } from 'antd/es/table';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import Box from '@components/common/box';
import ButtonApp from '@components/common/button-app';
import PaginationApp from '@components/common/pagination';
import TableApp from '@components/common/table-app';
import {
  GAME_TYPES,
  RESULT_GAME,
  TRANSACTION_TOKEN_TYPE,
} from '@utils/constants/common.constant';
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
    transaction_type: 'DEPOSIT',
    date: '2024-06-06 10:00',
    traded_token: 500000,
    balance_token: 1000000,
    result_staked: 'WIN',
  },
  {
    id: 2,
    transaction_type: 'WITHDRAW',
    balance_token: 1000000,
    date: '2024-06-07 10:00',
    traded_token: 555000,
    result_staked: 'WIN',
  },
  {
    id: 3,
    transaction_type: 'BET',
    balance_token: 1000000,
    date: '2024-06-08 10:00',
    traded_token: 900000,
    result_staked: 'LOSE',
  },
  {
    id: 4,
    transaction_type: 'DEPOSIT',
    balance_token: 1000000,
    date: '2024-06-10 10:00',
    traded_token: 500000,
    result_staked: 'WIN',
  },
  {
    id: 5,
    transaction_type: 'REWARD',
    balance_token: 1000000,
    date: '2024-06-11 10:00',
    traded_token: 100000,
    result_staked: 'LOSE',
  },
];

const TokenHistory = ({ staffSelected, tabSelected }: IProps) => {
  const { t } = useTranslations();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenHistory, setTokenHistory] = useState<any>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [filter, setFilter] = useState<any>({});

  const getTokenHistory = async () => {
    setIsLoading(true);
    try {
      setTokenHistory(EXAMPLE_DATA);
      setTotalElements(EXAMPLE_DATA.length);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePage = (page: number) => {
    setFilter({
      ...filter,
      page,
    });
  };
  useEffect(() => {
    if (filter?.page && filter?.limit) {
      getTokenHistory();
    }
  }, [filter]);
  useEffect(() => {
    if (staffSelected?.stf_no || tabSelected === 'USER_TOKEN_HISTORY') {
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
      title: t('user_token_history_table.date'),
      className: cx('cell'),
      dataIndex: 'date',
      align: 'center',
      width: 200,
      render(value) {
        return value ? dayjs(value).format('YYYY.MM.DD') : '';
      },
    },
    {
      title: t('user_token_history_table.transaction_type'),
      className: cx('cell'),
      dataIndex: 'transaction_type',
      align: 'center',
      width: 150,
      render(value) {
        return value
          ? t(
              `${TRANSACTION_TOKEN_TYPE.find((x: any) => x.value === value)
                ?.label}`,
            )
          : '';
      },
    },
    {
      title: t('user_token_history_table.traded_token'),
      className: cx('cell'),
      dataIndex: 'traded_token',
      align: 'center',
      width: 150,
      render(value, record) {
        return (
          <span
            style={{
              color:
                record.transaction_type === TRANSACTION_TOKEN_TYPE[1].value ||
                record.transaction_type === TRANSACTION_TOKEN_TYPE[4].value
                  ? 'blue'
                  : 'red',
            }}
          >
            {record.transaction_type === TRANSACTION_TOKEN_TYPE[1].value ||
            record.transaction_type === TRANSACTION_TOKEN_TYPE[4].value
              ? '+'
              : '-'}{' '}
            {numberWithCommas(value || 0)}
          </span>
        );
      },
    },
    {
      title: t('user_token_history_table.balance_token'),
      className: cx('cell'),
      dataIndex: 'balance_token',
      align: 'center',
      width: 150,
      render(value) {
        return numberWithCommas(value || 0);
      },
    },
    {
      title: t('user_token_history_table.note'),
      className: cx('cell'),
      dataIndex: 'note',
      align: 'center',
      width: 150,
    },
  ];
  const disabledEnd: RangePickerProps['disabledDate'] = (current) => {
    if (!form.getFieldValue('start_dt')) {
      return false;
    }
    return (
      current && current <= dayjs(form.getFieldValue('start_dt')).add(1, 'day')
    );
  };
  return (
    <Box>
      <div className={cx('root')}>
        <div className={cx('header')}>
          <Form
            form={form}
            name="basic"
            autoComplete="off"
            layout="vertical"
            scrollToFirstError
          >
            <div className={cx('button-group')}>
              <Form.Item label={t('from')} name="start_dt">
                <DatePicker
                  suffixIcon={<i className="xi-calendar" />}
                  style={{
                    width: '100%',
                    height: 40,
                  }}
                  placeholder={t('select')}
                />
              </Form.Item>
              <Form.Item label={t('to')} name="end_dt">
                <DatePicker
                  suffixIcon={<i className="xi-calendar" />}
                  style={{
                    width: '100%',
                    height: 40,
                  }}
                  disabledDate={disabledEnd}
                  placeholder={t('select')}
                />
              </Form.Item>
              <ButtonApp
                title={t('reset')}
                type="reset"
                sx={{ height: 36, width: 100, marginTop: 28 }}
              />
            </div>
          </Form>
        </div>
        <div>
          <TableApp
            tableId="7e0df8a0-8b07-489f-8ee5-906a0645d115"
            columns={columns}
            dataSource={tokenHistory}
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

export default TokenHistory;
