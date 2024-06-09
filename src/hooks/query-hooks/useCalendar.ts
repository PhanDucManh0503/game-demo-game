import axiosClient from '@configs/axiosClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { ICalendar } from 'src/types/calendar';
import { ICalendarOfDoctor } from 'src/types/calendarOfDoctor';
import { IResponseData } from 'src/types/common';
import { IConsultantCalendar } from 'src/types/consultant-calendar';
import { API_ROUTES, QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';
import { useTranslations } from '@hooks/locales.hook';

export const useFetchCalendarByReceiverId = (
  receiverId: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_CALENDAR_BY_RECEIVER_ID, params, receiverId],
    queryFn: async (): Promise<IResponseData<ICalendar>> => {
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}${API_ROUTES.CALENDAR_DETAILS}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!receiverId,
  });
};

export const useFetchCalendar = (params: any = { fields: ['$all'] }) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_CALENDAR, params],
    queryFn: async (): Promise<IResponseData<ICalendar>> => {
      const url = `${API_ROUTES.RECEIVERS}${API_ROUTES.CALENDAR_DETAILS}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useUpdateCalendarRFIDSync = () => {
  const { notification } = App.useApp();

  return useMutation({
    mutationFn: async (payload: {
      receiverId: string;
      svc_dt: string;
      svc_dv_cd: string;
      cldr_seq: number;
      astSeq: number;
    }) => {
      const { receiverId, astSeq, ...body } = payload;
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}${API_ROUTES.CALENDAR_DETAILS}/rfid/sync?astSeq=${astSeq}`;
      return await axiosClient.put(url, body);
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};
export const useUpdateCalendar = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: any) => {
      const { receiverId, astSeq, ...body } = payload;
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}${API_ROUTES.CALENDAR_DETAILS}/rfid?astSeq=${astSeq}`;
      return await axiosClient.put(url, body);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CALENDAR_BY_RECEIVER_ID],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useUpdateStatusYesNoCalendar = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: {
      svc_dt: string;
      svc_dv_cd: string;
      receiverId: string;
      cldr_seq: number;
      use_yn: boolean;
      use_yn_rsn: string;
    }) => {
      const { receiverId, ...body } = payload;
      const url = `${API_ROUTES.RECEIVERS}/${receiverId}${API_ROUTES.CALENDAR_DETAILS}/use-yes-no`;
      return await axiosClient.put(url, body);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CALENDAR_BY_RECEIVER_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CALENDAR],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchCalendarDoctorByStaffId = (
  staffId: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_CALENDAR_DOCTOR_BY_STAFF_ID, staffId, params],
    queryFn: async (): Promise<IResponseData<ICalendarOfDoctor>> => {
      const url = `${API_ROUTES.CALENDARS}${API_ROUTES.DOCTORS}/${staffId}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!staffId,
  });
};

export const useFetchConsultantCalendars = (
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_CONSULTANT_CALENDARS, params],
    queryFn: async (): Promise<IResponseData<IConsultantCalendar>> => {
      const url = `${API_ROUTES.CONSULTANT_CALENDARS}${API_ROUTES.RECEIVERS}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchConsultantCalendarsByStaffId = (
  staffId: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_CONSULTANT_CALENDARS, staffId, params],
    queryFn: async (): Promise<IResponseData<IConsultantCalendar>> => {
      const url = `${API_ROUTES.CONSULTANT_CALENDARS}${API_ROUTES.STAFFS}/${staffId}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!staffId,
  });
};
