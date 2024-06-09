import { useQuery } from '@tanstack/react-query';
import { App } from 'antd';
import axios from 'axios';
import { QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

export const useGetLocationSuggestions = (
  keyword: string,
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_LOCATION_SUGGESTIONS, keyword],
    queryFn: async () => {
      const url = `https://dapi.kakao.com/v2/local/search/keyword.json?&query=${keyword}`;

      return await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
    },
    retry: false,
    keepPreviousData: true,
    onSuccess,
    onError,
    useErrorBoundary(error) {
      return errorHandler(error, notification);
    },
    enabled: !!keyword,
  });
};

export const useGetLocationByCoord = (
  coord: {
    lng: number;
    lat: number;
  },
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_LOCATION_BY_COORD, coord],
    queryFn: async () => {
      const url = `https://dapi.kakao.com/v2/local/geo/coord2address?&x=${coord.lng}&y=${coord.lat}`;

      return await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
    },
    retry: false,
    keepPreviousData: true,
    onSuccess,
    onError,
    useErrorBoundary(error) {
      return errorHandler(error, notification);
    },
    enabled: !!coord.lng || !!coord.lat,
  });
};
