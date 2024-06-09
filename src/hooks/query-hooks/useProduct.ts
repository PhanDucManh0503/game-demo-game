import axiosClient from '@configs/axiosClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { App } from 'antd';
import { API_ROUTES, QUERY_KEYS } from '@utils/constants/routes.constant';
import { errorHandler } from '@utils/helpers/error.helper';

import { ISmsKakao } from './../../types/product';

export const useFetchProductSmsKakao = () => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_SMS_KAKAO],
    queryFn: async (): Promise<ISmsKakao[]> => {
      const url = `${API_ROUTES.PRODUCT}/sms-kakao`;

      return await axiosClient.get(url);
    },
    retry: false,
    keepPreviousData: true,
    useErrorBoundary(error) {
      return errorHandler(error, notification);
    },
  });
};

interface IRquestPaymentSMSKakao {
  feedbackurl: string;
  cmd: string;
  userid: string;
  goodname: string;
  price: number;
  recvphone: string;
  rcevemail: string;
  var1: string;
}

interface IResponsePaymentSMSKakao {
  state: number;
  errorMessage: string;
  mul_no: number;
  payurl: string;
  qrurl: string;
}

export const usePostRequestPaymentSMSKakao = () => {
  return useMutation({
    mutationFn: async (body: IRquestPaymentSMSKakao) => {
      const url = `/product-purchase-details/buy-product/request-payment`;
      const resp: IResponsePaymentSMSKakao = await axiosClient.post(url, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return resp;
    },
  });
};

export const usePostRequestPaymentSMSKakaoFakeSuccess = () => {
  return useMutation({
    mutationFn: async (body: { fclt_orgn_no: string; prod_no: number }) => {
      const { fclt_orgn_no, prod_no } = body;
      const url = `/product-purchase-details/buy-product/payment-charge-money/success-fake?fclt_orgn_no=${fclt_orgn_no}&prod_no=${prod_no}`;
      const resp = await axiosClient.post(url);
      return resp;
    },
  });
};

export const useFetchTemplateSmsPreview = (templateCode: string) => {
  const { notification } = App.useApp();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_TEMPLATE_SMS_PREVIEW, templateCode],
    queryFn: async (): Promise<{
      value: string;
    }> => {
      const params: any = {
        templateCode,
      };

      return await axiosClient.get('/template-message/preview', {
        params,
      });
    },
    retry: false,
    keepPreviousData: true,
    useErrorBoundary(error) {
      return errorHandler(error, notification);
    },
  });
};
