'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@hooks/locales.hook';
import { ILoading, LoadingContext } from '@providers/LoadingProvider';
import { Form, notification, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { GameAPI } from 'src/api/gameAPI';
import Box from '@components/common/box';
import ButtonApp from '@components/common/button-app';
import ModalConfirm from '@components/common/modal-confirm/ModalConfirm';
import PaginationApp from '@components/common/pagination';
import TableApp from '@components/common/table-app';
import { GAME_TYPES, STATUS_PLAY_GAME } from '@utils/constants/common.constant';
import { numberWithCommas } from '@utils/functions/common.function';

import ModalAddGame from './components/modal-add-game';
import styles from './style.module.scss';

const cx = classNames.bind(styles);
const defaultFilter = {
  status: GAME_TYPES[0].value,
  page: 1,
  limit: 10,
};

// const EXAMPLE_DATA = [
//   {
//     id: 1,
//     game_type: 'GAME_CHICKEN_FIGHT',
//     game_code: 'GCFZBC',
//     result_game: 'green',
//     play_time: '2024-06-06 10:00',
//     staked_token: 500000,
//     reward_token: 40000,
//     player: 100,
//     status: STATUS_PLAY_GAME[1].value,
//     creater: 'admin33',
//     created_time: '2024-06-06 10:00',
//     finalizer: '',
//     finalized_time: '',
//   },
//   {
//     id: 2,
//     game_type: 'GAME_CHICKEN_FIGHT',
//     game_code: 'GCFERT',
//     result_game: 'green',
//     play_time: '2024-06-07 10:00',
//     staked_token: 555000,
//     reward_token: 40000,
//     player: 100,
//     status: STATUS_PLAY_GAME[1].value,
//     creater: 'admin33',
//     created_time: '2024-06-06 10:00',
//     finalizer: '',
//     finalized_time: '',
//   },
//   {
//     id: 3,
//     game_type: 'GAME_CHICKEN_FIGHT',
//     game_code: 'GCQQWC',
//     result_game: 'red',
//     play_time: '2024-06-08 10:00',
//     staked_token: 900000,
//     reward_token: 40000,
//     player: 100,
//     status: STATUS_PLAY_GAME[1].value,
//     creater: 'admin33',
//     created_time: '2024-06-06 10:00',
//     finalizer: '',
//     finalized_time: '',
//   },
//   {
//     id: 4,
//     game_type: 'GAME_CHINESE_DICE',
//     game_code: 'GCFFGD',
//     result_game: 'under',
//     play_time: '2024-06-10 10:00',
//     staked_token: 500000,
//     reward_token: 40000,
//     player: 100,
//     status: STATUS_PLAY_GAME[2].value,
//     creater: 'admin33',
//     created_time: '2024-06-06 10:00',
//     finalizer: 'admin33',
//     finalized_time: '2024-06-06 11:00',
//   },
//   {
//     id: 5,
//     game_type: 'GAME_CHINESE_DICE',
//     game_code: 'FDGFDF',
//     result_game: 'over',
//     play_time: '2024-06-11 10:00',
//     staked_token: 100000,
//     reward_token: 40000,
//     player: 100,
//     status: STATUS_PLAY_GAME[2].value,
//     creater: 'admin33',
//     created_time: '2024-06-06 10:00',
//     finalizer: 'admin33',
//     finalized_time: '2024-06-06 11:00',
//   },
// ];

const Page = () => {
  const { t } = useTranslations();
  const [form] = Form.useForm();
  const router = useRouter();
  const { showLoading, hideLoading } = useContext<ILoading>(LoadingContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameHistory, setGameHistory] = useState<any>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [filter, setFilter] = useState<any>({});

  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>({});

  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);

  const getGameHistory = async () => {
    setIsLoading(true);
    try {
      const params: any = {
        page: filter.page || 1,
        limit: filter?.limit || 10,
      };
      if (filter?.gameType !== 'ALL') {
        params.gameType = filter.gameType;
      }
      if (filter?.status !== 'ALL') {
        params.status = filter.status;
      }
      const res: any = await GameAPI.adminGetListGames(params);
      setGameHistory(res?.content || []);
      setTotalElements(res?.totalElements);
    } catch (error) {
      setGameHistory([]);
      setTotalElements(0);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelDelete = () => {
    setSelectedRow({});
    setOpenModalConfirm(false);
  };
  const handleAcceptDelete = async () => {
    showLoading();
    try {
      await GameAPI.adminDeleteGame(selectedRow?.id, {
        status: 'INACTIVE',
      });
      notification.success({ message: t('success') });
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedRow({});
      setOpenModalConfirm(false);
      hideLoading();
    }
  };

  const handleFormChange = async (changedValues: any, values: any) => {
    setFilter({
      ...filter,
      ...changedValues,
      page: 1,
    });
  };
  const handleChangePage = (page: number) => {
    setFilter({
      ...filter,
      page,
    });
  };

  const handleOkAddGame = async (data: any) => {
    showLoading();
    try {
      if (data?.game_type === GAME_TYPES[1]?.value) {
        const body: any = {
          gameId: '7487e09c-613c-487b-841e-ff81c4a49077',
          name: 'CHICKEN_FIGHT',
          avatarPath: '',
          avatarName: '',
          liveStreamLink: data?.liveStreamLink || '',
          baseAmt: data?.baseAmt || 0,
          maxBetPercentage: data?.maxBetPercentage || 0,
          chickenFights: [
            {
              name: 'GREEN',
              color: 'COLOR_GREEN',
              avatarPath:
                data?.avatarGreen ||
                'https://png.pngtree.com/png-vector/20230415/ourmid/pngtree-rooster-logo-vector-png-image_6705895.png',
              avatarName: 'avatar_green_chicken',
              description: data?.description_green || '',
              betPercentage: data?.betPercentage_green || 0,
            },
            {
              name: 'RED',
              color: 'COLOR_RED',
              avatarPath:
                data?.avatarRed ||
                'https://png.pngtree.com/png-vector/20230415/ourmid/pngtree-rooster-logo-vector-png-image_6705895.png',
              avatarName: 'avatar_red_chicken',
              description: data?.description_red || '',
              betPercentage: data?.betPercentage_red || 0,
            },
          ],
        };
        await GameAPI.adminAddNewGame(body);
        setOpenModalAdd(false);
        setFilter({ ...defaultFilter });
        form.resetFields();
        notification.success({ message: t('success') });
      }
    } catch (err) {
      console.log(err);
      notification.error({ message: t('failed') });
    } finally {
      hideLoading();
    }
  };
  useEffect(() => {
    if (filter?.page && filter?.limit) {
      getGameHistory();
    }
  }, [filter]);
  useEffect(() => {
    setFilter({ ...defaultFilter });
    form.resetFields();
  }, []);
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
      dataIndex: 'gameType',
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
      dataIndex: 'code',
      align: 'center',
      width: 150,
    },
    // {
    //   title: t('user_play_history_table.result_game'),
    //   className: cx('cell'),
    //   dataIndex: 'winnerName',
    //   align: 'center',
    //   width: 150,
    //   render(value) {
    //     return value ? t(`${value}`) : '';
    //   },
    // },
    {
      title: t('user_play_history_table.player'),
      className: cx('cell'),
      dataIndex: 'totalPlayers',
      align: 'center',
      width: 150,
      render(value) {
        return numberWithCommas(value || 0);
      },
    },
    {
      title: t('user_play_history_table.staked_token'),
      className: cx('cell'),
      dataIndex: 'totalBetAmount',
      align: 'center',
      width: 150,
      render(value) {
        return (
          <span style={{ color: 'blue' }}>{numberWithCommas(value || 0)}</span>
        );
      },
    },
    // {
    //   title: t('user_play_history_table.reward_token'),
    //   className: cx('cell'),
    //   dataIndex: 'reward_token',
    //   align: 'center',
    //   width: 150,
    //   render(value) {
    //     return (
    //       <span style={{ color: 'red' }}>{numberWithCommas(value || 0)}</span>
    //     );
    //   },
    // },
    {
      title: t('user_play_history_table.creater'),
      className: cx('cell'),
      dataIndex: 'createdByName',
      align: 'center',
      width: 200,
    },
    {
      title: t('user_play_history_table.created_time'),
      className: cx('cell'),
      dataIndex: 'createdAt',
      align: 'center',
      width: 200,
      render(value) {
        return value ? dayjs(value).format('YYYY.MM.DD HH:mm') : '';
      },
    },
    {
      title: t('user_play_history_table.finalizer'),
      className: cx('cell'),
      dataIndex: 'finishedByName',
      align: 'center',
      width: 200,
    },
    {
      title: t('user_play_history_table.finalized_time'),
      className: cx('cell'),
      dataIndex: 'finishedAt',
      align: 'center',
      width: 200,
      render(value) {
        return value ? dayjs(value).format('YYYY.MM.DD HH:mm') : '';
      },
    },
    {
      title: t('user_play_history_table.status'),
      className: cx('cell'),
      dataIndex: 'status',
      align: 'center',
      width: 200,
      render(value) {
        return (
          <ButtonApp
            title={t(
              `${STATUS_PLAY_GAME.find((x: any) => x.value === value)?.label}`,
            )}
            className={
              value === STATUS_PLAY_GAME[1]?.value
                ? 'bg-primary text-14'
                : value === STATUS_PLAY_GAME[2]?.value
                ? 'bg-000 text-white text-14'
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
      title: t('action'),
      className: cx('cell'),
      dataIndex: 'id',
      align: 'center',
      width: 300,
      render(value, record) {
        return (
          <div className={cx('action')}>
            <i
              className="xi-eye"
              style={{ fontSize: '24px', color: 'blue', cursor: 'pointer' }}
              onClick={() => router.push(`/game_management/${record?.id}`)}
            />

            <i
              className="xi-trash"
              style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}
              onClick={() => {
                setSelectedRow(record);
                setOpenModalConfirm(true);
              }}
            />
            {/* <ButtonApp
              title={t('view')}
              className="bg-blue text-14"
              sx={{
                width: '50px',
                height: '30px',
              }}
            /> */}
            {/* <ButtonApp
              title={t('delete')}
              className="bg-990000 text-14"
              sx={{
                width: '50px',
                height: '30px',
              }}
              onClick={() => {
                setSelectedRow(record);
                setOpenModalConfirm(true);
              }}
            /> */}
          </div>
        );
      },
    },
  ];
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
            onValuesChange={handleFormChange}
          >
            <div className={cx('button-group')}>
              <Form.Item
                label={t('user_play_history_table.game_type')}
                name="gameType"
              >
                <Select
                  style={{ width: 150, height: 40 }}
                  defaultValue={GAME_TYPES[0].value}
                  options={[
                    { ...GAME_TYPES[0], label: t(GAME_TYPES[0].label) },
                    { ...GAME_TYPES[1], label: t(GAME_TYPES[1].label) },
                    { ...GAME_TYPES[2], label: t(GAME_TYPES[2].label) },
                    { ...GAME_TYPES[3], label: t(GAME_TYPES[3].label) },
                    { ...GAME_TYPES[4], label: t(GAME_TYPES[4].label) },
                    { ...GAME_TYPES[5], label: t(GAME_TYPES[5].label) },
                  ]}
                  placeholder={t('select')}
                />
              </Form.Item>
              <Form.Item
                label={t('user_play_history_table.status')}
                name="status"
              >
                <Select
                  style={{ width: 150, height: 40 }}
                  defaultValue={STATUS_PLAY_GAME[0].value}
                  options={[
                    {
                      ...STATUS_PLAY_GAME[0],
                      label: t(STATUS_PLAY_GAME[0].label),
                    },
                    {
                      ...STATUS_PLAY_GAME[1],
                      label: t(STATUS_PLAY_GAME[1].label),
                    },
                    {
                      ...STATUS_PLAY_GAME[2],
                      label: t(STATUS_PLAY_GAME[2].label),
                    },
                  ]}
                  placeholder={t('select')}
                />
              </Form.Item>
            </div>
          </Form>
          <div>
            <ButtonApp
              title={t('add')}
              sx={{
                width: '70px',
                height: '40px',
              }}
              onClick={() => setOpenModalAdd(true)}
            />
          </div>
        </div>
        <div>
          <TableApp
            tableId="c073d2b6-b1a0-45ed-9298-a935aa828205"
            columns={columns}
            dataSource={gameHistory}
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
      <ModalConfirm
        open={openModalConfirm}
        handleCancel={handleCancelDelete}
        handleOk={handleAcceptDelete}
        centered
      >
        <p className={cx('text-confirm')}>{t('confirm_delete_game')}</p>
      </ModalConfirm>
      <ModalAddGame
        isModalOpen={openModalAdd}
        handleCancel={() => setOpenModalAdd(false)}
        handleOk={handleOkAddGame}
      />
    </Box>
  );
};

export default Page;
