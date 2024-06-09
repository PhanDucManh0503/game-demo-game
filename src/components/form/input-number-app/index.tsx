import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';

const InputNumberApp = (props: InputNumberProps) => {
  return (
    <InputNumber
      controls={false}
      step={''}
      maxLength={16}
      onKeyDown={(e: any) => {
        const key = e?.key;
        const val = e?.target?.value + key;
        if (key === 'ArrowLeft' || key === 'ArrowRight') {
          return true;
        }
        if (val && !/^[0-9,\b]+$/.test(val?.replace('Backspace', '')?.trim())) {
          e?.preventDefault();
          return false;
        }
      }}
      {...props}
      style={{ width: '100%' }}
    />
  );
};

export default InputNumberApp;
