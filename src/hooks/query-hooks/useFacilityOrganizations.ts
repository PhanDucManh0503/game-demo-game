import axiosClient from '@configs/axiosClient';
import { useTranslations } from '@hooks/locales.hook';
import { useUserStore } from '@stores/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import dayjs from 'dayjs';
import { IBank } from 'src/types/bank';
import { IResponseData } from 'src/types/common';
import {
  IBankbookDetail,
  IFinancial,
  IOrganization,
} from 'src/types/facility-organizations';
import { API_ROUTES, QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

export const useFetchFacilityOrganizations = (
  facilityOrganizationsId: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_FACILITY_ORGANIZATIONS,
      params,
      facilityOrganizationsId,
    ],
    queryFn: async (): Promise<IOrganization> => {
      const url = `${API_ROUTES.ORGANIZATION}/detail?org=${facilityOrganizationsId}`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!facilityOrganizationsId,
  });
};

export const useUpdateFacilityOrganization = () => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (data: any) => {
      const { facilityOrganizationsId, ...body } = data;
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/${facilityOrganizationsId}`;
      return await axiosClient.put(url, body);
    },
    onSuccess() {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FACILITY_ORGANIZATIONS],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchRemainingPoint = (
  smsType: string,
  fclt_orgn_no: string,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_REMAINING_POINT, fclt_orgn_no, smsType],
    queryFn: async (): Promise<{
      remaining_number: number;
    }> => {
      const url = `/product-purchase-details/remaining-point?smsType=${smsType}&fclt_orgn_no=${fclt_orgn_no}`;

      return await axiosClient.get(url);
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchSmsProductPurchaseDetails = () => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.SMS_PRODUCT_PURCHASE_DETAILS],
    queryFn: async (): Promise<{
      number: number;
    }> => {
      const url = `/product-purchase-detail/sms/remaining-number`;

      return await axiosClient.get(url);
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchKakaoProductPurchaseDetails = () => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.KAKAO_PRODUCT_PURCHASE_DETAILS],
    queryFn: async (): Promise<{
      number: number;
    }> => {
      const url = `/product-purchase-detail/kakao/remaining-number`;

      return await axiosClient.get(url);
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchMultipleListPhoneNumberReceiver = (
  listReceiverId: string[],
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_MULTIPLE_LIST_PHONE_NUMBER_RECEIVER,
      listReceiverId,
    ],
    queryFn: async (): Promise<
      {
        listPhone: {
          name: string;
          phone: string;
        }[];
        receiverId: string;
      }[]
    > => {
      const url = `${API_ROUTES.RECEIVERS}${API_ROUTES.PRESERVERS}${API_ROUTES.MULTIPLE_LIST_PHONE_NUMBER_RECEIVER}`;

      return await axiosClient.get(url, {
        params: {
          list_rcev_no: listReceiverId.join(','),
        },
      });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchBankbookDetails = (
  facilityOrganizationsId: string,
  params: any = { fields: ['$all'] },
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_BANKBOOK_DETAILS,
      facilityOrganizationsId,
      params,
    ],
    queryFn: async (): Promise<IResponseData<IBankbookDetail>> => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATION}/${facilityOrganizationsId}${API_ROUTES.BANKBOOK_DETAILS}/filter`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!facilityOrganizationsId,
  });
};

export const useCreateBankbook = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: {
      fclt_orgn_no: string;
      use_yn: boolean;
      us_val: string;
      bank_cd: string;
      bacn_no: string;
      bacn_pwd: string;
      bank_id: string;
      bank_pwd: string;
    }) => {
      const { fclt_orgn_no, ...payload } = body;
      const url = `${API_ROUTES.FACILITY_ORGANIZATION}/${fclt_orgn_no}${API_ROUTES.BANKBOOK_DETAILS}`;
      const resp = await axiosClient.post(url, payload);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_BANKBOOK_DETAILS],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useUpdateBankbook = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: {
      fclt_orgn_no: string;
      use_yn: boolean;
      bankNo: string;
      us_val?: string;
      bank_cd?: string;
      bacn_no?: string;
      bacn_pwd?: string;
      bank_id?: string;
      bank_pwd?: string;
    }) => {
      const { fclt_orgn_no, bankNo, ...payload } = body;
      const url = `${API_ROUTES.FACILITY_ORGANIZATION}/${fclt_orgn_no}${API_ROUTES.BANKBOOK_DETAILS}/${bankNo}`;
      const resp = await axiosClient.put(url, payload);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_BANKBOOK_DETAILS],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchBanks = (params: any = { fields: ['$all'] }) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_BANKBOOK_DETAILS, params],
    queryFn: async (): Promise<IResponseData<IBank>> => {
      const url = `${API_ROUTES.BANKS}/filter`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useFetchFinancialManagement = () => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_FINANCIAL],
    queryFn: async (): Promise<IResponseData<IFinancial>> => {
      const url = `${API_ROUTES.GET_FINANCIAL}`;

      return await axiosClient.get(url, {
        params: {
          year: dayjs().year(),
        },
      });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useCreateSalaryAllowances = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (data: any) => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/salaryAllowances`;
      return await axiosClient.post(url, data);
    },
    onSuccess() {
      notification.success({
        message: t('success'),
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};
export const useUpdateSalaryAllowances = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (data: any) => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}`;
      return await axiosClient.put(url, data);
    },
    onSuccess() {
      notification.success({
        message: t('success'),
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export interface IJointCertificates {
  fclt_orgn_no: string;
  cert_seq: number;
  cert_path: string;
  cert_nm: string;
  cert_pass: string;
  use_yn: boolean;
  connected_id: string;
  input_stf_no: string;
  input_dtm: string;
  modf_stf_no: string;
  modf_dtm: string;
}

export const useFetchJointCertificates = (organizationId: string) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_JOINT_CERTIFICATES, organizationId],
    queryFn: async (): Promise<IJointCertificates> => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATION}/${organizationId}/joint-certificates`;

      return await axiosClient.get(url, {
        params: {
          year: dayjs().year(),
        },
      });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!organizationId,
  });
};

export const useCreateJointCertificates = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (data: any) => {
      const { organizationId, ...payload } = data;
      const url = `${API_ROUTES.FACILITY_ORGANIZATION}/${organizationId}/joint-certificates`;

      return await axiosClient.post(url, payload);
    },
    onSuccess() {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_JOINT_CERTIFICATES],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useUpdateJointCertificates = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (data: any) => {
      const { organizationId, ...payload } = data;
      const url = `${API_ROUTES.FACILITY_ORGANIZATION}/${organizationId}/joint-certificates`;

      return await axiosClient.put(url, payload);
    },
    onSuccess() {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_JOINT_CERTIFICATES],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export interface IMacrosByOrganizationId {
  id: number;
  insDate: string;
  macroStrTime: string;
  macroEndTime: string;
  apiId: string;
  centerId: string;
  resultMessage: string;
  state: string;
}
export const useFetchMacrosByOrganizationId = (
  organizationId: string,
  params: any,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_MACRO_BY_ORGANIZATION_ID, organizationId, params],
    queryFn: async (): Promise<IResponseData<IMacrosByOrganizationId>> => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/${organizationId}/macros`;

      return await axiosClient.get(url, {
        params,
      });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!organizationId,
  });
};

export const useUpdateMacrosNote = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (data: {
      organizationId: string;
      seq: number;
      resultMessage: string;
    }) => {
      const { organizationId, seq, resultMessage } = data;
      const url = `${API_ROUTES.FACILITY_ORGANIZATIONS}/${organizationId}/macros/${seq}`;

      return await axiosClient.put(url, {
        resultMessage,
      });
    },
    onSuccess() {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MACRO_BY_ORGANIZATION_ID],
      });
    },
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export interface INotifications {
  notc_seq: number;
  notc_title_nm: string;
  admin_no: {
    admin_no: string;
    admin_nm: string;
  };
  abal_exps_yn: boolean;
  str_dtm: string;
  end_dtm: string;
  exps_type_cd: string;
  notc_cntn: string;
  img_path: string;
  img_file_nm: string;
  attch_files: {
    attch_file_seq: number;
    attch_file_path: string;
    attch_file_nm: string;
  }[];
  input_stf_no: string;
  input_dtm: string;
  modf_stf_no: string;
  modf_dtm: string;
}

export const useFetchNotifications = (organizationId: string) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_JOINT_CERTIFICATES, organizationId],
    queryFn: async (): Promise<IResponseData<INotifications>> => {
      const url = `${API_ROUTES.FACILITY_ORGANIZATION}/${organizationId}/notifications/exposure?organizationId=${organizationId}`;

      return await axiosClient.get(url);
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: !!organizationId,
  });
};

export interface IEvaluation {
  eval_stnd_no: number;
  eval_knd_no: string;
  eval_yy: number;
  eval_stnd_nm: string;
  eval_stnd_cntn: string;
  scr_val: number;
  lv: string;
  eval_gud_cntn: string;
  methods: string[];
  attachments: {
    path: string;
    name: string;
    inputDateTime: string;
  }[];
}

export const useFetchEvaluations = (params: {
  organizationId: string;
  year: any;
  page: number;
  limit: number;
  methodCode: string;
}) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_EVALUATIONS, params],
    queryFn: async (): Promise<IResponseData<IEvaluation>> => {
      const { organizationId, ...payload } = params;
      const url = `${API_ROUTES.FACILITY_ORGANIZATION}/evaluations?facility-organization-id=${organizationId}`;

      return await axiosClient.get(url, {
        params: payload,
      });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useCheckBoughtProduct = (params: { prodNo: string }) => {
  const { notification } = App.useApp();
  const { user } = useUserStore();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EVALUATIONS, params, user?.fclt_orgn_no!],
    queryFn: async (): Promise<any> => {
      const { prodNo } = params;
      const url = `/organization/${user?.fclt_orgn_no!}/check-bought-product?prodNo=${prodNo}`;

      return await axiosClient.get(url);
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
    enabled: false,
    staleTime: 0,
  });
};
