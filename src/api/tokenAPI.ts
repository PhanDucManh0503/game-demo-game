import axiosClient from '@configs/axiosClient';

export const TokenAPI = {
  // user
  userRequestDepositTokenAPI(body: any) {
    return axiosClient.post('/transactions', body);
  },
  //   admin
  adminGetRequestDeposit(params: any) {
    return axiosClient.get('/admin/transactions', { params });
  },
  adminUpdateRequestDeposit(body: any) {
    return axiosClient.put('/admin/transactions', body);
  },
};
