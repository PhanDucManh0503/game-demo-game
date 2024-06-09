'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@hooks/locales.hook';
import { useLogin } from '@hooks/query-hooks/useAuth';
import { useAuthStore } from '@stores/auth';
import { useModalNotiStore } from '@stores/modal-noti';
import { useUserStore } from '@stores/user';
import { Button, Form, Input } from 'antd';
import classNames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

type FieldType = {
  number?: string;
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslations();

  const { mutate: login, isLoading } = useLogin();
  const { login: loginState } = useAuthStore();
  const { updateUser } = useUserStore();
  const { open } = useModalNotiStore();

  const onFinish = async (values: any) => {
    login(
      { username: values.username.trim(), password: values.password },
      {
        onSuccess: (data) => {
          loginState({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
          updateUser(data.user);
          open();
          router.push('/games');
        },
      },
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 480, width: '100%' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <div className={cx('login-container')}>
        <Form.Item<FieldType>
          label={t('login_page.username')}
          name="username"
          style={{ width: '100%' }}
          rules={[
            { required: true, message: t('please_enter') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !getFieldValue('username')?.trim() &&
                  getFieldValue('username')
                ) {
                  return Promise.reject(t('please_enter'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input className={cx('input')} maxLength={255} />
        </Form.Item>
        <Form.Item<FieldType>
          label={t('login_page.password')}
          name="password"
          style={{ width: '100%' }}
          rules={[
            { required: true, message: t('please_enter') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  getFieldValue('password')?.length < 4 &&
                  getFieldValue('password')
                ) {
                  return Promise.reject(t('pw_from_4_to_20'));
                }
                if (
                  getFieldValue('password')?.length > 20 &&
                  getFieldValue('password')
                ) {
                  return Promise.reject(t('pw_from_4_to_20'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password className={cx('input')} />
          {/* <Input.Password className={cx('input')} /> */}
        </Form.Item>
      </div>
      <div className={cx('btn-submit')}>
        <Form.Item style={{ width: '100%' }}>
          <Button htmlType="submit" loading={isLoading} className={cx('btn')}>
            {t('login_page.login')}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoginForm;
