'use client';

import '@styles/globals.scss';
import 'antd/dist/reset.css';

import React, { useEffect } from 'react';
import { queryConfig } from '@configs/query.config';
import { THEME_CONFIG } from '@configs/theme.config';
import { useLocalesStore } from '@stores/locales';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { App as AppAntd, ConfigProvider } from 'antd';
import ko_KR from 'antd/lib/locale/ko_KR';

import 'dayjs/locale/ko';

function Providers({ children }: any) {
  const [hydated, seHydrated] = React.useState(false);
  const setDict = useLocalesStore((state) => state.setDict);
  const currentLocale = useLocalesStore((state) => state.locale);

  useEffect(() => {
    seHydrated(true);
  }, []);

  useEffect(() => {
    hydated && setDict(currentLocale);
  }, [hydated, currentLocale, setDict]);

  const [queryClient] = React.useState(() => new QueryClient(queryConfig()));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          autoInsertSpaceInButton={false}
          theme={THEME_CONFIG}
          locale={ko_KR}
        >
          {hydated && (
            <AppAntd notification={{ placement: 'topRight' }}>
              {children}
            </AppAntd>
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </ConfigProvider>
      </QueryClientProvider>
    </>
  );
}

export default Providers;
