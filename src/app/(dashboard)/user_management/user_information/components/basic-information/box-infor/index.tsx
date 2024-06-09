import React from 'react';
import Image from 'next/image';
import { useTranslations } from '@hooks/locales.hook';
import { Avatar, Col, Row } from 'antd';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { IMAGES } from 'public/images';
import Box from '@components/common/box';
import ButtonApp from '@components/common/button-app';
import NoData from '@components/common/no-data';
import { numberWithCommas } from '@utils/functions/common.function';
import { splitPhone } from '@utils/helpers';

import { filterRole, genderList, TEXT_EVENT_USER } from '../../../page';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface IBoxInfoProps {
  staffIndoState: {
    staffInfo: any;
    setStaffInfo: React.Dispatch<React.SetStateAction<any>>;
  };

  handleClickEventAboutUser: (event: string) => void;
}

const BoxInfor = ({
  staffIndoState,
  handleClickEventAboutUser,
}: IBoxInfoProps) => {
  const { t } = useTranslations();
  const { staffInfo } = staffIndoState;

  const dataGrid = [
    {
      title: t('role'),
      content: (
        <p>
          {filterRole?.find((x: any) => x.value === staffInfo?.role)?.label
            ? t(
                `${filterRole?.find((x: any) => x.value === staffInfo?.role)
                  ?.label}`,
              )
            : '-'}
        </p>
      ),
    },
    {
      title: t('gender'),
      content: (
        <p>
          {staffInfo?.sex_cd
            ? t(
                `${genderList?.find((x: any) => x.value === staffInfo?.sex_cd)
                  ?.label}`,
              )
            : '-'}
        </p>
      ),
    },
    {
      title: t('birthday'),
      content: (
        <p>
          {staffInfo.brdt
            ? `${dayjs(staffInfo?.brdt).format('YYYY.MM.DD')} (${
                dayjs().year() - dayjs(staffInfo?.brdt).year()
              })`
            : '-'}
        </p>
      ),
    },
    {
      title: t('user_total_token'),
      content: (
        <p style={{ color: 'red' }}>
          {numberWithCommas(staffInfo?.total_token || 0)}
        </p>
      ),
    },
    {
      title: t('user_number_play'),
      content: <p>{numberWithCommas(staffInfo?.number_play || 0)}</p>,
    },
    {
      title: t('user_number_win'),
      content: <p>{numberWithCommas(staffInfo?.number_win || 0)}</p>,
    },
  ];

  return (
    <Box>
      <div className={cx('root')}>
        <div className={cx('title')}>
          <h4>{t('user_basic_information')}</h4>
          <div className={cx('button-group')}>
            <ButtonApp
              title={t('deposit_token')}
              className="text-16"
              sx={{ width: '125px', height: '36px' }}
              onClick={() =>
                handleClickEventAboutUser(TEXT_EVENT_USER.DEPOSIT.value)
              }
            />
            <ButtonApp
              title={t('edit_user')}
              className="bg-transparent text-16 text-black"
              sx={{ width: '100px', height: '36px', border: '1px solid #CCC' }}
              onClick={() =>
                handleClickEventAboutUser(TEXT_EVENT_USER.EDIT.value)
              }
            />
            <ButtonApp
              title={staffInfo?.blocked ? t('unblock_user') : t('block_user')}
              className="bg-transparent text-16 text-black"
              sx={{ width: '100px', height: '36px', border: '1px solid #CCC' }}
              onClick={() =>
                handleClickEventAboutUser(
                  staffInfo?.blocked
                    ? TEXT_EVENT_USER.UNBLOCK.value
                    : TEXT_EVENT_USER.BLOCK.value,
                )
              }
            />
            <ButtonApp
              title={t('delete_user')}
              className="bg-990000 text-16"
              sx={{ width: '100px', height: '36px' }}
              onClick={() =>
                handleClickEventAboutUser(TEXT_EVENT_USER.DELETE.value)
              }
            />
          </div>
        </div>
        <div className={cx('box-scroll')}>
          {staffInfo?.stf_no ? (
            <>
              <div className={cx('content')}>
                <div className={cx('person-info')}>
                  <Avatar src={staffInfo?.avt_path || null}>
                    <Image
                      src={IMAGES.BlankProfilePicture}
                      width={0}
                      height={0}
                      alt=""
                      sizes="100vw"
                      className={cx('avatar-default')}
                    />
                  </Avatar>
                  <div className={cx('detail')}>
                    <p style={{ flexWrap: 'wrap' }}>
                      <span>
                        {staffInfo?.full_name} ({staffInfo?.username})
                      </span>
                    </p>
                    <Row align="middle">
                      <p
                        className={cx('text-gray')}
                        style={{ flexWrap: 'wrap' }}
                      >
                        <div>
                          <i className="xi-call xi-x"></i>&nbsp;
                          <span style={{ marginRight: '10px' }}>
                            {splitPhone(staffInfo?.hp_no || '')}
                          </span>
                        </div>
                        <div>
                          <i className="xi-mail xi-x"></i>&nbsp;
                          <span>{staffInfo?.email_addr || ''}</span>
                        </div>
                      </p>
                    </Row>
                  </div>
                </div>
              </div>
              <div className={cx('data-list')}>
                <Row gutter={[10, 10]}>
                  {dataGrid?.map((item, index) => (
                    <React.Fragment key={index}>
                      <Col
                        className="gutter-row"
                        span={24}
                        md={12}
                        lg={8}
                        key={index}
                      >
                        <div className={cx('data-item')}>
                          <h5>{item.title}</h5>
                          {item.content}
                        </div>
                      </Col>
                    </React.Fragment>
                  ))}
                </Row>
              </div>
            </>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </Box>
  );
};

export default BoxInfor;
