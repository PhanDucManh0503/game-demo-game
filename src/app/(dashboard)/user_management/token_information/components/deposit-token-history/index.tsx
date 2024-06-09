import React, { useEffect, useState } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { DatePicker, Form, notification, Select } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { ColumnsType } from 'antd/es/table';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { TokenAPI } from 'src/api/tokenAPI';
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

const DepositTokenHistory = ({ tabSelected }: IProps) => {
  const { t } = useTranslations();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenHistory, setTokenHistory] = useState<any>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [filter, setFilter] = useState<any>({});
  const [openModalUpdateStatus, setOpenModalUpdateStatus] =
    useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>({});

  const getTokenHistory = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: filter?.page || 1,
        limit: filter?.limit || 10,
      };
      const res: any = await TokenAPI.adminGetRequestDeposit(params);
      setTokenHistory(res?.content || []);
      setTotalElements(res?.totalElements || 0);
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
    if (tabSelected === TOKEN_HISTORY_TABS.TAB1.key) {
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
  const handleOkUpdateStatus = async (data: any) => {
    try {
      const body = {
        transactionId: selectedRow.id || '',
        status: data?.status || 'PROCESSING',
        note: data?.note || '',
      };
      await TokenAPI.adminUpdateRequestDeposit(body);
      getTokenHistory();
      setSelectedRow({});
      setOpenModalUpdateStatus(false);
      notification.success({ message: t('success') });
    } catch (err) {
      console.log(err);
      notification.error({ message: t('failed') });
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
      title: t('deposit_request.requester'),
      className: cx('cell'),
      dataIndex: 'user',
      align: 'center',
      width: 150,
      render(value) {
        return value ? value?.username : '';
      },
    },
    {
      title: t('deposit_request.request_date'),
      className: cx('cell'),
      dataIndex: 'requestDateTime',
      align: 'center',
      width: 200,
      render(value) {
        return value ? dayjs(value).format('YYYY.MM.DD') : '';
      },
    },
    {
      title: t('deposit_request.token_to_deposit'),
      className: cx('cell'),
      dataIndex: 'amount',
      align: 'center',
      width: 150,
      render(value) {
        return numberWithCommas(value || 0);
      },
    },

    {
      title: t('deposit_request.approver'),
      className: cx('cell'),
      dataIndex: 'admin',
      align: 'center',
      width: 150,
      render(value) {
        return value ? value?.username : '';
      },
    },
    {
      title: t('deposit_request.approve_date'),
      className: cx('cell'),
      dataIndex: 'responseDateTime',
      align: 'center',
      width: 200,
      render(value) {
        return value ? dayjs(value).format('YYYY.MM.DD') : '';
      },
    },
    {
      title: t('deposit_request.note'),
      className: cx('cell'),
      dataIndex: 'note',
      align: 'center',
      width: 250,
    },
    {
      title: t('deposit_request.status'),
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
      title: t('update'),
      className: cx('cell'),
      dataIndex: 'status',
      align: 'center',
      width: 200,
      render(value, record) {
        return (
          <ButtonApp
            icon={<i className="xi-pen" />}
            // title={t(`update`)}
            title=""
            className="bg-38475F text-white text-14"
            sx={{ width: '30px', height: '30px', margin: 'auto' }}
            onClick={() => {
              if (
                value !== REQUEST_STATUS[1]?.value &&
                value !== 'PROCESSING'
              ) {
                return;
              }
              handleUpdateStatus(record);
            }}
            disabled={
              value !== REQUEST_STATUS[1]?.value && value !== 'PROCESSING'
            }
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
    <Box sx={{ height: 'auto', minWidth: '450px' }}>
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
            tableId="c7417614-4a13-4855-a228-0699f4dff42d"
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
        isModalOpen={openModalUpdateStatus}
        handleCancel={handleCancelUpdateStatus}
        handleOk={handleOkUpdateStatus}
      />
    </Box>
  );
};

export default DepositTokenHistory;
