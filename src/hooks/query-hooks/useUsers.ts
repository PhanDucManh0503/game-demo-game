import axiosClient from '@configs/axiosClient';
import { useTranslations } from '@hooks/locales.hook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { API_ROUTES, QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

interface MutationBody {
  id: string;
  data: any;
}

export const useFetchUsersList = (
  params: any = { fields: ['$all'] },
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS, params],
    queryFn: async () => {
      const url = `${API_ROUTES.USERS}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onSuccess,
    onError,
    useErrorBoundary(error) {
      return errorHandler(error, notification);
    },
  });
};

export const useCreateUser = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: any) => {
      const url = `${API_ROUTES.USERS}`;
      const resp = await axiosClient.post(url, body);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USERS] });
    },
  });
};

export const useFetchUser = (
  id: string,
  params: any = { fields: ['$all'] },
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS, id, params],
    queryFn: async () => {
      const url = `${API_ROUTES.USERS}/${id}`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    onSuccess,
    onError,
    useErrorBoundary(error) {
      return errorHandler(error, notification);
    },
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: MutationBody) => {
      const url = `${API_ROUTES.USERS}/${body.id}`;
      await axiosClient.put(url, body.data);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USERS] });
    },
  });
};

export const useDeleteUser = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslations();
  return useMutation({
    mutationFn: async (id: string) => {
      const url = `${API_ROUTES.USERS}/${id}`;
      await axiosClient.delete(url);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USERS] });
    },
  });
};
