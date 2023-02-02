import axios, { AxiosError, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { config, path } from 'src/constants';
import { clearLocalStorage, getAccessTokenFromLS, setAccessToken, setProfileToLS } from './auth';

let accessToken = getAccessTokenFromLS();

export const http = axios.create({
  baseURL: config.baseUrl,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    // check accessToken is existed
    if (!!accessToken && config.headers) {
      config.headers.authorization = accessToken;
      return config;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const { url } = response.config;
    if (url === path.login || url === path.register) {
      accessToken = response.data.data.access_token;
      setAccessToken(accessToken);
      setProfileToLS(response.data.data.user);
    } else if (url === path.logout) {
      accessToken = '';
      clearLocalStorage();
    }
    return response;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      const data: any | undefined = error.response?.data;
      const message = data?.message || error.message;
      toast.error(message || 'Đã có lỗi xảy ra');
    }
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      clearLocalStorage();
    }
    return Promise.reject(error);
  }
);
