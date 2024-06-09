import axios, { AxiosInstance } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import queryString from 'query-string';

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params) => {
      for (const key in params) {
        if (
          typeof params[key] !== 'string' &&
          !(params[key] instanceof String)
        ) {
          params[key] = JSON.stringify(params[key]);
        }
      }
      return queryString.stringify({ ...params });
    },
  },
});

axiosClient.interceptors.request.use(async (config: any) => {
  const authCookie = getCookie('auth') || '{}';
  const authParse = JSON.parse(authCookie) || {};
  const accessToken = authParse?.state?.auth?.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    // config.headers.Authorization =
    //   'Bearer ' +
    //     'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bSI6IjAxMjM0NTY3ODkxIiwic3ViIjoiMDEyMzQ1Njc4OTEiLCJpYXQiOjE2OTk0MTgzNDQsImV4cCI6MTY5OTUwNDc0NH0.vjU5-YAaYtGeM04eJlWWdFt4WAGH1ZtuvNYeDZB49ns' ||
    //   accessToken;
    return config;
  }

  return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error: any) {
    if (
      error.response?.status === 401 &&
      error.response.data.error === 'Unauthorized'
    ) {
      deleteCookie('auth');
      window.location.href = window.location.origin + '/login';
    }
    return Promise.reject(error.response.data);
  },
);

export default axiosClient;
