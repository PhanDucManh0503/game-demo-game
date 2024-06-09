import React, { useEffect, useState } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { DatePicker, Form, Select } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { ColumnsType } from 'antd/es/table';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import Box from '@components/common/box';
import ButtonApp from '@components/common/button-app';
import PaginationApp from '@components/common/pagination';
import TableApp from '@components/common/table-app';
import { REQUEST_STATUS } from '@utils/constants/common.constant';
import { numberWithCommas } from '@utils/functions/common.function';

import { TOKEN_HISTORY_TABS } from '../../page';
import ModalUpdateDeposit from '../modal-update-deposit';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

export interface IProps {
  tabSelected: any;
}

const defaultFilter = {
  status: REQUEST_STATUS[0].value,
  page: 1,
  limit: 10,
};

const EXAMPLE_DATA = [
  {
    id: 1,
    requester: 'thedream',
    token_to_deposit: 999000,
    request_date: '2024-06-06',
    approver: '',
    approve_date: '',
    note: '',
    status: 'WAIT',
    bank_name: 'VPBank',
    account_name: 'Nguyen Van A',
    account_no: '103-304-555',
  },
  {
    id: 2,
    requester: 'yoursky',
    token_to_deposit: 999000,
    request_date: '2024-06-06',
    approver: 'admin999',
    approve_date: '2024-06-07',
    note: 'VPBank, 1111111, $500',
    status: 'COMPLETE',
    bank_name: 'VPBank',
    account_name: 'Nguyen Van A',
    account_no: '103-304-555',
  },
  {
    id: 3,
    requester: 'yoursky',
    token_to_deposit: 999000,
    request_date: '2024-06-06',
    approver: 'admin999',
    approve_date: '2024-06-07',
    note: 'VPBank, 1111111, $500',
    status: 'REJECT',
    bank_name: 'VPBank',
    account_name: 'Nguyen Van A',
    account_no: '103-304-555',
  },
];

const WithdrawTokenHistory = ({ tabSelected }: IProps) => {
  const { t } = useTranslations();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenHistory, setTokenHistory] = useState<any>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [filter, setFilter] = useState<any>({});
  const [openModalUpdateStatu, setOpenModalUpdateStatus] =
    useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>({});

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
    if (tabSelected === TOKEN_HISTORY_TABS.TAB2.key) {
      setFilter({ ...defaultFilter });
    }
    form.resetFields();
  }, [tabSelected]);

  const handleUpdateStatus = (record: any) => {
    setSelectedRow(record);
    setOpenModalUpdateStatus(true);
  };
  const handleCancelUpdateStatus = () => {
    setSelectedRow({});
    setOpenModalUpdateStatus(false);
  };
  const handleOkUpdateStatus = async () => {
    try {
      console.log(selectedRow);
      setSelectedRow({});
      setOpenModalUpdateStatus(false);
    } catch (err) {
      console.log(err);
    }
  };
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
      title: t('withdraw_request.requester'),
      className: cx('cell'),
      dataIndex: 'requester',
      align: 'center',
      width: 150,
    },
    {
      title: t('withdraw_request.token_to_deposit'),
      className: cx('cell'),
      dataIndex: 'token_to_deposit',
      align: 'center',
      width: 150,
      render(value) {
        return numberWithCommas(value || 0);
      },
    },
    {
      title: t('withdraw_request.bank_name'),
      className: cx('cell'),
      dataIndex: 'bank_name',
      align: 'center',
      width: 150,
    },
    {
      title: t('withdraw_request.account_name'),
      className: cx('cell'),
      dataIndex: 'account_name',
      align: 'center',
      width: 150,
    },
    {
      title: t('withdraw_request.account_no'),
      className: cx('cell'),
      dataIndex: 'account_no',
      align: 'center',
      width: 150,
    },
    {
      title: t('withdraw_request.request_date'),
      className: cx('cell'),
      dataIndex: 'request_date',
      align: 'center',
      width: 200,
      render(value) {
        return value ? dayjs(value).format('YYYY.MM.DD') : '';
      },
    },
    {
      title: t('withdraw_request.approver'),
      className: cx('cell'),
      dataIndex: 'approver',
      align: 'center',
      width: 150,
    },
    {
      title: t('withdraw_request.approve_date'),
      className: cx('cell'),
      dataIndex: 'approve_date',
      align: 'center',
      width: 200,
      render(value) {
        return value ? dayjs(value).format('YYYY.MM.DD') : '';
      },
    },
    {
      title: t('withdraw_request.note'),
      className: cx('cell'),
      dataIndex: 'note',
      align: 'center',
      width: 250,
    },
    {
      title: t('withdraw_request.status'),
      className: cx('cell'),
      dataIndex: 'status',
      align: 'center',
      width: 200,
      render(value) {
        return (
          <ButtonApp
            title={t(
              `${
                REQUEST_STATUS.find((x: any) => x.value === value)?.label ||
                value
              }`,
            )}
            className={
              value === REQUEST_STATUS[1]?.value
                ? 'bg-primary text-14'
                : value === REQUEST_STATUS[2]?.value
                ? 'bg-blue disabled text-14'
                : value === REQUEST_STATUS[3]?.value
                ? 'bg-990000 text-white disabled text-14'
                : `text-14`
            }
            sx={{
              width: '95px',
              height: '30px',
              margin: 'auto',
              cursor: 'context-menu',
            }}
          />
        );
      },
    },
    {
      title: t('status'),
      className: cx('cell'),
      dataIndex: 'status',
      align: 'center',
      width: 200,
      render(value, record) {
        return (
          <ButtonApp
            title={t(`update`)}
            className="bg-38475F text-white text-14"
            sx={{ width: '95px', height: '30px', margin: 'auto' }}
            onClick={() => {
              if (value !== REQUEST_STATUS[1]?.value) {
                return;
              }
              handleUpdateStatus(record);
            }}
            disabled={value !== REQUEST_STATUS[1]?.value}
          />
        );
      },
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
              <Form.Item label={t('status_request')} name="type">
                <Select
                  style={{ width: 150, height: 40 }}
                  defaultValue={REQUEST_STATUS[0].value}
                  options={[
                    { ...REQUEST_STATUS[0], label: t(REQUEST_STATUS[0].label) },
                    { ...REQUEST_STATUS[1], label: t(REQUEST_STATUS[1].label) },
                    { ...REQUEST_STATUS[2], label: t(REQUEST_STATUS[2].label) },
                    {
                      ...REQUEST_STATUS[3],
                      label: t(REQUEST_STATUS[3].label),
                    },
                  ]}
                  placeholder={t('select')}
                />
              </Form.Item>
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
            tableId="63daa2a8-24e2-46ca-86e4-740d0bc6c256"
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
      <ModalUpdateDeposit
        isModalOpen={openModalUpdateStatu}
        handleCancel={handleCancelUpdateStatus}
        handleOk={handleOkUpdateStatus}
      />
    </Box>
  );
};

export default WithdrawTokenHistory;
