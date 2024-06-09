import axiosClient from '@configs/axiosClient';

export const StorageAPI = {
  upload(body: any) {
    return axiosClient.post('/storages/upload', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
