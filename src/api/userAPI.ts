import axiosClient from '@configs/axiosClient';

export const StaffAPI = {
  loginAPI(body: any) {
    return axiosClient.post('/auth/login', body);
  },
  getUserInformationAPI() {
    return axiosClient.get('/users/profile');
  },
  requestDepositTokenAPI(body: any) {
    return axiosClient.post('/transactions', body);
  },
};
