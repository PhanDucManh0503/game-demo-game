'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useTranslations } from '@hooks/locales.hook';
import { useAuthStore } from '@stores/auth';
import {
  Avatar,
  Breadcrumb,
  Button,
  Layout,
  Menu,
  Select,
  Space,
  theme,
} from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';

import styles from './style.module.scss';

import 'moment/locale/ko';

import { LoadingProvider } from '@providers/LoadingProvider';
import { useLocalesStore } from '@stores/locales';
import { useUserStore } from '@stores/user';
import { IMAGES } from 'public/images';
import Timer from '@components/common/timer';

moment.locale('en');

const cx = classNames.bind(styles);

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { t, locale } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();

  const changeLocale = useLocalesStore((state) => state.changeLocale);

  const handleChangeLocale = (value: TDefaultLocale) => {
    changeLocale(value);
  };
  const { logout } = useAuthStore();

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: {
      colorBgContainer,
      siderWidth,
      collapseSiderWidth,
      headerHeight,
      bgColor,
    },
  } = theme.useToken() as any;

  const menuItems = [
    {
      key: 'dashboard',
      icon: (
        <Icon
          component={() => <i className={cx('xi-home-o', 'menu-icon')}></i>}
        />
      ),
      label: t('menu.dashboard'),
    },

    {
      key: 'user_management',
      icon: (
        <Icon
          component={() => <i className={cx('xi-users-o', 'menu-icon')}></i>}
        />
      ),
      label: t('menu.user_management'),
      children: [
        {
          key: 'user_information',
          label: t('menu.user_information'),
        },
        {
          key: 'token_information',
          label: t('menu.token_information'),
        },
      ],
    },
    {
      key: 'game_management',
      icon: (
        <Icon
          component={() => <i className={cx('xi-pacman', 'menu-icon')}></i>}
        />
      ),
      label: t('menu.game_management'),
    },
  ];

  function keyPathToPath(keyPath: string[]) {
    return '/' + keyPath.reverse().join('/');
  }

  function onClickMenu({ keyPath }: { keyPath: string[] }) {
    const path = keyPathToPath(keyPath);
    router.push(path);
  }

  function onLogout() {
    logout();
    router.push('/login');
  }

  const [defaultSelectedKeys, defaultOpenKeys] = useMemo(() => {
    return [[pathname.split('/')[2]], [pathname.split('/')[1]]];
  }, [pathname]);

  const itemsBreadcrumb = useMemo(() => {
    const arrayPathname = pathname.split('/');
    arrayPathname[0] = 'home';
    return arrayPathname.map((item) => ({ title: t('menu.' + item) }));
  }, [pathname, t]);

  return (
    <LoadingProvider>
      <div
        className={cx('header-wrapper')}
        style={{
          backgroundColor: bgColor,
        }}
      >
        <div
          className={cx('logo')}
          style={{
            width: collapsed ? collapseSiderWidth : siderWidth,
          }}
        >
          {collapsed ? (
            <div></div>
          ) : (
            <p
              style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#fff',
                marginTop: '0px',
              }}
              onClick={() => router.push('/games')}
            >
              Live Game
            </p>
          )}
        </div>

        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: headerHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: bgColor,
            flex: 1,
          }}
        >
          <Button
            type="text"
            icon={
              <Icon
                component={() => <i className="xi-bars text-white"></i>}
              ></Icon>
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: headerHeight,
            }}
          />
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
            <Icon
              component={() => (
                <i className={cx('xi-user-o ', 'text-quaternary', 'icon')}></i>
              )}
            ></Icon>
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
        <Sider
          className={cx('layoutMenu')}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: bgColor }}
          width={siderWidth}
          collapsedWidth={collapseSiderWidth}
        >
          <div className={cx('wrapper-sider')}>
            <div className={cx('admin')}>
              <div className={cx('admin-logo')}>
                <Avatar
                  src={user?.avatarPath || IMAGES.BlankProfilePicture}
                  size={collapsed ? 36 : 66}
                >
                  <Image
                    src={IMAGES.BlankProfilePicture}
                    width={66}
                    height={66}
                    alt=""
                    sizes="100vw"
                    className={cx('avatar-default')}
                  />
                </Avatar>
              </div>
              {collapsed ? null : (
                <>
                  <div className={cx('admin-name')}>{user?.username}</div>
                  <div className={cx('admin-text')}>{t(`${user?.role}`)}</div>
                </>
              )}
            </div>

            <Menu
              mode="inline"
              defaultSelectedKeys={
                defaultSelectedKeys[0] ? defaultSelectedKeys : defaultOpenKeys
              }
              defaultOpenKeys={defaultOpenKeys}
              items={menuItems}
              onClick={onClickMenu}
              className={cx('menu')}
            />
          </div>
        </Sider>

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
              <Breadcrumb
                className={cx('layoutBreadcrumb')}
                items={itemsBreadcrumb}
                separator={<i className="xi-angle-right-min xi-x"></i>}
              />
              {children}
            </Content>
          </div>
        </Layout>
      </Layout>
    </LoadingProvider>
  );
}
