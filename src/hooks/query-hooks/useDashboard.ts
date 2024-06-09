import axiosClient from '@configs/axiosClient';
import { useTranslations } from '@hooks/locales.hook';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

export const useDashboardSendSmsToReceiver = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: {
      body: {
        receiverId: string;
        sendToPreserver: boolean;
      }[];
      params: {
        smsType: string;
        templateCode: string;
        fclt_orgn_no: string;
      };
    }) => {
      // const url = `/dashboard/schedule-statistic/send-sms-to-receiver`;
      const { smsType, templateCode, fclt_orgn_no } = payload.params;
      const url = `/dashboard/salary-plan/send-message?smsType=${smsType}&templateCode=${templateCode}&fclt_orgn_no=${fclt_orgn_no}`;
      const resp = await axiosClient.post(url, payload.body);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_REMAINING_POINT],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useDashboardSendSmsToStaff = () => {
  const { t } = useTranslations();
  return useMutation({
    mutationFn: async (body: { list: string[]; content: string }) => {
      const url = `/dashboard/schedule-statistic/send-sms-to-staff`;
      const resp = await axiosClient.post(url, body);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};
