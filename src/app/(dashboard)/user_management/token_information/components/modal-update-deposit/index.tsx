'use client';

import { useEffect } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { Col, Form, Input, Row, Select } from 'antd';
import classNames from 'classnames/bind';
import Modal from '@components/common/modal/Modal';
import { REQUEST_STATUS } from '@utils/constants/common.constant';

import styles from './style.module.scss';

const cx = classNames.bind(styles);
interface IModalProps {
  isModalOpen: boolean;
  handleOk: (data: any) => void;
  handleCancel: () => void;
}

const ModalUpdateDeposit = ({
  isModalOpen,
  handleOk,
  handleCancel,
}: IModalProps) => {
  const { t } = useTranslations();

  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.submit();
  };

  const onFinish = (values: any) => {
    const body = {
      ...values,
    };

    handleOk(body);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  return (
    <Modal
      width={640}
      title={t('modal_update_deposit.title')}
      open={isModalOpen}
      handleOk={handleSubmit}
      handleCancel={handleCancel}
      wrapClassName={cx('custom-modal')}
      maskClosable={false}
      centered
    >
      <div className={cx('content')}>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="status"
                label={t('modal_update_deposit.request_status')}
                className={cx('form-item')}
                rules={[
                  {
                    required: true,
                    message: t('please_enter'),
                  },
                ]}
              >
                <Select
                  style={{ width: '100%', height: 40 }}
                  options={[
                    { ...REQUEST_STATUS[2], label: t(REQUEST_STATUS[2].label) },
                    {
                      ...REQUEST_STATUS[3],
                      label: t(REQUEST_STATUS[3].label),
                    },
                  ]}
                  placeholder={t('select')}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="note"
                label={t('modal_update_deposit.note_content')}
                className={cx('form-item')}
                rules={[
                  {
                    required: true,
                    message: t('please_enter'),
                    whitespace: true,
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  maxLength={255}
                  placeholder={t('enter_detail')}
                  style={{ resize: 'none' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalUpdateDeposit;
