'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from '@hooks/locales.hook';
import { useUserStore } from '@stores/user';
import { Checkbox, Col, notification, Popover, Row } from 'antd';
import classNames from 'classnames/bind';
import { GameAPI } from 'src/api/gameAPI';
import Box from '@components/common/box';
import ButtonApp from '@components/common/button-app';
import InputNumberApp from '@components/form/input-number-app';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

const GameCard = ({ data, handleUpdateAfterBet }: any) => {
  const { t } = useTranslations();
  const { user } = useUserStore();

  const [selected, setSelected] = useState<string>('');
  const [stakedToken, setStakedToken] = useState<any>();

  const [contentGreen, setContentGreen] = useState<any>();
  const [contentRed, setContentRed] = useState<any>();

  const handleSubmitBet = async () => {
    if (!selected) {
      return notification.warning({ message: t('please_choose_chicken') });
    }
    if (!stakedToken) {
      return notification.warning({ message: t('please_enter_token') });
    }
    if (stakedToken > user.balance) {
      return notification.warning({ message: t('not_enought_token') });
    }
    try {
      const chickenId =
        data?.chickens?.find((x: any) => x.name === selected)?.id || '';
      if (chickenId) {
        const body = {
          betAmt: stakedToken || 0,
          chickenId,
        };
        await GameAPI.userJoinGame(data?.id, body);
        await handleUpdateAfterBet();
        notification.success({ message: t('success') });
      } else {
        notification.error({ message: t('try_later') });
      }
    } catch (err) {
      console.log(err);
      notification.error({ message: t('try_later') });
      setSelected('');
      setStakedToken(null);
      await handleUpdateAfterBet();
    }
  };

  useEffect(() => {
    if (data?.matchUser?.id) {
      setSelected(data?.matchUser?.chicken?.name);
      setStakedToken(data?.matchUser?.betAmt);
    }
    if (data?.id) {
      const green = data?.chickens?.find((x: any) => x?.name === 'GREEN');
      const red = data?.chickens?.find((x: any) => x?.name === 'RED');
      if (green && red) {
        setContentGreen(
          <div>
            <Row justify="center">
              <Image
                src={
                  green?.avatarPath ||
                  'https://png.pngtree.com/png-vector/20230415/ourmid/pngtree-rooster-logo-vector-png-image_6705895.png'
                }
                height={100}
                width={100}
                alt="green_chicken"
              />
            </Row>
            {green?.betPercentage && red?.betPercentage ? (
              <p>
                Tỷ lệ cược: {green?.betPercentage}/{red?.betPercentage}.
                Đặt&nbsp;
                {green?.betPercentage} ăn&nbsp;
                {red?.betPercentage}.
              </p>
            ) : (
              ''
            )}
            <p>{green?.description}</p>
          </div>,
        );
        setContentRed(
          <div>
            <Row justify="center">
              <Image
                src={
                  red?.avatarPath ||
                  'https://png.pngtree.com/png-vector/20230415/ourmid/pngtree-rooster-logo-vector-png-image_6705895.png'
                }
                height={100}
                width={100}
                alt="red_chicken"
              />
            </Row>
            {red?.betPercentage && green?.betPercentage ? (
              <p>
                Tỷ lệ cược: {green?.betPercentage}/{red?.betPercentage}.
                Đặt&nbsp;
                {red?.betPercentage} ăn&nbsp;
                {green?.betPercentage}.
              </p>
            ) : (
              ''
            )}

            <p>{red?.description}</p>
          </div>,
        );
      }
    }
  }, [data]);

  return (
    <Box sx={{ backgroundColor: '#3e3e3e' }}>
      <div className={cx('root')}>
        <div className={cx('video')}>
          <iframe
            className={cx('iframe_video')}
            src={data?.liveStreamLink}
          ></iframe>
        </div>
        <div className={cx('content')}>
          <Row justify="space-between">
            <div className={cx('chicken_image')}>
              <Col>
                <Image
                  src={
                    'https://png.pngtree.com/png-vector/20230415/ourmid/pngtree-rooster-logo-vector-png-image_6705895.png'
                  }
                  width={60}
                  height={60}
                  alt="image"
                />
              </Col>
              <Col>
                <Row
                  justify="start"
                  align="middle"
                  style={{ marginTop: '10px' }}
                >
                  <Popover content={contentGreen} title={t('green_chicken')}>
                    <i
                      className="xi-info-o"
                      style={{
                        color: '#fff',
                        fontSize: '16px',
                        marginRight: '10px',
                        cursor: 'pointer',
                      }}
                    />
                  </Popover>

                  <Checkbox
                    checked={selected === 'GREEN'}
                    value="GREEN"
                    onChange={(e) => setSelected(e.target.value)}
                    disabled={data?.lockBet || data?.matchUser?.id}
                  />
                </Row>
              </Col>
            </div>
            <div>
              <Image
                src="https://static.vecteezy.com/system/resources/previews/024/382/919/original/vs-icon-versus-battle-icon-sign-logo-symbol-red-design-transparent-background-free-png.png"
                width={50}
                height={50}
                alt="image"
              />
            </div>
            <div className={cx('chicken_image')}>
              <Col>
                <Image
                  src={
                    'https://png.pngtree.com/png-vector/20230415/ourmid/pngtree-rooster-logo-vector-png-image_6705895.png'
                  }
                  width={60}
                  height={60}
                  alt="image"
                />
              </Col>
              <Col>
                <Row justify="end" align="middle" style={{ marginTop: '10px' }}>
                  <Checkbox
                    checked={selected === 'RED'}
                    value="RED"
                    onChange={(e) => setSelected(e.target.value)}
                    disabled={data?.lockBet || data?.matchUser?.id}
                  />
                  <Popover content={contentRed} title={t('red_chicken')}>
                    <i
                      className="xi-info-o"
                      style={{
                        color: '#fff',
                        fontSize: '16px',
                        marginLeft: '10px',
                        cursor: 'pointer',
                      }}
                    />
                  </Popover>
                </Row>
              </Col>
            </div>
          </Row>
          <Row gutter={[10, 10]} style={{ marginTop: '10px' }} align="middle">
            <Col span={24} sm={12}>
              <InputNumberApp
                value={stakedToken}
                maxLength={16}
                onChange={(value) => setStakedToken(value)}
                disabled={data?.lockBet || data?.matchUser?.id}
              />
            </Col>
            <Col span={24} sm={12}>
              <ButtonApp
                title={t('submit_bet')}
                className="bg-000 text-16"
                sx={{
                  width: '100%',
                  height: '34px',
                  border: '1px solid #CCC',
                }}
                onClick={handleSubmitBet}
                disabled={data?.lockBet || data?.matchUser?.id}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }} align="middle" justify="center">
            {data?.code}&nbsp;&nbsp;
            {data?.lockBet ? `-  ${t('betting_time_ended')}` : ''}
          </Row>
        </div>
      </div>
    </Box>
  );
};

export default GameCard;
