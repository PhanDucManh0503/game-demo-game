import axiosClient from '@configs/axiosClient';
import { useTranslations } from '@hooks/locales.hook';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { API_ROUTES } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

interface LoginPayload {
  username: string;
  password: string;
}
export const useLogin = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const url = API_ROUTES.LOGIN;
      const resp = (await axiosClient.post(url, data)) as {
        accessToken: string;
        refreshToken: string;
        user: IStaffDto;
      };
      return resp;
    },
    onSuccess: (data) => {
      notification.success({
        message: t('success'),
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};
export const useUpdateProfile = () => {
  const { notification } = App.useApp();

  return useMutation({
    // eslint-disable-next-line
    mutationFn: async ({}: any) => {
      const resp: IStaffDto = await axiosClient.get('/users/profile');
      return resp;
    },
    onSuccess: (data) => {},
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};
