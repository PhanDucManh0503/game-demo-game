'use client';

import { useTranslations } from '@hooks/locales.hook';
import { Modal as ModalAntd, ModalProps } from 'antd';
import classNames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface MyModalProps {
  title: string;
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  okText?: string;
  cancelText?: string;
  children: any;
  className?: string;
  centered?: boolean;
  disableSave?: boolean;
  footer?: any;
}
const Modal = ({
  title,
  open,
  handleOk,
  handleCancel,
  okText = '저장',
  cancelText = '취소',
  children,
  className,
  centered = false,
  disableSave = false,
  ...rest
}: MyModalProps & ModalProps) => {
  const { t } = useTranslations();

  return (
    <div>
      <ModalAntd
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t('save')}
        cancelText={t('cancel')}
        closeIcon={
          <div className={cx('close-icon')}>
            <span>{t('close')}</span>
            <i className="xi-close"></i>
          </div>
        }
        okButtonProps={{
          className: cx(disableSave ? 'btn-disable' : 'btn-ok', 'btn'),
        }}
        cancelButtonProps={{
          className: cx('btn-cancel', 'btn'),
          type: 'primary',
        }}
        {...rest}
        className={cx('modal', `${className}`)}
        centered={centered}
        maskClosable={false}
      >
        <div className={cx('wrapper')}>
          <div className={cx('break-line')}></div>
          {children}
        </div>
      </ModalAntd>
    </div>
  );
};

export default Modal;
