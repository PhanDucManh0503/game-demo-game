'use client';

import { Modal as ModalAntd, ModalProps, Row } from 'antd';
import classNames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface ModalResultProps {
  open: boolean;
  handleOk: () => void;
  okText?: string;
  children: any;
  className?: string;
  centered?: boolean;
  closable?: boolean;
}
const ModalResult: any = ({
  title,
  open,
  handleOk,
  okText = '닫기',
  children,
  className,
  centered = false,
  closable = false,
  ...rest
}: ModalResultProps & ModalProps) => {
  return (
    <div>
      <ModalAntd
        open={open}
        className={cx('modal', `${className}`)}
        centered={centered}
        closable={closable}
        footer={
          <Row className={cx('btn-close')} onClick={handleOk}>
            {okText}
          </Row>
        }
        {...rest}
      >
        <div className={cx('wrapper')}>{children}</div>
      </ModalAntd>
    </div>
  );
};

export default ModalResult;
