import { Descriptions, DescriptionsProps } from 'antd';
import classNames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classNames.bind(styles);
interface PropsDescription {
  itemsDescriptions: DescriptionsProps['items'];
  column?: any;
}
const GroupDescriptions = ({ itemsDescriptions, column }: PropsDescription) => {
  return (
    <div className={cx('description-form')}>
      <Descriptions bordered items={itemsDescriptions} column={column || 4} />
    </div>
  );
};

export default GroupDescriptions;
