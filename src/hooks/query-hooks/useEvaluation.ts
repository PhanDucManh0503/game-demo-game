import axiosClient from '@configs/axiosClient';
import { useTranslations } from '@hooks/locales.hook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { IResponseData } from 'src/types/common';
import { IEvaluation } from 'src/types/evaluation';
import { API_ROUTES, QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

export const useFetchEvaluation = (params: any = { fields: ['$all'] }) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_EVALUATION, params],
    queryFn: async (): Promise<IResponseData<IEvaluation>> => {
      const url = `${API_ROUTES.GET_EVALUATION}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,

    useErrorBoundary(error) {
      return errorHandler(error, notification);
    },
  });
};

export const useSendSalaryPlanReceiverEvaluation = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: {
      facilityOrganizationId: string;
      smsType: string;
      templateCode: string;
      receiverNo: string;
      signatureYesNo: boolean;
      attachmentLink: string;
      rcevEvalSeq: number;
    }) => {
      const url = `/receiverEvaluation/send-salary-plan`;
      const resp = await axiosClient.post(url, payload);
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

export const useUpdateEvaluation = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: any) => {
      const { eval_knd_no, ...data } = payload;
      const url = `/facility-organization/evaluations/simulate-eval${eval_knd_no}`;
      const resp = await axiosClient.post(url, data);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EVALUATIONS],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};
