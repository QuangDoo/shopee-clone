import axios, { AxiosError, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { clearAccessToken, getAccessTokenFromLS, saveAccessToken } from './auth';

let accessToken = getAccessTokenFromLS();
console.log('accessToken', accessToken);

export const http = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
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
    if (url === '/login' || url === '/register') {
      accessToken = response.data.data.access_token;
      saveAccessToken(accessToken);
    } else if (url === '/logout') {
      accessToken = '';
      clearAccessToken();
    }
    return response;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      const data: any | undefined = error.response?.data;
      const message = data.message || error.message;
      toast.error(message);
    }
    return Promise.reject(error);
  }
);
