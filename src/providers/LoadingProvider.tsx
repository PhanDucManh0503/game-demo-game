import React, { createContext, useContext, useEffect, useState } from 'react';
import { useIsMutating } from '@tanstack/react-query';
import ReactLoading from 'react-loading';
import Box from '@components/common/box';

export interface ILoading {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<ILoading>({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

interface LoadingProviderProps {
  children: React.ReactNode;
}

function LoadingProvider({ children }: LoadingProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const value = {
    loading: loading,
    showLoading: () => setLoading(true),
    hideLoading: () => setLoading(false),
  };

  const isMutating = useIsMutating();

  useEffect(() => {
    if (isMutating) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isMutating]);

  return (
    <LoadingContext.Provider value={value}>
      <>
        {loading && (
          <Box
            sx={{
              backgroundColor: 'rgba(52, 52, 52, 0.2)',
              position: 'fixed',
              zIndex: '10000',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ReactLoading
              type={'spin'}
              color={'#38475F'}
              height={'40px'}
              width={'40px'}
            />
          </Box>
        )}
        {children}
      </>
    </LoadingContext.Provider>
  );
}

const useLoading = (externalLoading?: boolean) => {
  const { showLoading, loading, hideLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (externalLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [externalLoading]);

  return { showLoading, loading, hideLoading };
};

export { LoadingContext, LoadingProvider, useLoading };
