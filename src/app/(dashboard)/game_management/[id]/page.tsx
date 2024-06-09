'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@hooks/locales.hook';
import { ILoading, LoadingContext } from '@providers/LoadingProvider';
import { Col, Form, Image, notification, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { GameAPI } from 'src/api/gameAPI';
import Box from '@components/common/box';
import ButtonApp from '@components/common/button-app';
import ModalConfirm from '@components/common/modal-confirm/ModalConfirm';
import NoData from '@components/common/no-data';
import PaginationApp from '@components/common/pagination';
import TableApp from '@components/common/table-app';
import { GAME_TYPES, STATUS_PLAY_GAME } from '@utils/constants/common.constant';
import { numberWithCommas } from '@utils/functions/common.function';

import ModalFinalizeGame from '../components/modal-finalize-game';
import styles from './style.module.scss';

const cx = classNames.bind(styles);
const defaultFilter = {
  page: 1,
  limit: 10,
};

// const EXAMPLE_DATA = {
//   id: 1,
//   game_type: 'GAME_CHICKEN_FIGHT',
//   game_code: 'GCFZBC',
//   result_game: '',
//   play_time: '2024-06-06 10:00',
//   staked_token: 500000,
//   reward_token: 40000,
//   player: 100,
//   status: STATUS_PLAY_GAME[1].value,
//   creater: 'admin33',
//   created_time: '2024-06-06 10:00',
//   finalizer: '',
//   finalized_time: '',
//   odds_ratio: 20,
//   odds: '80/100',
//   initial_value: 2000,
//   bet_lock: false,
// };

const Page = ({ params }: { params: { id: string } }) => {
  const { t } = useTranslations();
  const [form] = Form.useForm();
  const router = useRouter();
  const { showLoading, hideLoading } = useContext<ILoading>(LoadingContext);

  const [idGame, setIdGame] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameInformation, setGameInformation] = useState<any>({});

  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [textConfirm, setTextConfirm] = useState<string>('');

  const [openModalFinalize, setOpenModalFinalize] = useState<boolean>(false);

  const [filterChicken, setFilterChicken] = useState<any>({
    green: {},
    red: {},
  });
  const [totalGreenChicken, setTotalGreenChicken] = useState<any>(0);
  const [totalRedChicken, setTotalRedChicken] = useState<any>(0);
  const [userGreenChicken, setUserGreenChicken] = useState<any>([]);
  const [userRedChicken, setUserRedChicken] = useState<any>([]);

  const hanldeGetGameInformation = async () => {
    setIsLoading(true);
    try {
      const res: any = await GameAPI.adminGetDetailGame(params.id || '');
      if (res?.status !== 'INACTIVE') {
        setGameInformation(res);
      } else {
        setGameInformation({});
      }
    } catch (error) {
      console.log(error);
      setGameInformation({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventConfirm = (event: string) => {
    if (event === 'BET_LOCK') {
      setTextConfirm('confirm_bet_lock');
    }
    if (event === 'DELETE') {
      setTextConfirm('confirm_delete_game');
    }
    setOpenModalConfirm(true);
  };
  const handleCancelEvent = () => {
    setTextConfirm('');
    setOpenModalConfirm(false);
  };
  const handleAcceptEvent = async () => {
    showLoading();
    try {
      if (textConfirm === 'confirm_bet_lock') {
        await GameAPI.adminBetLockGame(idGame, {
          lockBet: true,
        });
        hanldeGetGameInformation();
        notification.success({ message: t('success') });
      }
      if (textConfirm === 'confirm_delete_game') {
        await GameAPI.adminDeleteGame(idGame, {
          status: 'INACTIVE',
        });
        notification.success({ message: t('success') });
        router.push('/game_management');
      }
    } catch (err) {
      console.log(err);
      notification.error({ message: t('failed') });
    } finally {
      setTextConfirm('');
      setOpenModalConfirm(false);
      hideLoading();
    }
  };

  const handleAcceptFinalize = async (result: string) => {
    showLoading();
    try {
      console.log(result);
      const chickenId =
        gameInformation?.chickens?.find((x: any) => x.name === result)?.id ||
        '';
      if (chickenId) {
        await GameAPI.adminFinalizeGame(gameInformation?.id, chickenId);
        hanldeGetGameInformation();
        notification.success({ message: t('success') });
      } else {
        notification.warning({ message: t('can_not_find_chicken') });
      }
    } catch (err) {
      console.log(err);
      notification.error({ message: t('failed') });
    } finally {
      setOpenModalFinalize(false);
      hideLoading();
    }
  };
  const handleChangePage = (type: string, page: number) => {
    if (type === 'GREEN') {
      setFilterChicken({
        ...filterChicken,
        green: {
          ...filterChicken.green,
          page,
        },
      });
    }
    if (type === 'RED') {
      setFilterChicken({
        ...filterChicken,
        red: {
          ...filterChicken.red,
          page,
        },
      });
    }
  };

  const handleGetUser = async (type: string) => {
    try {
      if (type === 'GREEN') {
        const pr = { ...filterChicken?.green };
        const res: any = await GameAPI.adminGetUserJoinGame(idGame, pr);
        setUserGreenChicken(res?.content || []);
        setTotalGreenChicken(res?.numberOfElements || 0);
      }
      if (type === 'RED') {
        const pr = { ...filterChicken?.red };
        const res: any = await GameAPI.adminGetUserJoinGame(idGame, pr);
        setUserRedChicken(res?.content || []);
        setTotalRedChicken(res?.numberOfElements || 0);
      }
    } catch (err) {
      console.log(err);
      if (type === 'GREEN') {
        setUserGreenChicken([]);
        setTotalGreenChicken(0);
      }
      if (type === 'RED') {
        setUserRedChicken([]);
        setTotalRedChicken(0);
      }
    }
  };
  useEffect(() => {
    if (filterChicken?.green?.page) {
      handleGetUser('GREEN');
    }
  }, [filterChicken?.green?.page]);
  useEffect(() => {
    if (filterChicken?.red?.page) {
      handleGetUser('RED');
    }
  }, [filterChicken?.red?.page]);
  useEffect(() => {
    if (params?.id && params?.id != 'string') {
      setIdGame(params?.id);
    }
  }, [params]);
  useEffect(() => {
    if (idGame) {
      hanldeGetGameInformation();
    }
  }, [idGame]);

  useEffect(() => {
    if (idGame) {
      setFilterChicken({
        green: { ...defaultFilter, chickenName: 'GREEN' },
        red: { ...defaultFilter, chickenName: 'RED' },
      });
      form.resetFields();
    }
  }, [idGame]);
  const dataGrid = [
    {
      title: t('user_play_history_table.creater'),
      content: (
        <p>
          {gameInformation.createdByName ? gameInformation.createdByName : '-'}
        </p>
      ),
    },
    {
      title: t('user_play_history_table.created_time'),
      content: (
        <p>
          {gameInformation.createdAt
            ? `${dayjs(gameInformation.createdAt).format('YYYY.MM.DD HH:mm')}`
            : '-'}
        </p>
      ),
    },
    {
      title: t('user_play_history_table.finalizer'),
      content: (
        <p>
          {gameInformation.finishedByName
            ? gameInformation.finishedByName
            : '-'}
        </p>
      ),
    },
    {
      title: t('user_play_history_table.finalized_time'),
      content: (
        <p>
          {gameInformation.finishedAt
            ? `${dayjs(gameInformation.finishedAt).format('YYYY.MM.DD HH:mm')}`
            : '-'}
        </p>
      ),
    },
    {
      title: t('user_play_history_table.result_game'),
      content: (
        <p style={{ color: 'red' }}>
          {gameInformation?.chickens?.find((x: any) => x.status === 'WIN')?.name
            ? t(
                `${gameInformation?.chickens?.find(
                  (x: any) => x.status === 'WIN',
                )?.name}`,
              )
            : '-'}
        </p>
      ),
    },
    {
      title: t('modal_add_game.initial_value'),
      content: (
        <p style={{ color: 'red' }}>
          {numberWithCommas(gameInformation?.baseAmt || 0)}
        </p>
      ),
    },
    {
      title: t('modal_add_game.odds_ratio'),
      content: (
        <p style={{ color: 'red' }}>
          {numberWithCommas(gameInformation?.maxBetPercentage || 0)}%
        </p>
      ),
    },
    {
      title: t('modal_add_game.odds'),
      content: (
        <p style={{ color: 'red' }}>
          {gameInformation?.chickens?.find((x: any) => x.name === 'GREEN')
            ?.betPercentage || 0}
          /
          {gameInformation?.chickens?.find((x: any) => x.name === 'RED')
            ?.betPercentage || 0}
        </p>
      ),
    },
  ];
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
      title: t('user_play_history_table.bettor'),
      className: cx('cell'),
      dataIndex: 'user',
      align: 'center',
      width: 200,
      render(value) {
        return value ? value?.username : '';
      },
    },
    {
      title: t('user_play_history_table.bet_time'),
      className: cx('cell'),
      dataIndex: 'createdAt',
      align: 'center',
      width: 150,
      render(value) {
        return value ? dayjs(value).format('YYYY.MM.DD HH:mm') : '';
      },
    },
    {
      title: t('user_play_history_table.staked_token'),
      className: cx('cell'),
      dataIndex: 'betAmt',
      align: 'center',
      width: 150,
      render(value) {
        return numberWithCommas(value || 0);
      },
    },
  ];
  return (
    <div className={cx('root')}>
      <div className={cx('top_section')}>
        <Box>
          <div className={cx('container')}>
            <div className={cx('header')}>
              <div className={cx('title')}>
                {gameInformation?.id ? (
                  <>
                    {t(
                      `${
                        GAME_TYPES.find(
                          (x: any) => x.value === gameInformation.gameType,
                        )?.label || ''
                      }`,
                    )}{' '}
                    : {gameInformation?.code || ''}
                  </>
                ) : (
                  ''
                )}
              </div>
              <div className={cx('button-group')}>
                <ButtonApp
                  title={
                    gameInformation.lockBet ||
                    gameInformation?.status !== STATUS_PLAY_GAME[1].value
                      ? t('bet_locked')
                      : t('bet_lock')
                  }
                  className="text-16"
                  sx={{ width: '120px', height: '36px' }}
                  onClick={() => {
                    handleEventConfirm('BET_LOCK');
                  }}
                  disabled={
                    !gameInformation?.id ||
                    gameInformation?.lockBet ||
                    gameInformation?.status !== STATUS_PLAY_GAME[1].value
                  }
                />
                <ButtonApp
                  title={
                    gameInformation?.status !== STATUS_PLAY_GAME[1].value
                      ? t('game_finalized')
                      : t('finalize_game')
                  }
                  className="bg-transparent text-16 text-black"
                  sx={{
                    width: '120px',
                    height: '36px',
                    border: '1px solid #CCC',
                  }}
                  onClick={() => {
                    setOpenModalFinalize(true);
                  }}
                  disabled={
                    !gameInformation?.id ||
                    gameInformation?.status !== STATUS_PLAY_GAME[1].value
                      ? true
                      : false
                  }
                />
                <ButtonApp
                  title={t('delete')}
                  className="bg-990000 text-16 "
                  sx={{
                    width: '90px',
                    height: '36px',
                    border: '1px solid #CCC',
                  }}
                  onClick={() => {
                    handleEventConfirm('DELETE');
                  }}
                  disabled={!gameInformation?.id}
                />
              </div>
            </div>
            <Row gutter={[20, 20]} className={cx('content')}>
              {gameInformation?.id ? (
                <>
                  <Col span={24} xl={12}>
                    <Row>
                      <iframe
                        style={{
                          width: '100%',
                          height: '45vh',
                          maxHeight: '400px',
                        }}
                        src={
                          gameInformation?.liveStreamLink ||
                          'https://www.youtube.com/embed/tgbNymZ7vqY'
                        }
                      ></iframe>
                    </Row>
                  </Col>
                  <Col span={24} xl={12}>
                    <div className={cx('data_list')}>
                      <Row gutter={[10, 10]}>
                        {dataGrid?.map((item, index) => (
                          <React.Fragment key={index}>
                            <Col
                              className="gutter-row"
                              span={24}
                              sm={12}
                              lg={8}
                              xl={8}
                              key={index}
                            >
                              <div className={cx('data_item')}>
                                <h5>{item.title}</h5>
                                {item.content}
                              </div>
                            </Col>
                          </React.Fragment>
                        ))}
                      </Row>
                    </div>
                  </Col>
                </>
              ) : (
                <Row justify="center" align="middle" style={{ width: '100%' }}>
                  <NoData text={t('no_data')} />
                </Row>
              )}
            </Row>
          </div>
        </Box>
      </div>
      <Row gutter={[20, 20]}>
        <Col span={24} xl={12}>
          <Box>
            <div className={cx('left_section')}>
              {gameInformation?.id ? (
                <>
                  <Row>
                    <Col span={24} md={6}>
                      <Image
                        src={
                          gameInformation?.chickens?.find(
                            (x: any) => x.name === 'GREEN',
                          )?.avatarPath
                            ? gameInformation?.chickens?.find(
                                (x: any) => x.name === 'GREEN',
                              )?.avatarPath
                            : 'https://png.pngtree.com/png-vector/20230415/ourmid/pngtree-rooster-logo-vector-png-image_6705895.png'
                        }
                        width={100}
                        height={100}
                      />
                    </Col>
                    <Col span={24} md={18}>
                      <Row
                        style={{
                          fontSize: '18px',
                          fontWeight: '500',
                          color: 'blue',
                        }}
                        align="middle"
                      >
                        {t('green_chicken')}
                        <i
                          className="xi-renew"
                          style={{ cursor: 'pointer', marginLeft: '10px' }}
                          onClick={() => {
                            if (filterChicken?.green?.page === 1) {
                              handleGetUser('GREEN');
                            } else {
                              setFilterChicken({
                                ...filterChicken,
                                green: {
                                  ...defaultFilter,
                                  chickenName: 'GREEN',
                                },
                              });
                            }
                          }}
                        />
                      </Row>
                      <Row>
                        {t('description')}:{' '}
                        {
                          gameInformation?.chickens?.find(
                            (x: any) => x.name === 'GREEN',
                          )?.description
                        }
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <TableApp
                        tableId="fdee406d-0d88-438a-a9fe-c1405bb304b5"
                        columns={columns}
                        dataSource={userGreenChicken}
                        rowClassName={cx('row')}
                        pagination={false}
                        loading={isLoading}
                        rowKey={(record: any) => record.id}
                        scroll={{
                          x: 'max-content',
                        }}
                      />
                    </Col>
                    <Col span={24}>
                      <PaginationApp
                        total={totalGreenChicken}
                        pageSize={filterChicken?.green?.limit}
                        current={filterChicken?.green?.page}
                        onChange={(page: number) =>
                          handleChangePage('GREEN', page)
                        }
                      />
                    </Col>
                  </Row>
                </>
              ) : (
                <Row
                  justify="center"
                  align="middle"
                  style={{ width: '100%', height: '200px' }}
                >
                  <NoData text={t('no_data')} />
                </Row>
              )}
            </div>
          </Box>
        </Col>
        <Col span={24} xl={12}>
          <Box>
            <div className={cx('right_section')}>
              {gameInformation?.id ? (
                <>
                  <Row>
                    <Col span={24} md={6}>
                      <Image
                        src={
                          gameInformation?.chickens?.find(
                            (x: any) => x.name === 'RED',
                          )?.avatarPath
                            ? gameInformation?.chickens?.find(
                                (x: any) => x.name === 'RED',
                              )?.avatarPath
                            : 'https://png.pngtree.com/png-vector/20230415/ourmid/pngtree-rooster-logo-vector-png-image_6705895.png'
                        }
                        width={100}
                        height={100}
                      />
                    </Col>
                    <Col span={24} md={18}>
                      <Row
                        style={{
                          fontSize: '18px',
                          fontWeight: '500',
                          color: 'red',
                        }}
                        align="middle"
                      >
                        {t('red_chicken')}
                        <i
                          className="xi-renew"
                          style={{ cursor: 'pointer', marginLeft: '10px' }}
                          onClick={() => {
                            if (filterChicken?.red?.page === 1) {
                              handleGetUser('RED');
                            } else {
                              setFilterChicken({
                                ...filterChicken,
                                red: { ...defaultFilter, chickenName: 'RED' },
                              });
                            }
                          }}
                        />
                      </Row>
                      <Row>
                        {t('description')}:{' '}
                        {
                          gameInformation?.chickens?.find(
                            (x: any) => x.name === 'RED',
                          )?.description
                        }
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <TableApp
                        tableId="98a4aa0b-7f01-47ef-8544-6e8144a85db0"
                        columns={columns}
                        dataSource={userRedChicken}
                        rowClassName={cx('row')}
                        pagination={false}
                        loading={isLoading}
                        rowKey={(record: any) => record.id}
                        scroll={{
                          x: 'max-content',
                        }}
                      />
                    </Col>
                    <Col span={24}>
                      <PaginationApp
                        total={totalRedChicken}
                        pageSize={filterChicken?.red?.limit}
                        current={filterChicken?.red?.page}
                        onChange={(page: number) =>
                          handleChangePage('RED', page)
                        }
                      />
                    </Col>
                  </Row>
                </>
              ) : (
                <Row
                  justify="center"
                  align="middle"
                  style={{ width: '100%', height: '200px' }}
                >
                  <NoData text={t('no_data')} />
                </Row>
              )}
            </div>
          </Box>
        </Col>
      </Row>
      <ModalConfirm
        open={openModalConfirm}
        handleCancel={handleCancelEvent}
        handleOk={handleAcceptEvent}
        centered
      >
        <p className={cx('text-confirm')}>{t(`${textConfirm}`)}</p>
      </ModalConfirm>
      <ModalFinalizeGame
        isModalOpen={openModalFinalize}
        handleCancel={() => setOpenModalFinalize(false)}
        handleOk={handleAcceptFinalize}
      />
    </div>
  );
};

export default Page;
