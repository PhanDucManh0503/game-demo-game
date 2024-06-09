'use client';

import { useState } from 'react';
import { Col, ModalProps, Radio, Row } from 'antd';
import classNames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface MyModalProps {
  label: string;
  tooltip?: string;
  options: any[];
  className?: any;
  value?: number;
  col?: number;
  onChange?: (count: number) => void;
}
interface ItemOption {
  value: number;
  title: string;
  description?: string;
}
const GroupRadioVertical = ({
  label,
  tooltip,
  options,
  className,
  value,
  col = 24,
  onChange,
}: MyModalProps & ModalProps) => {
  const [defaultValue, seDefaultValue] = useState(value || options[0]?.id || 0);

  const change = (e: any) => {
    seDefaultValue(e.target.value);
    if (typeof onChange === 'function') {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${className}`}>
      <div className={cx('label-radio')}>
        {label}
        {tooltip ? <div className={cx('tooltip')}>{tooltip}</div> : ''}
      </div>
      <Radio.Group
        onChange={change}
        value={defaultValue}
        style={{ width: '100%' }}
        className={cx('group-radios')}
      >
        <div className={cx('container-radio')}>
          <Row>
            {options?.length
              ? options?.map((item: ItemOption) => {
                  return (
                    <Col span={col} key={item?.title}>
                      <Radio value={item.value} className={cx('item-radio')}>
                        <div
                          className={cx(
                            'title-option',
                            !item?.description ? 'text-666' : '',
                          )}
                        >
                          {item?.title}
                        </div>
                        {item?.description ? (
                          <div className={cx('description-option')}>
                            {item?.description}
                          </div>
                        ) : (
                          ''
                        )}
                      </Radio>
                    </Col>
                  );
                })
              : ''}
          </Row>
        </div>
      </Radio.Group>
    </div>
  );
};

export default GroupRadioVertical;
