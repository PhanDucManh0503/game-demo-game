'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import useQueryParams from '@hooks/useQueryParams';
import { useUserStore } from '@stores/user';
import { notification } from 'antd';
import classNames from 'classnames/bind';
import Box from '@components/common/box';
import ModalConfirm from '@components/common/modal-confirm/ModalConfirm';
import TabsApp from '@components/common/tabs-app';

import BasicInformation from './components/basic-information';
import ModalAddNewUser from './components/modal-add-new-user';
import ModalDeposit from './components/modal-deposit';
import PlayHistory from './components/play-history';
import StaffList from './components/staff-list';
import TokenHistory from './components/token-history';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

export const filterRole = [
  {
    label: 'all',
    value: 'ALL',
  },
  {
    label: 'normal_user',
    value: 'NORMAL_USER',
  },
  {
    label: 'admin',
    value: 'ADMIN',
  },
];
export const genderList = [
  {
    label: 'all',
    value: 'ALL',
  },
  {
    label: 'male',
    value: 'M',
  },
  {
    label: 'female',
    value: 'F',
  },
];

const defaultFilter = {
  type: 'ALL',
  search: '',
  page: 1,
};

const dataAddStaff = {
  username: '',
  full_name: '',
  sex_cd: 'M',
  role: 'NORMAL_USER',
  brdt: '',
  pwd: '',
  email_addr: '',
  hp_no: '',
  avt_path: '',
};

const fakeDataUsers = [
  {
    stf_no: 1,
    username: 'thedream',
    full_name: 'Nguyễn Văn A',
    sex_cd: 'M',
    role: 'NORMAL_USER',
    brdt: '1990-05-02',
    pwd: '',
    email_addr: 'thedream@gmail.com',
    hp_no: '0123456789',
    avt_path:
      'https://netstorage-tuko.akamaized.net/images/9c3151cb82df4876.jpg?imwidth=900',
    total_token: 1000000,
    number_play: 500,
    number_win: 300,
  },
  {
    stf_no: 2,
    username: 'yoursky',
    full_name: 'Nguyễn Văn B',
    sex_cd: 'M',
    role: 'NORMAL_USER',
    brdt: '1995-10-05',
    pwd: '',
    email_addr: 'yoursky@gmail.com',
    hp_no: '0987654321',
    avt_path:
      'https://ygo-assets-entities-us.yougov.net/2b0fde34-2d07-11e6-a4bd-71dbf5f2854a.jpg',
    total_token: 999000000,
    number_play: 999,
    number_win: 888,
  },
];

export const TEXT_EVENT_USER = {
  BLOCK: {
    label: 'confirm_block_user',
    value: 'BLOCK',
  },
  UNBLOCK: {
    label: 'confirm_unblock_user',
    value: 'UNBLOCK',
  },
  DELETE: {
    label: 'confirm_delete_user',
    value: 'DELETE',
  },
  EDIT: {
    label: '',
    value: 'EDIT',
  },
  DEPOSIT: {
    label: '',
    value: 'DEPOSIT',
  },
};

const Page = () => {
  const { t } = useTranslations();
  const { user, updateUser } = useUserStore();
  const { queryParams, setQueryParams } = useQueryParams();

  const [modalAddStaff, setModalAddStaff] = useState<boolean>(false);
  const [isUpdateStaff, setIsUpdateStaff] = useState<boolean>(false);

  const [isHaveData, setIsHaveData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [staffSelected, setStaffSelected] = useState<any>({});
  const [staffList, setStaffList] = useState<any>({
    count: 0,
    rows: [],
  });
  const [staffFilter, setStaffFilter] = useState<any>(defaultFilter);
  const [tabSelected, setTabSelected] = useState<string>(
    queryParams.tab || 'BASIC_INFORMATION',
  );

  const handleLoadMore = () => {
    setStaffFilter({
      ...staffFilter,
      page: staffFilter?.page + 1,
    });
  };
  const [eventAddStaff, setEventAddStaff] = useState<boolean>(false);
  console.log(eventAddStaff);

  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [openModalDeposit, setOpenModalDeposit] = useState<boolean>(false);
  const [textConfirm, setTextConfirm] = useState<string>('');

  const handleChangeTab = (activeKey: string) => {
    setTabSelected(activeKey);
    setQueryParams({
      tab: activeKey,
    });
  };

  const getStaffList = async (event?: string) => {
    try {
      setStaffList({
        count: 2,
        rows: fakeDataUsers,
      });
      setStaffSelected(fakeDataUsers?.[0]);
      setIsHaveData(true);
      // if (staffFilter?.page === 1) await setIsLoading(true);
      // const params: any = {
      //   limit: 10,
      //   page: staffFilter?.page,
      // };
      // if (staffFilter.type !== 'ALL') {
      //   params.workStatusCode = staffFilter.type;
      // } else {
      //   delete params.workStatusCode;
      // }
      // if (staffFilter.search) {
      //   params.name = staffFilter.search;
      // }
      // // const res: any = await StaffAPI.getListStaff(params);
      // const res: any = {};
      // setStaffList({
      //   count: res?.totalElements,
      //   rows:
      //     staffFilter?.page === 1
      //       ? res?.content
      //       : staffList?.rows?.concat(res?.content),
      // });
      // if (
      //   (staffFilter === defaultFilter &&
      //     (!staffSelected?.stf_no || eventAddStaff)) ||
      //   event === 'addNewStaff'
      // ) {
      //   setStaffSelected(res?.content?.[0]);
      //   if (eventAddStaff) setEventAddStaff(false);
      // }
      // if (
      //   staffFilter.type === 'ALL' &&
      //   staffFilter.page === 1 &&
      //   staffFilter.search === ''
      // ) {
      //   if (res?.content?.length) {
      //     setIsConnected(true);
      //   } else {
      //     setIsConnected(false);
      //   }
      // }
      // if (!isHaveData && res?.totalElements > 0) setIsHaveData(true);
    } catch (error) {
      console.log('🚀 ~ file: page.tsx:113 ~ error:', error);
    } finally {
      await setIsLoading(false);
    }
  };

  const handleSubmitAddStaff = async (body: any) => {
    try {
      if (isUpdateStaff) {
        // const res: any = await StaffAPI.updateStaff(
        //   staffSelected?.stf_no || '',
        //   body,
        // );
        const res: any = {};
        if (user?.stf_no === res.stf_no) {
          updateUser(res);
        }

        setStaffSelected(res);
        const index = staffList?.rows?.findIndex(
          (x: any) => x.stf_no === res?.stf_no,
        );
        if (index >= 0) {
          const temp = staffList.rows;
          temp[index] = res;
          setStaffList({
            ...staffList,
            rows: temp,
          });
        }

        setIsUpdateStaff(false);
      } else {
        // await StaffAPI.addStaff(body);
        if (staffFilter !== defaultFilter) {
          setEventAddStaff(true);
          setStaffFilter(defaultFilter);
        } else {
          await getStaffList('addNewStaff');
        }
      }

      setModalAddStaff(false);
      notification.success({ message: t('success') });
    } catch (err: any) {
      if (err?.code) {
        notification.error({ message: t(`error_code.${[err?.code]}`) });
      } else {
        notification.error({ message: '실패했습니다' });
      }
    }
  };

  const handleCancelAddStaff = () => {
    setModalAddStaff(false);
    if (isUpdateStaff) {
      setIsUpdateStaff(false);
    }
  };

  const handleUpdateSelectedStaff = async () => {
    try {
      // const res: any = await StaffAPI.getDetailStaff(
      //   staffSelected?.stf_no || '',
      // );
      const res: any = {};
      setStaffSelected(res);
      const index = staffList?.rows?.findIndex(
        (x: any) => x.stf_no === res?.stf_no,
      );
      if (index >= 0) {
        const temp = staffList.rows;
        temp[index] = res;
        setStaffList({
          ...staffList,
          rows: temp,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickEventAboutUser = (event: string) => {
    if (event) {
      if (event === TEXT_EVENT_USER.EDIT.value) {
        setModalAddStaff(true);
        setIsUpdateStaff(true);
      } else if (event === TEXT_EVENT_USER.DEPOSIT.value) {
        setOpenModalDeposit(true);
      } else {
        setOpenModalConfirm(true);
        setTextConfirm(
          TEXT_EVENT_USER[event as keyof typeof TEXT_EVENT_USER].value,
        );
      }
    }
  };

  const handleAcceptEventAboutUser = async () => {
    try {
      if (textConfirm === TEXT_EVENT_USER.BLOCK.value) {
        console.log('khiem');
      }
      if (textConfirm === TEXT_EVENT_USER.UNBLOCK.value) {
        console.log('khiem');
      }
      if (textConfirm === TEXT_EVENT_USER.DELETE.value) {
        console.log('khiem');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setOpenModalConfirm(false);
      setTextConfirm('');
    }
  };
  const handleAcceptDeposit = async () => {
    try {
      handleUpdateSelectedStaff();
      setOpenModalDeposit(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancelConfirm = () => {
    setOpenModalConfirm(false);
    setTextConfirm('');
  };

  const tabsList = [
    {
      label: t('user_basic_information'),
      key: 'BASIC_INFORMATION',
      children: (
        <BasicInformation
          staffSelectedState={{ staffSelected, setStaffSelected }}
          handleClickEventAboutUser={handleClickEventAboutUser}
        />
      ),
    },
    {
      label: t('user_play_history'),
      key: 'USER_PLAY_HISTORY',
      children: (
        <PlayHistory staffSelected={staffSelected} tabSelected={tabSelected} />
      ),
    },
    {
      label: t('user_token_history'),
      key: 'USER_TOKEN_HISTORY',
      children: (
        <TokenHistory staffSelected={staffSelected} tabSelected={tabSelected} />
      ),
    },
  ];

  useEffect(() => {
    getStaffList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffFilter]);

  useEffect(() => {
    if (staffSelected) {
      const isJob = staffSelected?.fclt_orgn_tkjs?.some(
        (item: any) =>
          item?.tkj_dv_cd === 'CENTER_DIRECTOR' ||
          item?.tkj_dv_cd === 'SOCIAL_WORKER',
      );
      if (!isJob && tabSelected === 'ATTENDANCE_MANAGEMENT') {
        setTabSelected('BASIC_INFORMATION');
      }
    }
  }, [staffSelected]);

  return (
    <div className={cx('root')}>
      <StaffList
        isLoading={isLoading}
        staffListState={{ staffList, setStaffList }}
        staffSelectedState={{ staffSelected, setStaffSelected }}
        staffFilterState={{ staffFilter, setStaffFilter }}
        modalRegisterState={{ modalAddStaff, setModalAddStaff }}
        handleLoadMore={handleLoadMore}
      />
      {isHaveData ? (
        <div className={cx('detail')}>
          <TabsApp
            id="staffDetail"
            items={tabsList}
            activeKey={tabSelected}
            onChange={handleChangeTab}
            showDocsList={true}
          />
        </div>
      ) : (
        <div className={cx('no-data')}>
          <Box>
            <div className={cx('content')}></div>
          </Box>
        </div>
      )}
      <ModalAddNewUser
        defaultData={isUpdateStaff ? staffSelected : dataAddStaff}
        isModalOpen={modalAddStaff}
        isUpdate={isUpdateStaff}
        handleSubmitAddStaff={handleSubmitAddStaff}
        handleCancelAddStaff={handleCancelAddStaff}
      />
      <ModalConfirm
        open={openModalConfirm}
        handleCancel={handleCancelConfirm}
        handleOk={handleAcceptEventAboutUser}
        centered
      >
        <p className={cx('text-confirm')}>
          {t(
            `${TEXT_EVENT_USER[textConfirm as keyof typeof TEXT_EVENT_USER]
              ?.label}`,
          )}
        </p>
      </ModalConfirm>
      <ModalDeposit
        isModalOpen={openModalDeposit}
        handleCancel={() => setOpenModalDeposit(false)}
        handleOk={handleAcceptDeposit}
      />
    </div>
  );
};

export default Page;
