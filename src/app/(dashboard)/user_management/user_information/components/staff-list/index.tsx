import React, { useEffect } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import { Form } from 'antd';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import Box from '@components/common/box';
import ButtonApp from '@components/common/button-app';
import LoadMore from '@components/common/load-more';
import InputApp from '@components/form/input-app';

import { filterRole } from '../../page';
import StaffItem from '../staff-item';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface IStaffListProps {
  isLoading: boolean;

  staffListState: {
    staffList: any;
    setStaffList: React.Dispatch<React.SetStateAction<any>>;
  };
  staffSelectedState: {
    staffSelected: any;
    setStaffSelected: React.Dispatch<React.SetStateAction<any>>;
  };
  staffFilterState: {
    staffFilter: any;
    setStaffFilter: React.Dispatch<React.SetStateAction<any>>;
  };
  modalRegisterState: {
    modalAddStaff: boolean;
    setModalAddStaff: React.Dispatch<React.SetStateAction<boolean>>;
  };
  handleLoadMore: () => void;
  buttonGroup?: boolean;
  filterGroup?: boolean;
}

const StaffList = ({
  isLoading,
  staffListState,
  staffSelectedState,
  staffFilterState,
  modalRegisterState,
  handleLoadMore,
  buttonGroup = true,
  filterGroup = true,
}: IStaffListProps) => {
  const { t } = useTranslations();
  const { staffList } = staffListState;
  const { staffSelected, setStaffSelected } = staffSelectedState;
  const { staffFilter, setStaffFilter } = staffFilterState;
  const { setModalAddStaff } = modalRegisterState;

  const [form] = Form.useForm();
  const keyword = Form.useWatch('search', form);

  const handleChangeTypeFilter = (value: any) => {
    setStaffFilter({ ...staffFilter, page: 1, type: value?.value || '' });
  };
  const handleSubmitSearch = (value: any) => {
    setStaffFilter({ ...staffFilter, page: 1, search: value?.search || '' });
  };

  useEffect(() => {
    if (!keyword?.length && staffFilter.search != '') {
      form.submit();
    }
  }, [keyword]);

  return (
    <div className={cx('root')}>
      {buttonGroup && (
        <div className={cx('button-group')}>
          <ButtonApp
            title={t('new_user')}
            icon={<i className="xi-user-plus-o xi-x"></i>}
            className="bg-primary text-17 rounded shadow btn-icon"
            onClick={() => setModalAddStaff(true)}
          />
        </div>
      )}

      <Box sx={{ height: '700px' }}>
        <div className={cx('staff-filter')}>
          {filterGroup && (
            <div className={cx('filter-groups')}>
              {filterRole?.map((x: any) => {
                return (
                  <div
                    key={x?.value}
                    className={cx(
                      'filter-item',
                      staffFilter.type === x?.value && 'filter-active',
                    )}
                    onClick={() => handleChangeTypeFilter({ value: x?.value })}
                  >
                    {t(`${x?.label}`)}
                  </div>
                );
              })}
            </div>
          )}
          <Form
            form={form}
            className={cx('search-box')}
            onFinish={handleSubmitSearch}
            scrollToFirstError
          >
            <Form.Item name="search">
              <InputApp sx={{ flex: 1 }} placeholder={t('enter_detail')} />
            </Form.Item>
            <ButtonApp
              type="submit"
              title={t('search')}
              sx={{ width: '91.7px' }}
            />
          </Form>
        </div>

        <div
          id="scrollableStaff"
          className={cx('staff-list')}
          style={{ height: 'calc(100% - 146px - 30px)' }}
        >
          {isLoading ? (
            <LoadMore />
          ) : (
            <>
              {staffList?.count ? (
                <InfiniteScroll
                  dataLength={staffList?.rows?.length}
                  next={handleLoadMore}
                  hasMore={staffList?.count > staffList?.rows?.length}
                  loader={<LoadMore />}
                  scrollableTarget="scrollableStaff"
                >
                  {staffList?.rows?.map((staff: any, index: number) => (
                    <div key={index} onClick={() => setStaffSelected(staff)}>
                      <StaffItem
                        data={staff}
                        active={staffSelected?.stf_no === staff?.stf_no}
                      />
                    </div>
                  ))}
                </InfiniteScroll>
              ) : (
                <div className={cx('box-no-staff')}>
                  <div className={cx('note')}>No data</div>
                </div>
              )}
            </>
          )}
        </div>
      </Box>
    </div>
  );
};

export default StaffList;
