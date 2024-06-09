import axiosClient from '@configs/axiosClient';
import { useTranslations } from '@hooks/locales.hook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { IElderly } from 'src/models/elderly';
import { INursingDirections } from 'src/models/nursing-directions';
import { IPreserverReport } from 'src/types';
import { IResponseData } from 'src/types/common';
import { IReceiptOfReceiver } from 'src/types/receipt-of-receiver';
import { API_ROUTES, QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

export const useFetchReceiversList = (params: any = { fields: ['$all'] }) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIVERS, params],
    queryFn: async (): Promise<IResponseData<IElderly>> => {
      const url = `${API_ROUTES.RECEIVERS}/filter`;

      return await axiosClient.post(url, params);
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useCreateReceiver = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: any) => {
      const url = `${API_ROUTES.RECEIVERS}`;
      const resp = await axiosClient.post(url, body);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECEIVERS] });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchReceiver = (
  id: string | undefined,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIVERS, id, params],
    queryFn: async () => {
      const url = `${API_ROUTES.RECEIVERS}/${id}`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!id,
    staleTime: 0,
  });
};

export const useUpdateReceiver = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: any): Promise<any> => {
      const { rcev_no, ...payload } = body;
      const url = `${API_ROUTES.RECEIVERS}/${rcev_no}`;
      return await axiosClient.put(url, payload);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECEIVERS] });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useDeleteReceiver = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (id: string) => {
      const url = `${API_ROUTES.RECEIVERS}/${id}`;
      await axiosClient.delete(url);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECEIVERS] });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useCreateReceiverHomeBathingStatusChangeDetail = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: any) => {
      const { receiverId, ...payload } = body;
      const url = `/receivers/${receiverId}/home-bathing-status-change-details`;
      const resp = await axiosClient.post(url, payload);
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

export const useUpdateDoctorForReceiver = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: any) => {
      const url = `${API_ROUTES.RECEIVERS}/${body.receiverId}/doctors/${body.staffId}`;
      await axiosClient.put(url);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECEIVERS] });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchGuardiansList = (
  params: any = { fields: ['$all'] },
  receiverId: string,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_GUARDIANS, params, receiverId],
    queryFn: async () => {
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}${API_ROUTES.GET_GUARDIANS}`;

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

export const useFetchReceiptOfReceiver = (
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIPT_OF_RECEIVER, params],
    queryFn: async (): Promise<IReceiptOfReceiver> => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}${API_ROUTES.GET_CO_PAYMENT_CLAIM}${API_ROUTES.RECEIPT_OF_RECEIVER}`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useUpdateRFIDByReceiverId = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: {
      receiverId: string;
      assistSequence: number;
    }) => {
      const { receiverId, assistSequence } = body;
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}/work-log-details/${assistSequence}/rfid`;
      await axiosClient.put(url);
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

export const useFetchListPhoneNumberReceiveSms = (
  rcev_no: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIPT_OF_RECEIVER, params, rcev_no],
    queryFn: async (): Promise<
      {
        name: string;
        phone: string;
      }[]
    > => {
      const url = `${API_ROUTES.RECEIVERS}/${rcev_no}${API_ROUTES.PRESERVERS}${API_ROUTES.LIST_PHONE_NUMBER_RECEIVE_SMS}`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!rcev_no,
  });
};

export const useUploadRFIDFile = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: {
      receiverId: string;
      svc_dt: string;
      svc_dv_cd: string;
      cldr_seq: number;
      edt_rfid_file_pth: string;
      edt_rfid_file_nm: string;
      astSeq: number;
    }) => {
      const { receiverId, astSeq, ...payload } = body;
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}${API_ROUTES.CALENDAR_DETAILS}/rfid-file?astSeq=${astSeq}`;
      const resp = await axiosClient.post(url, payload);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CALENDAR_BY_RECEIVER_ID],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CALENDAR] });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useUpdatePreserverByReceiverId = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: {
      receiverId: string;
      assistSequence: number;
      psv_nm: string;
      psv_rels_cd: string;
    }) => {
      const { receiverId, assistSequence, ...payload } = body;
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}${API_ROUTES.WORK_LOG_DETAILS}/${assistSequence}${API_ROUTES.PRESERVER}`;
      const resp = await axiosClient.put(url, payload);
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CONSULTANT_CALENDARS],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchListPreserverReport = (params: {
  startDateOfWeek: string;
  endDateOfWeek: string;
}) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIPT_OF_RECEIVER, params],
    queryFn: async (): Promise<IPreserverReport[]> => {
      const url = `${API_ROUTES.RECEIVERS}/home-care/receiver-has-report-in-week`;
      return await axiosClient.get(url, {
        params,
      });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchListPreserverReportCount = (payload: {
  list: {
    receiverId: string;
    lookUpDateList: string[];
    listPhone: any[];
  };
}) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIPT_OF_RECEIVER, payload],
    queryFn: async (): Promise<{
      count: number;
    }> => {
      const url = `${API_ROUTES.RECEIVERS}/home-caring-status-change-details/week/send-mass-report/count`;
      return await axiosClient.post(url, payload);
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!Object.keys(payload?.list || []).length,
    keepPreviousData: true,
  });
};

export interface IAddSchedulePayload {
  receiverId: string;
  month: string;
  year: string;
}

export const useAddSchedule = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: IAddSchedulePayload) => {
      const { receiverId, year, month } = body;
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}${API_ROUTES.CALENDAR_DETAILS}?month=${month}&year=${year}`;
      const resp = await axiosClient.post(url);
      return resp as any;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CALENDAR_BY_RECEIVER_ID],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CALENDAR] });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export interface IAddScheduleCalendarDetailsPayload {
  svc_dt: string;
  svc_dv_cd: string;
  // svc_pkg: string;
  svc_str_tm: string;
  svc_end_tm: string;
  receiverId: string;
  rspb_cwr_stf_nos: string[];
}

export const useAddScheduleCalendarDetails = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: IAddScheduleCalendarDetailsPayload) => {
      const { receiverId, ...payload } = body;
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}${API_ROUTES.CALENDAR_CHANGE_DETAILS}`;
      const resp = await axiosClient.post(url, payload);
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

export const useFetchAvailableReceivers = (params: {
  svc_dv_cd: string;
  aft_svc_dt: string;
  svc_str_tm: string;
  svc_end_tm: string;
  page?: number;
  limit?: number;
}) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIPT_OF_RECEIVER, params],
    queryFn: async (): Promise<IResponseData<IElderly>> => {
      const url = `${API_ROUTES.RECEIVERS}${API_ROUTES.CALENDAR_CHANGE_DETAILS}/available-receivers`;
      return await axiosClient.get(url, {
        params,
      });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchNursingDirectionsByReceiverId = (
  receiverId: string,
  params: any,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIPT_OF_RECEIVER, receiverId, params],
    queryFn: async (): Promise<IResponseData<INursingDirections>> => {
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}/nursing-directions`;
      return await axiosClient.get(url, {
        params,
      });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!receiverId,
  });
};

export const useSendReportReceiverHomeCare = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: {
      body: {
        receiverId: string;
        lookUpDate: string;
        startDate: string;
        startMonth: string;
        endDate: string;
        endMonth: string;
        pdfLink: string;
      };
      params: {
        fclt_orgn_no: string;
        smsType: string;
        templateCode: string;
      };
    }) => {
      const { fclt_orgn_no, smsType, templateCode } = payload.params;
      const url = `${API_ROUTES.RECEIVERS}/home-care/send-report?fclt_orgn_no=${fclt_orgn_no}&smsType=${smsType}&templateCode=${templateCode}`;
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

export const useFetchPackageBathService = (year: string) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECEIPT_OF_RECEIVER, year],
    queryFn: async (): Promise<any> => {
      const url = `/public-corporation-pay-allowance-details/bath-service?year=${year}`;
      return await axiosClient.get(url);
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};
