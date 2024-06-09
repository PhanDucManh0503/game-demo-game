import axiosClient from '@configs/axiosClient';
import { useTranslations } from '@hooks/locales.hook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { IResponseData } from 'src/types/common';
import { API_ROUTES, QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

export interface ILaborCostByYearItem {
  total: string;
  percentage: string;
  pay: string;
}
export interface ILaborCostByYearData {
  homeBath: ILaborCostByYearItem[];
  homeCare: ILaborCostByYearItem[];
  homeNursing: ILaborCostByYearItem[];
}
export const useFetchLaborCostByYear = (params: {
  org: string;
  year?: any;
}) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_LABOR_COST_BY_YEAR, params],
    queryFn: async (): Promise<ILaborCostByYearData> => {
      const url = `${API_ROUTES.LABOR_COST_RATIO}/filterByYear`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

//

export interface ILaborCostSummary {
  depositAmount: number;
  totalDepositAmount: number;
  withdrawAmount: number;
  totalWithdrawAmount: number;
}

export const useFetchLaborCostSummary = (org: string, year: string) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_LABOR_COST_SUMMARY, org, year],
    queryFn: async (): Promise<ILaborCostSummary> => {
      const url = `${API_ROUTES.LABOR_COST_RATIO}/summaries`;

      return await axiosClient.get(url, {
        params: {
          org,
          year,
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

export interface ILaborCostDetails {
  withdraw_amt: number;
  svc_type_cd: string;
  bank_nm: string;
  detail_no: any;
  inc_spnd_dv_cd: string;
  cntn: string;
  deposit_amt: any;
  note_cntn: any;
  slt_dv_cd: string;
  fnd_soce_cd: string;
  his_tran_no: number;
  balance: number;
  dpst_dtm: string;
  bacn_no: string;
  fnd_soce_txt: string;
  detail: any;
  tran_person_nm: string;
  inc_yn: string;
  his_bkb_no: number;
}
export const useFetchLaborCostDetails = (
  org: string,
  year: string,
  params?: any,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_LABOR_COST_DETAILS, org, year, params],
    queryFn: async (): Promise<{
      content: ILaborCostDetails[];
      totalElements: number;
    }> => {
      const url = `${API_ROUTES.LABOR_COST_RATIO}/details`;

      return await axiosClient.get(url, {
        params: {
          org,
          year,
          ...params,
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

export interface IYearEndSettlementStaffsItem {
  stf_no: string;
  yy: string;
  stf_addr: string;
  stf_nm: string;
  stf_tkj: string;
  stf_w4c_val: string;
  stf_wk_stat_cd: string;
  stf_wk_dv_cd: string;
  mpay_calc_way_cd: string;
  tot_alwc_amt: number;
  stf_jncmp_dt: string;
  dpdt_num: number;
  stf_sx_cd: string;
  stf_brdt: string;
  stf_hp_no: string;
  stf_avt_path: string;
  stf_avt_nm: string | null;
  stf_memo: string | null;
  corr_file_path: string;
  corr_file_nm: string;
  bfre_whtr_file_path: string;
  bfre_whtr_file_nm: string;
  sfyes_file_path: string;
  sfyes_file_nm: string;
  whtr_file_path: string;
  whtr_file_nm: string;
  famy_rels_ctf_attch_files: { path: string; name: string }[];
  etc_attch_files: { path: string; name: string }[];
  yesmt_prcs_stat_cd: string;
  appl_dt: string | null;
  prcs_dt: string | null;
  redc_colct_tamt_amt: string | null;
}

export const useFetchYearEndSettlementStaffs = (params?: any) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_YEAR_END_SETTLEMENT_STAFFS, params],
    queryFn: async (): Promise<IResponseData<IYearEndSettlementStaffsItem>> => {
      const url = `/staffsYesmt`;

      return await axiosClient.get(url, {
        params,
      });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export interface IYearEndSettlementReceiversItem {
  name: string;
  sexCode: string;
  dateOfBirth: string;
  phoneNumber: string;
  rcev_no: string;
  yy: string;
  wk_stat_cd: string;
  mpay_calc_way_cd: string;
  tot_alwc_amt: number;
  dpdt_yn: boolean;
  jncmp_dt: string;
  corr_file_path: string;
  famy_rels_ctf_file_path: string;
  bfre_whtr_file_path: string;
  sfyes_file_path: string;
  etc_file_path: string;
  yesmt_prcs_stat_cd: string;
  appl_dt: string;
  prcs_dt: string;
  whtr_file_path: string;
  redc_colct_tamt_amt: number;
}

export const useFetchYearEndSettlementReceivers = (params?: any) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_YEAR_END_SETTLEMENT_RECEIVERS, params],
    queryFn: async (): Promise<IResponseData<IYearEndSettlementStaffsItem>> => {
      const url = `/receiverYesmtDetail`;

      return await axiosClient.get(url, {
        params,
      });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export interface ICategoryManagementDetail {
  detailNo: number;
  detail: string;
  checkRegister: boolean;
  facilityOrganizationName: string;
  facilityOrganizationId: string;
  categoryManagement: {
    riomNo: number;
    yy: string;
    atclNm: string;
    sbscNm: string;
    itmNm: string;
    riomTypeDvCd: string;
  };
  inputDate: string;
  checkRegisterUpdatedDate: any;
}

export const useFetchCategoryManagementDetail = (
  checkRegister: boolean = true,
) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORY_MANAGEMENT_DETAIL, checkRegister],
    queryFn: async (): Promise<ICategoryManagementDetail[]> => {
      const url = `/category-management-detail?checkRegister=${checkRegister}`;

      return await axiosClient.get(url);
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export interface IEstimatedBudgets {
  sbSeq: number;
  atclNm: string;
  sbscNm: string;
  itmNm: string;
  itemName: string;
  fundSourceCode: string;
  unitPriceAmount: number;
  number: number;
  monthNumber: number;
  supplementaryBudgetAmount: number;
  totalEstimatedAmountLastYear: number;
  riomNo: number;
}

// Estimation management
// type = 'expenditure' | 'revenue'
export const useFetchEstimatedBudgets = (params: {
  type: string;
  yy: string | number;
  size: number;
}) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_ESTIMATED_BUDGETS, params],
    queryFn: async (): Promise<{
      content: IEstimatedBudgets[];
      numberOfElements: number;
      totalAmountEstimatedLastYear: number;
      totalAmountIncreasedOrDecreased: number;
      totalElements: number;
      totalEstimatedAmountThisYear: number;
      totalPages: number;
    }> => {
      const url = `/financial/accounting/estimated-budgets/list-get-all`;

      return await axiosClient.get(url, { params });
    },
    retry: false,
    keepPreviousData: true,
    onError: (error: any) => {
      return errorHandler(error, notification);
    },
  });
};

export const useCreateEstimatedBudgetsRevenue = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: {
      yy: string;
      fndSoceCd: string;
      itemNm: string;
      monsNum: number;
      num: number;
      riomNo: number;
      uprcAmt: number;
    }) => {
      const url = `/financial/accounting/estimated-budgets/revenue`;
      const resp = await axiosClient.post(url, body);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ESTIMATED_BUDGETS],
      });
    },
  });
};
export const useUpdateEstimatedBudgetsRevenue = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: {
      sbSeq: string;
      yy: string;
      year: string;
      fndSoceCd: string;
      itemNm: string;
      monsNum: number;
      num: number;
      riomNo: number;
      uprcAmt: number;
    }) => {
      const { year, sbSeq, ...payload } = body;
      const url = `/financial/accounting/estimated-budgets/revenue/update?year=${year}&seq=${sbSeq}`;
      const resp = await axiosClient.put(url, payload);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ESTIMATED_BUDGETS],
      });
    },
  });
};

export const useCreateEstimatedBudgetsExpenditure = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: {
      yy: string;
      fndSoceCd: string;
      itemNm: string;
      monsNum: number;
      num: number;
      riomNo: number;
      uprcAmt: number;
    }) => {
      const url = `/financial/accounting/estimated-budgets/expenditure`;
      const resp = await axiosClient.post(url, body);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ESTIMATED_BUDGETS],
      });
    },
  });
};
export const useUpdateEstimatedBudgetsExpenditure = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: {
      sbSeq: string;
      yy: string;
      year: string;
      fndSoceCd: string;
      itemNm: string;
      monsNum: number;
      num: number;
      riomNo: number;
      uprcAmt: number;
    }) => {
      const { year, sbSeq, ...payload } = body;
      const url = `/financial/accounting/estimated-budgets/expenditure/update?year=${year}&seq=${sbSeq}`;
      const resp = await axiosClient.put(url, payload);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ESTIMATED_BUDGETS],
      });
    },
  });
};

export const useSendToTaxLaborCostRatio = () => {
  const { notification } = App.useApp();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (body: { orgId: string; salaryYearMonth: string }) => {
      const url = `${API_ROUTES.LABOR_COST_RATIO}/send-to-tax`;
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
