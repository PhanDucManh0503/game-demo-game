'use client';

import { useState } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { Col, Form, Input, Row } from 'antd';
import classNames from 'classnames/bind';

import Modal from '../../common/modal/Modal';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

const ModalFindID = ({ isModalOpen, setIsModalOpen }: any) => {
  const { locale, t } = useTranslations();

  const [result, setResult] = useState('');
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setResult('REALONE');
    // setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        width={480}
        title={t('modal_find_id.title')}
        open={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        centered={true}
      >
        <div className={cx('content')}>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row align="middle" gutter={10} className={cx('form-find-id')}>
              <Col span={24}>
                <Form.Item
                  label={t('modal_find_id.institution_number')}
                  name="institution_number"
                  className={cx('item-find-id')}
                  rules={[
                    { required: true, message: t('please_enter') },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !getFieldValue('institution_number')?.trim() &&
                          getFieldValue('institution_number')
                        ) {
                          return Promise.reject(t('please_enter'));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input maxLength={255} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  className={cx('item-find-id')}
                  label={t('modal_find_id.email')}
                  name="email"
                  rules={[
                    { required: true, message: t('please_enter') },
                    {
                      type: 'email',
                      message: t('invalid_email'),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !getFieldValue('email')?.trim() &&
                          getFieldValue('email')
                        ) {
                          return Promise.reject(t('please_enter'));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input maxLength={255} />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center" className={cx('notification')}>
              <Col span={24}>
                <div className={cx('note')}>
                  {!result ? (
                    t('modal_find_id.note_01')
                  ) : (
                    <>
                      {locale === 'en' ? (
                        <>
                          The ID you signed up with is “&nbsp;
                          <span className={cx('special')}>{result}</span>
                          &nbsp;”.
                        </>
                      ) : (
                        <>
                          가입하신 아이디는 “&nbsp;
                          <span className={cx('special')}>{result}</span>&nbsp;”
                          입니다.
                        </>
                      )}
                    </>
                  )}
                </div>
              </Col>
              <Col span={24}>
                <div className={cx('note')}>
                  {!result ? t('modal_find_id.note_02') : '   '}
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalFindID;
