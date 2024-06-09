import React from 'react';
import { Tabs, TabsProps } from 'antd';
import classNames from 'classnames/bind';

import styles from './tabs_app.module.scss';

const cx = classNames.bind(styles);

interface ITabsAppProps {
  isModal?: boolean;
  items: any[];
  id?: string;
  className?: string;
  showDocsList?: boolean;
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;
  onClickDocsList?: () => void;
}

const TabsApp = ({
  isModal = false,
  items,
  className = '',
  showDocsList = false,
  onClickDocsList,
  ...props
}: ITabsAppProps & TabsProps) => {
  return (
    <Tabs
      className={cx('root', isModal ? 'isModal' : '', className.split(' '))}
      // tabBarExtraContent={
      //   showDocsList ? (
      //     <ButtonApp
      //       title="문서목록"
      //       icon={<i className="xi-bars xi-x" style={{ color: '#AFB3BA' }}></i>}
      //       className="bg-transparent text-white"
      //       onClick={onClickDocsList}
      //     />
      //   ) : (
      //     <div></div>
      //   )
      // }
      items={items}
      {...props}
    />
  );
};

export default TabsApp;
