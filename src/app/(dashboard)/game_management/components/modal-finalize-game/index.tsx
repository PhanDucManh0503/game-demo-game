'use client';

import { useEffect } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { Col, Form, Radio } from 'antd';
import classNames from 'classnames/bind';
import Modal from '@components/common/modal/Modal';

import styles from './style.module.scss';

const cx = classNames.bind(styles);
interface IModalProps {
  isModalOpen: boolean;
  handleOk: (data: any) => void;
  handleCancel: () => void;
}

const ModalFinalizeGame = ({
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
    handleOk(values?.game_result || '');
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
      width={400}
      title={t('finalize_game')}
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
          <Col span={24}>
            <Form.Item
              name="game_result"
              className={cx('risk-measurement')}
              rules={[{ required: true, message: t('please_choose') }]}
            >
              <Radio.Group>
                {[
                  { label: t('green'), value: 'GREEN' },
                  { label: t('red'), value: 'RED' },
                ]?.map((x) => {
                  return (
                    <Col span={24} key={x.value}>
                      <Radio value={x.value} key={x.value}>
                        {x.label}
                      </Radio>
                    </Col>
                  );
                })}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalFinalizeGame;
