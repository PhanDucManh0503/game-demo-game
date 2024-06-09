import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslations } from '@hooks/locales.hook';
import { Upload } from 'antd';
import classNames from 'classnames/bind';
import { SVGS } from 'public/images';
import Cropper from 'react-easy-crop';
import Modal from '@components/common/modal/Modal';
import { convertBlobUrlToFile, dummyRequestUploadFile } from '@utils/helpers';
import getCroppedImg from '@utils/helpers/cropImage';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface ModalUploadAvatarProps {
  open: boolean;
  handleOk: (file: any) => void;
  handleCancel: () => void;
  avt_path: string;
  avt_nm: string;
}
const ModalUploadAvatar = ({
  open,
  handleOk,
  handleCancel,
  avt_path,
  avt_nm,
}: ModalUploadAvatarProps) => {
  const { t } = useTranslations();
  const [previewImageSrc, setPreviewImageSrc] = useState('');
  const [fileName, setFileName] = useState('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCroppedImage = async () => {
    setIsLoading(true);
    try {
      const croppedImage = await getCroppedImg(
        previewImageSrc,
        croppedAreaPixels,
      );
      const file = await convertBlobUrlToFile(croppedImage, fileName || avt_nm);
      handleOk(file);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeUpload = (e: any) => {
    const previewSrc = URL.createObjectURL(e.file.originFileObj);
    setPreviewImageSrc(previewSrc);
    setFileName(e.file.name);
  };

  useEffect(() => {
    if (avt_path) {
      setPreviewImageSrc(avt_path);
    }
  }, [avt_nm, avt_path]);

  return (
    <Modal
      width={500}
      title={t('register_photo')}
      open={open}
      handleCancel={handleCancel}
      handleOk={() => {
        if (previewImageSrc) {
          handleSaveCroppedImage();
        } else {
          handleCancel();
        }
      }}
      centered
      disableSave={isLoading}
    >
      <div className={cx('content')}>
        <Upload
          listType={previewImageSrc ? 'picture' : 'picture-circle'}
          maxCount={1}
          showUploadList={false}
          onChange={handleChangeUpload}
          className={cx('upload', 'cropper-wrapper', {
            'full-width': previewImageSrc,
          })}
          accept="image/*"
          customRequest={dummyRequestUploadFile}
        >
          {previewImageSrc ? (
            <div className={cx('cropper-wrapper')}>
              <Image
                src={SVGS.UploadAvatarArrowTopLeft}
                alt=""
                className={cx('arrow', 'arrow-top-left')}
              />
              <Image
                src={SVGS.UploadAvatarArrowTopRight}
                alt=""
                className={cx('arrow', 'arrow-top-right')}
                width={20}
                height={20}
              />
              <Image
                src={SVGS.UploadAvatarArrowBottomRight}
                alt=""
                className={cx('arrow', 'arrow-bottom-right')}
              />
              <Image
                src={SVGS.UploadAvatarArrowBottomLeft}
                alt=""
                className={cx('arrow', 'arrow-bottom-left')}
              />
              <div className={cx('cropper')}>
                <Cropper
                  image={previewImageSrc}
                  crop={{ x: 0, y: 0 }}
                  aspect={1 / 1}
                  onCropChange={() => {}}
                  onCropComplete={onCropComplete}
                  // zoom={1.4}
                  cropSize={{ width: 340, height: 340 }}
                  objectFit="cover"
                />
              </div>
            </div>
          ) : (
            <div>
              <PlusOutlined /> <div style={{ marginTop: 8 }}>Select</div>
            </div>
          )}
        </Upload>
      </div>
    </Modal>
  );
};

export default ModalUploadAvatar;
