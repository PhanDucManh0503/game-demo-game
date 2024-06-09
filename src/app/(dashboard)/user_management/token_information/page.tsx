'use client';

import { useState } from 'react';
import { useTranslations } from '@hooks/locales.hook';
import useQueryParams from '@hooks/useQueryParams';
import classNames from 'classnames/bind';
import TabsApp from '@components/common/tabs-app';

import DepositTokenHistory from './components/deposit-token-history';
import WithdrawTokenHistory from './components/withdraw-token-history';
import styles from './style.module.scss';

export const TOKEN_HISTORY_TABS = {
  TAB1: {
    label: 'deposit_token_history',
    key: 'DEPOSIT_TOKEN_HISTORY',
  },
  TAB2: {
    label: 'withdraw_token_history',
    key: 'WITHDRAW_TOKEN_HISTORY',
  },
};

const cx = classNames.bind(styles);

const Page = () => {
  const { t } = useTranslations();
  const { queryParams, setQueryParams } = useQueryParams();

  const [tabSelected, setTabSelected] = useState<string>(
    queryParams.tab || TOKEN_HISTORY_TABS.TAB1.key,
  );
  const tabsList = [
    {
      label: t(`${TOKEN_HISTORY_TABS.TAB1.label}`),
      key: TOKEN_HISTORY_TABS.TAB1.key,
      children: <DepositTokenHistory tabSelected={tabSelected} />,
    },
    {
      label: t(`${TOKEN_HISTORY_TABS.TAB2.label}`),
      key: TOKEN_HISTORY_TABS.TAB2.key,
      children: <WithdrawTokenHistory tabSelected={tabSelected} />,
    },
  ];
  const handleChangeTab = (activeKey: string) => {
    setTabSelected(activeKey);
    setQueryParams({
      tab: activeKey,
    });
  };
  return (
    <div className={cx('root')}>
      <TabsApp
        items={tabsList}
        showDocsList={true}
        onChange={handleChangeTab}
      />
    </div>
  );
};

export default Page;
