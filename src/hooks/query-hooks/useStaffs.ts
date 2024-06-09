import axiosClient from '@configs/axiosClient';
import { useTranslations } from '@hooks/locales.hook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import dayjs from 'dayjs';
import { ILicense, IStaff } from 'src/models/staff';
import { IResponseData } from 'src/types/common';
import { IStaffLeaveOptions } from 'src/types/staff-leave-options';
import { API_ROUTES, QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

interface MutationBody {
  id: string;
  data: any;
}

export const useFetchStaffList = (params: any = { fields: ['$all'] }) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAFFS, params],
    queryFn: async (): Promise<IResponseData<IStaff>> => {
      const url = `${API_ROUTES.STAFFS}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useCreateStaff = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: any) => {
      const url = `${API_ROUTES.STAFFS}`;
      const resp = await axiosClient.post(url, body);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_STAFFS] });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchStaff = (
  id: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAFFS, id, params],
    queryFn: async () => {
      const url = `${API_ROUTES.STAFFS}/${id}`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!id,
  });
};

export const useUpdateStaff = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: MutationBody) => {
      const url = `${API_ROUTES.STAFFS}/${body.id}`;
      await axiosClient.put(url, body.data);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_STAFFS] });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useDeleteStaff = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (id: string) => {
      const url = `${API_ROUTES.STAFFS}/${id}`;
      await axiosClient.delete(url);
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_STAFFS] });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchStaffsForReceiver = (
  receiverId: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAFFS, receiverId, params],
    queryFn: async () => {
      const url = `${API_ROUTES.STAFFS}/receivers/${receiverId}`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!receiverId,
  });
};

export const useFetchServiceStaff = (
  facilityOrganizationId: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAFFS, facilityOrganizationId, params],
    queryFn: async () => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATION}s/${facilityOrganizationId}/services`;
      return await axiosClient.get(url, { params });
    },
    retry: false,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!facilityOrganizationId,
  });
};

export const useFetchStaffLeaveOptions = (
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAFF_LEAVE_OPTIONS, params],
    queryFn: async (): Promise<IStaffLeaveOptions> => {
      const url = `${API_ROUTES.STAFF_LEAVE_OPTIONS}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    useErrorBoundary(error) {
      return errorHandler(error, notification);
    },
  });
};

export const useStaffRegisterLeave = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: any) => {
      const { staffId, ...payload } = body;
      const url = `${API_ROUTES.STAFFS}/${staffId}${API_ROUTES.REGISTER_LEAVE}`;
      const resp = await axiosClient.post(url, payload);
      return resp;
    },
    onSuccess: () => {
      notification.success({ message: t('success') });
    },
    onError: (err: any) => {
      if (err?.code === 'ERP-400-325') {
        notification.error({
          message: t(`error_code.${[err?.code]}`, {
            date: dayjs(err?.data?.dt).format('MM/DD'),
          }),
        });
      } else if (err?.code) {
        notification.error({ message: t(`error_code.${[err?.code]}`) });
      } else {
        notification.error({ message: '실패했습니다' });
      }
    },
  });
};

export const useFetchStaffLicenses = (
  staffId: string | undefined,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAFF_LICENSES, params, staffId],
    queryFn: async (): Promise<IResponseData<ILicense>> => {
      const url = `${API_ROUTES.STAFFS}/${staffId}/licenses`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    useErrorBoundary(error) {
      return errorHandler(error, notification);
    },
    enabled: !!staffId,
  });
};

export const useSendPayCheck = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (payload: {
      body: {
        staffId: string;
        staffName: string;
        phone: string;
        salary: number;
      }[];
      params: {
        fclt_orgn_no: string;
        smsType: string;
        templateCode: string;
      };
    }) => {
      const { fclt_orgn_no, smsType, templateCode } = payload.params;
      const url = `${API_ROUTES.STAFFS}/send-pay-check?fclt_orgn_no=${fclt_orgn_no}&smsType=${smsType}&templateCode=${templateCode}`;
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
