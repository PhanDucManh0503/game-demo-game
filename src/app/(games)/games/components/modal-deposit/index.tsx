'use client';

import { useEffect } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { Col, Form, Row } from 'antd';
import classNames from 'classnames/bind';
import Modal from '@components/common/modal/Modal';
import InputNumberApp from '@components/form/input-number-app';

import styles from './style.module.scss';

const cx = classNames.bind(styles);
interface IModalProps {
  isModalOpen: boolean;
  handleOk: (data: any) => void;
  handleCancel: () => void;
}

const ModalRequestDeposit = ({
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
      title={t('modal_deposit.title')}
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
                name="number_token"
                label={t('modal_deposit.number_token')}
                className={cx('form-item')}
                rules={[
                  {
                    required: true,
                    message: t('please_enter'),
                  },
                ]}
              >
                <InputNumberApp placeholder={t('enter_detail')} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalRequestDeposit;
