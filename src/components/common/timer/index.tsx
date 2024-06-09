import { useEffect, useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import classNames from 'classnames/bind';
import moment from 'moment';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={cx('chip', 'timmer')}>
      <Icon
        component={() => (
          <i
            className="xi-clock-o"
            style={{
              fontSize: 20,
              color: '#2AAD9A',
              marginRight: 4,
            }}
          ></i>
        )}
      ></Icon>

      {currentTime.locale('en').format('MM DD ddd HH:mm')}
    </div>
  );
};

export default Timer;
