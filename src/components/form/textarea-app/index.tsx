import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import classNames from 'classnames/bind';

import styles from './textarea_app.module.scss';

const cx = classNames.bind(styles);

interface ITextareaApp {
  placeholder?: string;
  sx?: any;
}

const TextareaApp = ({ sx = {}, ...props }: ITextareaApp) => {
  return <TextArea className={cx('root')} style={{ ...sx }} {...props} />;
};

export default TextareaApp;
