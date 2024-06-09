'use client';

import { useEffect, useState } from 'react';
import { SEO } from '@configs/seo.config';
import { useTranslations } from '@hooks/locales.hook';
import { useUpdateProfile } from '@hooks/query-hooks/useAuth';
import { useUserStore } from '@stores/user';
import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { DefaultSeo } from 'next-seo';
import { GameAPI } from 'src/api/gameAPI';
import { GAME_TYPES, STATUS_PLAY_GAME } from '@utils/constants/common.constant';

import GameCard from './components/game-card/page';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

const Page = () => {
  const { t } = useTranslations();
  const [games, setGames] = useState<any[]>([]);
  const { mutate: getProfile } = useUpdateProfile();
  const { updateUser } = useUserStore();
  const handleGetGames = async () => {
    try {
      const params = {
        page: 1,
        limit: 999999,
        gameType: GAME_TYPES[1]?.value,
        status: STATUS_PLAY_GAME[1]?.value,
      };
      const res: any = await GameAPI.userGetGames(params);
      setGames(res?.content || []);
    } catch (err) {
      setGames([]);
      console.log(err);
    }
  };

  const handleUpdateAfterBet = async () => {
    await getProfile(
      {},
      {
        onSuccess: (data) => {
          updateUser(data);
        },
      },
    );
    handleGetGames();
  };

  useEffect(() => {
    handleGetGames();
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} title="Page" />
      <div className={cx('root')}>
        <div className={cx('banner')}>
          <div className={cx('dark-bg')}>
            <p>{t('slogan_game')}</p>
          </div>
        </div>
        <Row className={cx('container')} gutter={[30, 30]}>
          {games?.map((game: any) => {
            return (
              <Col span={24} md={12} xl={8} key={game?.id}>
                <GameCard
                  key={game?.id}
                  data={game}
                  handleUpdateAfterBet={handleUpdateAfterBet}
                />
              </Col>
            );
          })}
          {/* <Col span={24} md={12} xl={8}>
            <GameCard key={1} />
          </Col>
          <Col span={24} md={12} xl={8}>
            <GameCard key={2} />
          </Col>
          <Col span={24} md={12} xl={8}>
            <GameCard key={3} />
          </Col>
          <Col span={24} md={12} xl={8}>
            <GameCard key={4} />
          </Col> */}
        </Row>
      </div>
    </>
  );
};

export default Page;
