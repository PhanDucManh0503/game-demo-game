import { useTranslations } from '@hooks/locales.hook';
import { Modal as ModalAntd, ModalProps } from 'antd';
import classNames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface MyModalProps {
  open: boolean;
  children: any;
  handleOk: () => void;
  handleCancel: () => void;
  okText?: string;
  cancelText?: string;
}
const ModalConfirm = ({
  open,
  handleOk,
  handleCancel,
  okText = 'save',
  cancelText = 'cancel',
  children,
  ...rest
}: MyModalProps & ModalProps) => {
  const { t } = useTranslations();
  return (
    <div>
      <ModalAntd
        width={360}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t(`${okText}`)}
        cancelText={t(`${cancelText}`)}
        closeIcon={null}
        okButtonProps={{
          className: cx('btn-ok', 'btn'),
        }}
        cancelButtonProps={{
          className: cx('btn-cancel', 'btn'),
          type: 'primary',
        }}
        {...rest}
      >
        <div className={cx('wrapper')}>{children}</div>
      </ModalAntd>
    </div>
  );
};

export default ModalConfirm;
