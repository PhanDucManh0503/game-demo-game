import axiosClient from '@configs/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { API_ROUTES } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

interface LoginPayload {
  id: string;
  password: string;
}

export const useLoginTax = () => {
  const { notification } = App.useApp();

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const url = API_ROUTES.LOGIN_TAX;
      const resp = await axiosClient.post(url, data);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: 'Success!',
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};
