'use client';

import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslations } from '@hooks/locales.hook';
import {
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import classNames from 'classnames/bind';
import Modal from '@components/common/modal/Modal';
import InputNumberApp from '@components/form/input-number-app';
import { GAME_TYPES } from '@utils/constants/common.constant';

import styles from './style.module.scss';

const cx = classNames.bind(styles);
interface IModalProps {
  isModalOpen: boolean;
  handleOk: (data: any) => void;
  handleCancel: () => void;
}

const ModalAddGame = ({ isModalOpen, handleOk, handleCancel }: IModalProps) => {
  const { t } = useTranslations();

  const [form] = Form.useForm();

  const game_type = Form.useWatch('game_type', form);
  const liveStreamLink = Form.useWatch('liveStreamLink', form);

  const [fileGreenList, setFileGreenList] = useState<UploadFile[]>([]);
  const [fileRedList, setFileRedList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleSubmit = () => {
    form.submit();
  };

  const onFinish = (values: any) => {
    const body = {
      ...values,
      avatarGreen:
        fileGreenList[0] ||
        'https://png.pngtree.com/png-vector/20230415/ourmid/pngtree-rooster-logo-vector-png-image_6705895.png',
      avatarRed:
        fileRedList[0] ||
        'https://png.pngtree.com/png-vector/20230415/ourmid/pngtree-rooster-logo-vector-png-image_6705895.png',
    };

    handleOk(body);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
      form.setFieldValue('game_type', GAME_TYPES[1].value);
      form.setFieldValue('maxBetPercentage', 20);
      form.setFieldValue('betPercentage_green', 80);
      form.setFieldValue('betPercentage_red', 100);
    }
    setFileGreenList([]);
    setFileRedList([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as any);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChangeGreen: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => setFileGreenList(newFileList);
  const handleChangeRed: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => setFileRedList(newFileList);
  return (
    <Modal
      width={640}
      title={t('modal_add_game.title')}
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
                name="game_type"
                label={t('modal_add_game.game_type')}
                className={cx('form-item')}
                rules={[
                  {
                    required: true,
                    message: t('please_enter'),
                  },
                ]}
              >
                <Select
                  className={cx('height-40')}
                  options={[
                    { ...GAME_TYPES[1], label: t(GAME_TYPES[1].label) },
                    {
                      ...GAME_TYPES[2],
                      label: t(GAME_TYPES[2].label),
                    },
                    { ...GAME_TYPES[3], label: t(GAME_TYPES[3].label) },
                    {
                      ...GAME_TYPES[4],
                      label: t(GAME_TYPES[4].label),
                    },
                    { ...GAME_TYPES[5], label: t(GAME_TYPES[5].label) },
                  ]}
                  placeholder={t('select')}
                />
              </Form.Item>
            </Col>
            {game_type === GAME_TYPES[1].value ? (
              <>
                <Col span={24}>
                  <Form.Item
                    name="liveStreamLink"
                    label={t('modal_add_game.live_link')}
                    className={cx('form-item')}
                    rules={[
                      {
                        required: true,
                        message: t('please_enter'),
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input
                      maxLength={255}
                      className={cx('height-40')}
                      placeholder={t('enter_detail')}
                    />
                  </Form.Item>
                </Col>
                {liveStreamLink?.trim() ? (
                  <Col span={24}>
                    <iframe
                      style={{ width: '100%', height: '300px' }}
                      src={liveStreamLink}
                    ></iframe>
                  </Col>
                ) : (
                  ''
                )}
                <Col span={24}>
                  <Form.Item
                    name="baseAmt"
                    label={t('modal_add_game.initial_value')}
                    className={cx('form-item')}
                    rules={[
                      {
                        required: true,
                        message: t('please_enter'),
                      },
                    ]}
                  >
                    <InputNumberApp
                      className={cx('height-40')}
                      maxLength={16}
                      placeholder={t('enter_detail')}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="maxBetPercentage"
                    label={t('modal_add_game.odds_ratio')}
                    className={cx('form-item')}
                    rules={[
                      {
                        required: true,
                        message: t('please_enter'),
                      },
                    ]}
                  >
                    <InputNumberApp
                      className={cx('height-40')}
                      maxLength={3}
                      placeholder={t('enter_detail')}
                      max={20}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} className={cx('label')}>
                  {t('modal_add_game.odds')}
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="betPercentage_green"
                    label={t('green')}
                    className={cx('form-item')}
                    rules={[
                      {
                        required: true,
                        message: t('please_enter'),
                      },
                    ]}
                  >
                    <InputNumberApp
                      className={cx('height-40')}
                      maxLength={16}
                      placeholder={t('enter_detail')}
                      max={100}
                      min={1}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Row
                    justify="center"
                    align="middle"
                    style={{ paddingTop: '35px' }}
                  >
                    /
                  </Row>
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="betPercentage_red"
                    label={t('red')}
                    className={cx('form-item')}
                    rules={[
                      {
                        required: true,
                        message: t('please_enter'),
                      },
                    ]}
                  >
                    <InputNumberApp
                      className={cx('height-40')}
                      maxLength={16}
                      placeholder={t('enter_detail')}
                      max={100}
                      min={1}
                    />
                  </Form.Item>
                </Col>
                {/* <Col span={24} className={cx('label')}>
                  {t('modal_add_game.more_information')}
                </Col> */}
                <Col span={24}>
                  <Row gutter={[20, 20]}>
                    <Col span={24} sm={12}>
                      <Row gutter={[5, 5]} style={{ width: '100%' }}>
                        <Col span={24} style={{ width: '100%', height: 110 }}>
                          <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            fileList={fileGreenList}
                            onPreview={handlePreview}
                            onChange={handleChangeGreen}
                          >
                            {fileGreenList?.length ? (
                              ''
                            ) : (
                              <button
                                style={{ border: 0, background: 'none' }}
                                type="button"
                              >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                              </button>
                            )}
                          </Upload>
                        </Col>
                        <Col span={24} style={{ width: '100%' }}>
                          <Form.Item
                            name="description_green"
                            className={cx('form-item')}
                            rules={[
                              {
                                required: true,
                                message: t('please_enter'),
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
                    </Col>
                    <Col span={24} sm={12}>
                      <Row gutter={[5, 5]} style={{ width: '100%' }}>
                        <Col span={24} style={{ width: '100%', height: 110 }}>
                          <Row>
                            <Upload
                              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                              listType="picture-card"
                              fileList={fileRedList}
                              onPreview={handlePreview}
                              onChange={handleChangeRed}
                            >
                              {fileRedList?.length ? (
                                ''
                              ) : (
                                <button
                                  style={{ border: 0, background: 'none' }}
                                  type="button"
                                >
                                  <PlusOutlined />
                                  <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                              )}
                            </Upload>
                          </Row>
                        </Col>
                        {previewImage && (
                          <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                              visible: previewOpen,
                              onVisibleChange: (visible) =>
                                setPreviewOpen(visible),
                              afterOpenChange: (visible) =>
                                !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                          />
                        )}
                        <Col span={24} style={{ width: '100%' }}>
                          <Form.Item
                            name="description_red"
                            className={cx('form-item')}
                            rules={[
                              {
                                required: true,
                                message: t('please_enter'),
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
                    </Col>
                  </Row>
                </Col>
              </>
            ) : (
              ''
            )}
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalAddGame;
