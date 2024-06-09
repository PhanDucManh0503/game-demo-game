'use client';

import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import { Button, DatePicker, Space } from 'antd';
import { DatePickerProps } from 'antd/lib';
import classNames from 'classnames/bind';
import dayjs, { Dayjs } from 'dayjs';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface DatePickerYearMonthProps {
  type: 'year' | 'year-month';
  onChangeDatePicker: (date: Dayjs | null | undefined) => void;
  sxBtn?: any;
  sxInput?: any;
}
const DatePickerYearMonth = ({
  type,
  onChangeDatePicker,
  sxBtn,
  sxInput,
}: DatePickerYearMonthProps) => {
  const [value, setValue] = useState<Dayjs | null | undefined>(dayjs());

  const dateFormat = type === 'year' ? 'YYYY년' : 'YYYY년 MM월';

  const customFormat: DatePickerProps['format'] = (value) =>
    `${value.format(dateFormat)}`;

  const onChange: DatePickerProps['onChange'] = (date) => {
    setValue(date);
    onChangeDatePicker(date);
  };

  const handlePrev = () => {
    if (type === 'year') {
      setValue(value?.subtract(1, 'year'));
      onChangeDatePicker(value?.subtract(1, 'year'));
    } else {
      setValue(value?.subtract(1, 'month'));
      onChangeDatePicker(value?.subtract(1, 'month'));
    }
  };

  const handleNext = () => {
    if (type === 'year') {
      setValue(value?.add(1, 'year'));
      onChangeDatePicker(value?.add(1, 'year'));
    } else {
      setValue(value?.add(1, 'month'));
      onChangeDatePicker(value?.add(1, 'month'));
    }
  };

  return (
    <Space.Compact
      style={{
        height: '36px',
        borderRadius: '6px',
      }}
    >
      <Button
        key="1"
        type="primary"
        onClick={handlePrev}
        className={cx('btn', 'btn-prev')}
        style={sxBtn}
      >
        <Icon component={() => <i className="xi-angle-left"></i>}></Icon>
      </Button>
      <div className={cx('date-picker')} style={{ ...sxInput }}>
        <DatePicker
          onChange={onChange}
          picker={type === 'year' ? 'year' : 'month'}
          format={customFormat}
          style={{
            height: '36px',
          }}
          suffixIcon={<div></div>}
          inputReadOnly
          allowClear={false}
          value={value}
        />
      </div>

      <Button
        key="1"
        type="primary"
        onClick={handleNext}
        className={cx('btn', 'btn-next')}
        style={sxBtn}
      >
        <Icon component={() => <i className="xi-angle-right"></i>}></Icon>
      </Button>
    </Space.Compact>
  );
};

export default DatePickerYearMonth;
