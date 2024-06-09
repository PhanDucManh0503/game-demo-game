'use client';

import { useEffect } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { Form, Input } from 'antd';
import classNames from 'classnames/bind';
import Modal from '@components/common/modal/Modal';

import styles from './style.module.scss';

const cx = classNames.bind(styles);
interface IModalProps {
  isModalOpen: boolean;
  handleSubmit: (data: string) => void;
  handleCancel: () => void;
}
type FieldType = {
  newPassword?: string;
  confirmNewPassword?: string;
};
const ModalChangePW = ({
  isModalOpen,
  handleSubmit,
  handleCancel,
}: IModalProps) => {
  const { t } = useTranslations();
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    handleSubmit(values?.newPassword || '');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  }, [isModalOpen]);

  return (
    <Modal
      width={640}
      title={t('user_change_pw')}
      open={isModalOpen}
      handleCancel={handleCancel}
      handleOk={handleOk}
      centered
    >
      <div className={cx('content')}>
        <Form
          name="basic"
          style={{ width: '100%' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          scrollToFirstError
          form={form}
        >
          <div className={cx('page-container')}>
            <Form.Item<FieldType>
              label={t('user_new_pw')}
              name="newPassword"
              style={{ width: '100%' }}
              rules={[
                { required: true, message: t('please_enter') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue('newPassword')?.length < 4 &&
                      getFieldValue('newPassword')
                    ) {
                      return Promise.reject(t('pw_from_4_to_20'));
                    }
                    if (
                      getFieldValue('newPassword')?.length > 20 &&
                      getFieldValue('newPassword')
                    ) {
                      return Promise.reject(t('pw_from_4_to_20'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                className={cx('input')}
                placeholder={t('enter_new_pw')}
                onKeyDown={(e: any) => {
                  const key = e?.key;
                  if (key === ' ') {
                    e?.preventDefault();
                    return false;
                  }
                }}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label=""
              name="confirmNewPassword"
              style={{ width: '100%' }}
              rules={[
                { required: true, message: t('please_enter') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue('confirmNewPassword')?.length < 4 &&
                      getFieldValue('confirmNewPassword')
                    ) {
                      return Promise.reject(t('pw_from_4_to_20'));
                    }
                    if (
                      getFieldValue('confirmNewPassword')?.length > 20 &&
                      getFieldValue('confirmNewPassword')
                    ) {
                      return Promise.reject(t('pw_from_4_to_20'));
                    }
                    if (
                      getFieldValue('newPassword') &&
                      getFieldValue('confirmNewPassword') &&
                      getFieldValue('newPassword') !=
                        getFieldValue('confirmNewPassword')
                    ) {
                      return Promise.reject(t('new_pw_not_match'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                className={cx('input')}
                placeholder={t('confirm_new_pw')}
                onKeyDown={(e: any) => {
                  const key = e?.key;
                  if (key === ' ') {
                    e?.preventDefault();
                    return false;
                  }
                }}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalChangePW;
