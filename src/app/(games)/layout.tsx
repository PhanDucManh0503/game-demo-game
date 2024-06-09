'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useTranslations } from '@hooks/locales.hook';
import { useAuthStore } from '@stores/auth';
import { Layout, notification, Popover, Select, Space, theme } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';

import styles from './style.module.scss';

import 'moment/locale/ko';

import { useUpdateProfile } from '@hooks/query-hooks/useAuth';
import { LoadingProvider } from '@providers/LoadingProvider';
import { useLocalesStore } from '@stores/locales';
import { useUserStore } from '@stores/user';
import { StaffAPI } from 'src/api/userAPI';
import Timer from '@components/common/timer';
import { numberWithCommas } from '@utils/functions/common.function';

import ModalRequestDeposit from './games/components/modal-deposit';

moment.locale('en');

const cx = classNames.bind(styles);

const { Header, Content } = Layout;

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { t, locale } = useTranslations();
  const router = useRouter();

  const { user } = useUserStore();
  const { mutate: getProfile } = useUpdateProfile();
  const { updateUser } = useUserStore();

  const [openModalDeposit, setOpenModalDeposit] = useState<boolean>(false);

  const changeLocale = useLocalesStore((state) => state.changeLocale);

  const handleChangeLocale = (value: TDefaultLocale) => {
    changeLocale(value);
  };
  const { logout } = useAuthStore();

  const {
    token: {
      // colorBgContainer,
      siderWidth,
      // collapseSiderWidth,
      headerHeight,
      // bgColor,
    },
  } = theme.useToken() as any;

  // function keyPathToPath(keyPath: string[]) {
  //   return '/' + keyPath.reverse().join('/');
  // }

  // function onClickMenu({ keyPath }: { keyPath: string[] }) {
  //   const path = keyPathToPath(keyPath);
  //   router.push(path);
  // }

  function onLogout() {
    logout();
    router.push('/login');
  }
  const content = useMemo(() => {
    return (
      <div>
        <p>Full name:&nbsp;{user?.name || ''}</p>
        <p>Username:&nbsp;{user?.username || ''}</p>
        <p>Tokens:&nbsp;{numberWithCommas(user?.balance || 0)}</p>
      </div>
    );
  }, [user]);

  const handleUpdateProfile = async () => {
    await getProfile(
      {},
      {
        onSuccess: (data) => {
          updateUser(data);
        },
      },
    );
  };

  const handleOpenChange = async (e: any) => {
    if (e) {
      handleUpdateProfile();
    }
  };

  const handleRequestDeposit = async (data: any) => {
    try {
      await StaffAPI.requestDepositTokenAPI({
        amount: data?.number_token || 0,
      });
      handleUpdateProfile();
      setOpenModalDeposit(false);
      notification.success({ message: t('success') });
    } catch (err) {
      console.log(err);
      notification.error({ message: t('failed') });
    }
  };

  return (
    <LoadingProvider>
      <div
        className={cx('header-wrapper')}
        style={{
          backgroundColor: '#000',
          // backgroundColor: bgColor,
        }}
      >
        <div
          className={cx('logo')}
          style={{
            width: siderWidth,
          }}
        >
          <p
            style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#fff',
              marginTop: '0px',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/games')}
          >
            Live Game
          </p>
        </div>

        <Header
          style={{
            padding: 0,
            // background: colorBgContainer,
            // backgroundColor: bgColor,
            background: '#000',
            backgroundColor: '#000',
            height: headerHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            flex: 1,
          }}
        >
          <div></div>
          <Select
            defaultValue={locale}
            style={{ width: 120, height: 40 }}
            onChange={handleChangeLocale}
            options={[
              { value: 'ko', label: 'Vietnam' },
              { value: 'en', label: 'English' },
            ]}
          />
          <Space
            size={'small'}
            style={{
              marginRight: 8,
            }}
          >
            <Timer />

            <Popover
              content={content}
              title={t('user_information')}
              onOpenChange={handleOpenChange}
            >
              <Icon
                component={() => (
                  <i
                    className={cx('xi-user-o ', 'text-quaternary', 'icon')}
                  ></i>
                )}
              />
            </Popover>
            <Icon
              component={() => (
                <i
                  className={cx('xi-calendar-add', 'text-quaternary', 'icon')}
                ></i>
              )}
              onClick={() => setOpenModalDeposit(true)}
            />

            {user?.role === 'ADMIN' ? (
              <Icon
                component={() => (
                  <i
                    className={cx('xi-comment', 'text-quaternary', 'icon')}
                  ></i>
                )}
                onClick={() => router.push('/dashboard')}
              ></Icon>
            ) : (
              ''
            )}
            <Icon
              component={() => (
                <i className={cx('xi-log-out ', 'text-quaternary', 'icon')}></i>
              )}
              onClick={onLogout}
            ></Icon>
          </Space>
        </Header>
      </div>
      <Layout
        className={cx('layoutRoot')}
        style={{
          paddingTop: headerHeight,
          height: `calc(100vh - ${headerHeight})`,
        }}
      >
        <div className={cx('layoutBackground')}></div>

        <Layout className={cx('layoutContent')}>
          <div className={cx('content-wrapper')}>
            <Content
              style={{
                padding: '7px 20px 41px',
                minHeight: 280,
                background: 'transparent',
                overflow: 'auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {children}
            </Content>
          </div>
        </Layout>
        <ModalRequestDeposit
          isModalOpen={openModalDeposit}
          handleCancel={() => setOpenModalDeposit(false)}
          handleOk={handleRequestDeposit}
        />
      </Layout>
    </LoadingProvider>
  );
}
