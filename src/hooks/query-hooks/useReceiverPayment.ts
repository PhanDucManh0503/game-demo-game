import axiosClient from '@configs/axiosClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { ISendMassMessageHomeCaringServicePayload } from 'src/app/(dashboard)/elderly-management/state-change/components/modal-send-message';
import { ICoPaymentClaimDetailUnpaid } from 'src/types/co-payment-claim-detail-unpaid';
import { ICoPaymentClaimDetailUnpaidMonths } from 'src/types/co-payment-claim-detail-unpaid-months';
import { ICoPayMentDeposit } from 'src/types/co-payment-deposit';
import { ICoPayMentDepositHistory } from 'src/types/co-payment-deposit-history';
import { IResponseData } from 'src/types/common';
import { IUnpaidSendHistories } from 'src/types/unpaid-send-histories';
import { API_ROUTES, QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';
import { useTranslations } from '@hooks/locales.hook';

export const useFetchCoPaymentClaimList = (
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_CO_PAYMENT_CLAIM, params],
    queryFn: async () => {
      const url = `/facility-organizations/facility-organization-co-payment-claim-detail-page`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchCoPaymentDepositList = (
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_CO_PAYMENT_DEPOSIT, params],
    queryFn: async (): Promise<IResponseData<ICoPayMentDeposit>> => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}${API_ROUTES.GET_CO_PAYMENT_CLAIM}${API_ROUTES.GET_CO_PAYMENT_DEPOSIT}`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchCoPaymentDepositHistoriesList = (
  fclt_orgn_no: string,
  claim_seq: number,
  params: any = { fields: ['$all'] },
  enabled: boolean = true,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_CO_PAYMENT_DEPOSIT_HISTORIES,
      params,
      fclt_orgn_no,
      claim_seq,
    ],
    queryFn: async (): Promise<IResponseData<ICoPayMentDepositHistory>> => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/${fclt_orgn_no}${API_ROUTES.GET_CO_PAYMENT_CLAIM}/${claim_seq}${API_ROUTES.GET_CO_PAYMENT_DEPOSIT}${API_ROUTES.GET_CO_PAYMENT_DEPOSIT_HISTORIES}`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: enabled,
  });
};

export const useFetchUnpaidDetails = (params: any = { fields: ['$all'] }) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_UNPAID_DETAILS, params],
    queryFn: async (): Promise<IResponseData<ICoPaymentClaimDetailUnpaid>> => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}${API_ROUTES.GET_CO_PAYMENT_CLAIM}${API_ROUTES.GET_UNPAID_DETAILS}`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchUnpaidSendHistories = (
  claim_seq: number,
  rcev_no: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_UNPAID_SEND_HISTORIES,
      params,
      claim_seq,
      rcev_no,
    ],
    queryFn: async (): Promise<IResponseData<IUnpaidSendHistories>> => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}${API_ROUTES.GET_UNPAID_SEND_HISTORIES}`;
      return await axiosClient.get(url, {
        params: { claim_seq, rcev_no, ...params },
      });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!claim_seq || !!rcev_no,
  });
};

export const useFetchMonthUnpaidOfReceiver = (
  claim_seq: number,
  rcev_no: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_UNPAID_DETAILS, params, claim_seq, rcev_no],
    queryFn: async (): Promise<
      IResponseData<ICoPaymentClaimDetailUnpaidMonths>
    > => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}${API_ROUTES.GET_CO_PAYMENT_CLAIM}${API_ROUTES.GET_UNPAID_DETAILS}${API_ROUTES.GET_LIST_MONTH_UNPAID}`;
      return await axiosClient.get(url, {
        params: { claim_seq, rcev_no, ...params },
      });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useSendMessageReceiverUnpaid = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: {
      body: {
        receiverId: string;
        totalOwe: number;
      };
      params: {
        fclt_orgn_no: string;
        smsType: string;
        templateCode: string;
      };
    }) => {
      const { fclt_orgn_no, smsType, templateCode } = payload.params;

      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/facility-organization-co-payment-claim-details/send-owe-history?fclt_orgn_no=${fclt_orgn_no}&smsType=${smsType}&templateCode=${templateCode}`;
      return await axiosClient.post(url, payload.body);
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_REMAINING_POINT],
      });
    },
  });
};

export const useSendKakaoMessageReceiverUnpaid = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: {
      list: {
        name: string;
        phone: string;
      }[];
      text: string;
      rcev_no: string;
    }) => {
      const { rcev_no, ...body } = payload;
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/facility-institution-own-expense-req-unpaid-send-histories/send-kakao?rcev_no=${rcev_no}`;
      return await axiosClient.post(url, {
        ...body,
        templateId: 'KA01TP240202081958005PmNpxH3xbf3',
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
    },
  });
};

export interface ISendMassMessageReceiverUnpaidPayload {
  list: {
    receiverId: string;
    claimSeq: number;
    listPhone: [
      {
        phone: string;
        name: string;
      },
    ];
  }[];
  text: string;
}

export const useSendMassSmsMessageReceiverUnpaid = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: ISendMassMessageReceiverUnpaidPayload) => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/facility-institution-own-expense-req-unpaid-send-histories/send-mass-sms`;
      return await axiosClient.post(url, payload);
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
    },
  });
};

export const useSendMassKakaoMessageReceiverUnpaid = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: ISendMassMessageReceiverUnpaidPayload) => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/facility-institution-own-expense-req-unpaid-send-histories/send-mass-kakao`;
      return await axiosClient.post(url, {
        ...payload,
        templateId: '',
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
    },
  });
};

export const useSendMassMessageHomeCaringService = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: ISendMassMessageHomeCaringServicePayload) => {
      const url = `${API_ROUTES.RECEIVERS}/home-caring-status-change-details/week/send-mass-report`;
      return await axiosClient.post(url, payload);
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
    },
  });
};

export const useSaveCallHistory = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: { text: string; rcev_no: string }) => {
      const { rcev_no, text } = payload;
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/facility-institution-own-expense-req-unpaid-send-histories/${rcev_no}/save-call-history`;
      return await axiosClient.post(url, {
        text,
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
    },
  });
};

export const useSendBillKakao = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: {
      text: string;
      rcev_no: string;
      claim_seq: number;
      templateId: string;
      list: {
        name: string;
        phone: string;
      }[];
    }) => {
      const { rcev_no, claim_seq, ...body } = payload;
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}${API_ROUTES.GET_CO_PAYMENT_CLAIM}/send-bill-kakao-sms`;
      return await axiosClient.post(url, body, {
        params: {
          rcev_no,
          claim_seq,
        },
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
    },
  });
};

export interface IReceiverBalance {
  input_stf_no: string;
  input_dtm: string;
  modf_stf_no: string;
  modf_dtm: string;
  rcev_no: string;
  seq: number;
  bal: number;
  bal_aft_fluc: number;
  bal_chg_tm: string;
  depositor: string;
  dpst_dtm: string;
  dpst_amt: number;
  withdraw_amt: number;
  type: string;
}

export const useFetchReceiverBalance = (
  receiverId: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIVER_BALANCE, params, receiverId],
    queryFn: async (): Promise<IResponseData<IReceiverBalance>> => {
      const url = `/receiver-balance/${receiverId}/page`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!receiverId,
  });
};

export const useFetchReceiverRemainingBalance = (
  receiverId: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIVER_BALANCE, params, receiverId],
    queryFn: async (): Promise<{
      remaining_balance: number;
    }> => {
      const url = `/receiver-balance/${receiverId}/remaining-balance`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!receiverId,
  });
};

export const useCreateReceiverBalance = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: {
      rcev_no: string;
      dpst_amt: 0;
      depositor: string;
    }) => {
      const url = `/receiver-balance/create`;
      return await axiosClient.post(url, payload);
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECEIVER_BALANCE],
      });
    },
  });
};

export const useSendReceiptMessageReceiver = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: {
      body: {
        receiverId: string;
        realSchedule: number;
        paymentYear: string;
        paymentMonth: string;
        paymentDate: string;
        selfPayExpense: number;
      };
      params: {
        fclt_orgn_no: string;
        smsType: string;
        templateCode: string;
      };
    }) => {
      const { fclt_orgn_no, smsType, templateCode } = payload.params;

      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/facility-organization-co-payment-claim-details/send-receipt?fclt_orgn_no=${fclt_orgn_no}&smsType=${smsType}&templateCode=${templateCode}`;
      return await axiosClient.post(url, payload.body);
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_REMAINING_POINT],
      });
    },
  });
};
