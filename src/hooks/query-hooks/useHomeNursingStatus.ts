import axiosClient from '@configs/axiosClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { IHomeNursingStatusReport } from 'src/types/home-nursing-status';
import { API_ROUTES, QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';
import { useTranslations } from '@hooks/locales.hook';

export const useFetchHomeNursingStatusList = (
  params: any = { fields: ['$all'] },
  enabled: boolean = true,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.HOME_NURSING_STATUS_CHANGE_DETAILS, params],
    queryFn: async () => {
      const url = `${API_ROUTES.RECEIVERS}${API_ROUTES.HOME_NURSING_STATUS_CHANGE_DETAILS}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled,
  });
};

export const useCreateHomeNursingStatus = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: any) => {
      const { rcev_no, lup_dt, ...payload } = body;
      const url = `${API_ROUTES.RECEIVERS}/${rcev_no}${API_ROUTES.HOME_NURSING_STATUS_CHANGE_DETAILS}/${lup_dt}`;
      const resp = await axiosClient.post(url, payload);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.HOME_NURSING_STATUS_CHANGE_DETAILS],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchHomeNursingStatus = (
  receiverId: string,
  lup_dt: string,
  enabled: boolean = true,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [
      QUERY_KEYS.HOME_NURSING_STATUS_CHANGE_DETAILS,
      receiverId,
      lup_dt,
      params,
    ],
    queryFn: async (): Promise<IHomeNursingStatusReport> => {
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}${API_ROUTES.HOME_NURSING_STATUS_CHANGE_DETAILS}/${lup_dt}`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: enabled,
  });
};

export const usePostHomeNursingStatus = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: any) => {
      const { rcev_no, serviceDate, ...payload } = body;
      const url = `${API_ROUTES.RECEIVERS}/${rcev_no}${API_ROUTES.HOME_NURSING_STATUS_CHANGE_DETAILS}/${serviceDate}`;
      await axiosClient.post(url, payload);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.HOME_NURSING_STATUS_CHANGE_DETAILS],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useDeleteHomeNursingStatus = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (id: string) => {
      const url = `${API_ROUTES.RECEIVERS}${API_ROUTES.HOME_NURSING_STATUS_CHANGE_DETAILS}/${id}`;
      await axiosClient.delete(url);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.HOME_NURSING_STATUS_CHANGE_DETAILS],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};
