import axios, { AxiosError, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

export const http = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
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
