import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import BoxInfor from './box-infor';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

export interface IBasicInformationProps {
  staffSelectedState: {
    staffSelected: any;
    setStaffSelected: React.Dispatch<React.SetStateAction<any>>;
  };
  handleClickEventAboutUser: (event: string) => void;
}

const BasicInformation = ({
  staffSelectedState,
  handleClickEventAboutUser,
}: IBasicInformationProps) => {
  const { staffSelected } = staffSelectedState;

  const [staffInfo, setStaffInfo] = useState<any>(staffSelected);

  const getStaffInfo = async () => {
    try {
      setStaffInfo(staffSelected);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (staffSelected?.stf_no) {
      getStaffInfo();
    }
  }, [staffSelected]);

  return (
    <div className={cx('root')}>
      <BoxInfor
        staffIndoState={{ staffInfo, setStaffInfo }}
        handleClickEventAboutUser={handleClickEventAboutUser}
      />
    </div>
  );
};

export default BasicInformation;
