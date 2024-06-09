'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import useUpload from '@hooks/useUpload';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
  Upload,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import ButtonApp from '@components/common/button-app';
import Modal from '@components/common/modal/Modal';
import { subFileName } from '@utils/functions/common.function';

import ModalChangePW from '../modal-change-password-staff';
import ModalUploadAvatar from '../modal-upload-avatar';
import styles from './style.module.scss';

const cx = classNames.bind(styles);
interface IModalAddStaffProps {
  defaultData: any;
  isUpdate: boolean;
  isModalOpen: boolean;
  handleSubmitAddStaff: (data: any) => void;
  handleCancelAddStaff: () => void;
}

const ModalAddNewUser = ({
  defaultData,
  isModalOpen,
  isUpdate,
  handleSubmitAddStaff,
  handleCancelAddStaff,
}: IModalAddStaffProps) => {
  console.log(defaultData);
  const { t } = useTranslations();
  const { uploadFile } = useUpload();

  const [avatar, setAvatar] = useState<any>(null);

  // const [password, setPassword] = useState('');
  // const [inputPw, setInputPW] = useState(false);

  const [isOpenModalUploadAvatar, setIsOpenModalUploadAvatar] =
    useState<boolean>(false);

  const [openModalChangePW, setOpenModalChangePW] = useState<boolean>(false);

  const [form] = Form.useForm();
  const avt_path = Form.useWatch('avt_path', form);

  // const phone = Form.useWatch('hp_no', form);

  const handleOk = () => {
    form.submit();
  };

  const onFinish = (values: any) => {
    const body = {
      ...values,
      avt_nm: form.getFieldValue('avt_nm') || '',
    };
    if (values?.brdt) {
      body.brdt = dayjs(values?.brdt).format('YYYY-MM-DD');
    } else {
      delete body.brdt;
    }
    if (values?.hp_no?.startsWith('+')) {
      body.hp_no = values.hp_no.slice(1, values.hp_no.length);
    }
    handleSubmitAddStaff(body);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleOpenModalUploadAvatar = () => {
    setIsOpenModalUploadAvatar(true);
  };

  const handleCloseModalUploadAvatar = () => {
    setIsOpenModalUploadAvatar(false);
  };
  const handleSetAvatar = async (file: any) => {
    setAvatar(file);
    await uploadFile([file], null, (isSuccess: boolean, files: any) => {
      if (isSuccess) {
        form.setFieldValue('avt_path', files?.[0]?.file_path);
        form.setFieldValue('avt_nm', files?.[0]?.file_name);
        handleCloseModalUploadAvatar();
      } else {
        notification.error({ message: t('failed') });
      }
    });
  };

  const disabledBirthday: RangePickerProps['disabledDate'] = (current) => {
    return current && current >= dayjs();
  };

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        ...defaultData,
        brdt: defaultData?.brdt ? dayjs(defaultData?.brdt) : '',
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const onKeyDownDatePicker = (e: any, field: string, required: boolean) => {
    if (
      e?.key === 'Backspace' &&
      (!e?.target?.value ||
        e?.target?.value?.length === 1 ||
        e?.target?.value?.length === 10)
    ) {
      form.setFields([
        {
          name: field,
          errors: required ? [t('please_enter')] : [],
          value: '',
        },
      ]);
    }
  };
  const handleSubmitChangePW = (pw: string) => {
    form.setFieldValue('pwd', pw);
    setOpenModalChangePW(false);
  };

  return (
    <Modal
      width={1030}
      title={
        isUpdate
          ? t('modal_add_new_user.title_update')
          : t('modal_add_new_user.title_add')
      }
      open={isModalOpen}
      handleCancel={handleCancelAddStaff}
      handleOk={handleOk}
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
          scrollToFirstError
        >
          <Row align="middle" style={{ marginTop: '20px' }} gutter={[10, 10]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={t('username')}
                name="username"
                className={cx('item-staff')}
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
                <Input maxLength={20} placeholder={t('enter_detail')} />
              </Form.Item>
            </Col>{' '}
            <Col
              xs={isUpdate ? 20 : 24}
              sm={isUpdate ? 9 : 12}
              md={isUpdate ? 6 : 8}
            >
              <Form.Item
                label={t('password')}
                name="pwd"
                className={cx('item-staff')}
                rules={[
                  {
                    required: isUpdate ? false : true,
                    message: t('please_enter'),
                  },

                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        getFieldValue('pwd') &&
                        (getFieldValue('pwd')?.length < 4 ||
                          getFieldValue('pwd')?.length > 20)
                      ) {
                        return Promise.reject(t('pw_from_4_to_20'));
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                {isUpdate && !form.getFieldValue('pwd') ? (
                  <Input.Password
                    maxLength={255}
                    className={cx('password')}
                    readOnly={isUpdate}
                    disabled={true}
                    placeholder={'******'}
                  />
                ) : (
                  <Input.Password
                    maxLength={255}
                    readOnly={isUpdate}
                    placeholder={t('enter_detail')}
                    onKeyDown={(e: any) => {
                      const key = e?.key;
                      if (key === ' ') {
                        e?.preventDefault();
                        return false;
                      }
                    }}
                    // onChange={(e) => {
                    //   setPassword(e?.target?.value);
                    //   setInputPW(true);
                    // }}
                  />
                )}
              </Form.Item>
            </Col>
            {isUpdate ? (
              <Col xs={4} sm={3} md={2}>
                <ButtonApp
                  title={t('change')}
                  onClick={() => setOpenModalChangePW(true)}
                />
              </Col>
            ) : (
              ''
            )}
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={t('role')}
                name="role"
                className={cx('item-staff')}
                rules={[{ required: true, message: t('please_enter') }]}
              >
                <Select
                  defaultValue="NORMAL_USER"
                  options={[
                    { value: 'NORMAL_USER', label: t('normal_user') },
                    { value: 'ADMIN', label: t('admin') },
                  ]}
                  placeholder={t('select')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={t('full_name')}
                name="full_name"
                className={cx('item-staff')}
                rules={[
                  { required: true, message: t('please_enter') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !getFieldValue('full_name')?.trim() &&
                        getFieldValue('full_name')
                      ) {
                        return Promise.reject(t('please_enter'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input maxLength={20} placeholder={t('enter_detail')} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={t('gender')}
                name="sex_cd"
                className={cx('item-staff')}
                rules={[{ required: true, message: t('please_enter') }]}
              >
                <Select
                  defaultValue="M"
                  options={[
                    { value: 'M', label: t('male') },
                    { value: 'F', label: t('female') },
                  ]}
                  placeholder={t('select')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={t('birthday')}
                name="brdt"
                className={cx('item-staff')}
              >
                <DatePicker
                  suffixIcon={<i className="xi-calendar" />}
                  allowClear={false}
                  style={{
                    width: '100%',
                  }}
                  placeholder={t('select')}
                  className={cx('date-picker')}
                  disabledDate={disabledBirthday}
                  onKeyDown={(e) => onKeyDownDatePicker(e, 'brdt', true)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                className={cx('item-staff')}
                label={t('email')}
                name="email_addr"
                rules={[
                  { required: true, message: t('please_enter') },
                  {
                    type: 'email',
                    message: t('invalid_email'),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !getFieldValue('email_addr')?.trim() &&
                        getFieldValue('email_addr')
                      ) {
                        return Promise.reject(t('please_enter'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input maxLength={60} placeholder={t('enter_detail')} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={t('phone')}
                name="hp_no"
                className={cx('item-staff')}
                rules={[
                  { required: true, message: t('please_enter') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !getFieldValue('hp_no')?.trim() &&
                        getFieldValue('hp_no')
                      ) {
                        return Promise.reject(t('please_enter'));
                      }
                      return Promise.resolve();
                    },
                  }),
                  {
                    pattern: /^[+-]?\d(?!.*[A-Za-z])\d{9,15}$/,
                    message: t('invalid_phone'),
                  },
                ]}
              >
                <Input maxLength={15} placeholder={t('enter_detail')} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                label={t('avatar')}
                name="avt_path"
                className={cx('item-staff')}
              >
                <Upload disabled maxCount={1} showUploadList={false}>
                  <Input
                    addonAfter={
                      <Button
                        style={{
                          height: '44px',
                          color: '#999',
                          border: '0',
                        }}
                        onClick={handleOpenModalUploadAvatar}
                      >
                        {t('file_selection')}
                      </Button>
                    }
                    style={{ width: '100%' }}
                    readOnly
                    value={
                      avt_path
                        ? typeof avt_path === 'string'
                          ? avatar?.name ||
                            form.getFieldValue('avt_nm') ||
                            subFileName(avt_path)
                          : 'Uploading....'
                        : t('no_attached_file')
                    }
                    onClick={handleOpenModalUploadAvatar}
                    suffix={
                      avt_path && typeof avt_path === 'string' ? (
                        <i
                          className="xi-close"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setAvatar(null);
                            form.setFieldValue('avt_path', '');
                            form.setFieldValue('avt_nm', '');
                          }}
                        />
                      ) : null
                    }
                  />
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <ModalUploadAvatar
          open={isOpenModalUploadAvatar}
          handleCancel={handleCloseModalUploadAvatar}
          handleOk={handleSetAvatar}
          avt_nm={
            avatar?.name ||
            form.getFieldValue('avt_nm') ||
            subFileName(avt_path)
          }
          avt_path={avt_path}
        />
      </div>
      <ModalChangePW
        isModalOpen={openModalChangePW}
        handleSubmit={handleSubmitChangePW}
        handleCancel={() => setOpenModalChangePW(false)}
      />
    </Modal>
  );
};

export default ModalAddNewUser;
