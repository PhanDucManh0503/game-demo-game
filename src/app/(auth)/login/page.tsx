'use client';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import ModalFindID from '@components/auth/modal-find-id';
import ModalFindPassword from '@components/auth/modal-find-password';

import LoginForm from '../../../components/form/login-form';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
  const [openModalFindID, setOpenModalFindID] = useState(false);
  const [openModalFindPW, setOpenModalFindPW] = useState(false);

  return (
    <div className={cx('login-container')}>
      <div className={cx('header')}>
        {/* <Image src={IMAGES.logo} alt="" className={cx('logo')} /> */}
        Live Game
      </div>
      <div className={cx('body')}>
        <LoginForm />
      </div>
      {/* <div className={cx('footer')}>
        <div
          className={cx('btn')}
          // onClick={() => setOpenModalFindID(true)}
        >
          <i className="xi-user-o"></i>
          &nbsp;{t('login_page.find_id')}
        </div>
        <div className={cx('line-vertical')}></div>
        <div
          className={cx('btn')}
          // onClick={() => setOpenModalFindPW(true)}
        >
          <i className="xi-lock-o"></i>
          &nbsp;{t('login_page.find_pw')}
        </div>
      </div> */}
      <div className={cx('bg-top')}></div>
      {openModalFindID && (
        <ModalFindID
          isModalOpen={openModalFindID}
          setIsModalOpen={setOpenModalFindID}
        />
      )}
      {openModalFindPW && (
        <ModalFindPassword
          isModalOpen={openModalFindPW}
          setIsModalOpen={setOpenModalFindPW}
        />
      )}
    </div>
  );
};

export default Login;
