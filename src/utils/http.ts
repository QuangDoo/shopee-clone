/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis';
import { config } from 'src/constants';
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth';
import { isAxiosExpiredTokenEntity, isAxiosUnauthorizedEntity } from './utils';

// get token from local storage one time
// use a variable to perform logic
// this practical for getting data from RAM quicker than from LS
let accessToken = getAccessTokenFromLS();
let refreshToken = getRefreshTokenFromLS();

let refreshTokenRequest: Promise<string | undefined> | null = null;

export const http = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'expire-access-token': 60 * 60 * 24,
    'expire-refresh-token': 60 * 60 * 24 * 160
  }
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
    if (url === URL_LOGIN || url === URL_REGISTER) {
      accessToken = response.data.data.access_token;
      refreshToken = response.data.data.refresh_token;

      setAccessTokenToLS(accessToken);
      setRefreshTokenToLS(refreshToken);
      setProfileToLS(response.data.data.user);
    } else if (url === URL_LOGOUT) {
      accessToken = '';
      refreshToken = '';
      clearLocalStorage();
    }

    return response;
  },
  async function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Chỉ toast error lỗi không phải của 422 và 401
    if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
      const data: any | undefined = error.response?.data;
      const message = data?.message || error.message;
      toast.error(message || 'Đã có lỗi xảy ra');
    }

    // Lỗi Unauthorized (401) có rất nhiều trường hợp
    // 1. Token không đúng.
    // 2. Không truyền token
    // 3. Token hết hạn*

    // Nếu là lỗi 401
    if (isAxiosUnauthorizedEntity<ResponseApi<{ name: string; message: string }>>(error)) {
      const config = error.response?.config;
      if (config) {
        const { url, headers } = config;
        // trường hợp token hết hạn và request đó không phải là của request refresh token
        // thì chúng ta mới tiến hành gọi refresh token
        if (isAxiosExpiredTokenEntity(error) && url !== URL_REFRESH_TOKEN && !refreshTokenRequest) {
          // hạn chế gọi refresh token hai lần
          refreshTokenRequest = refreshTokenRequest
            ? refreshTokenRequest
            : handleRefreshToken().finally(() => {
                setTimeout(() => {
                  refreshTokenRequest = null;
                }, 10000);
              });

          const access_token = await refreshTokenRequest;
          // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi

          if (headers) {
            return http.request({
              ...config,
              // @ts-ignore
              headers: { ...headers, authorization: access_token }
            });
          }
        }
      }

      clearLocalStorage();
      accessToken = '';
      refreshToken = '';
      toast.error(error.response?.data?.data?.message || error.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

const handleRefreshToken = async () => {
  try {
    const res = await http.post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
      refresh_token: refreshToken
    });
    const _accessToken = res?.data?.data?.access_token || '';

    setAccessTokenToLS(_accessToken);
    accessToken = _accessToken;
    return _accessToken;
  } catch (error) {
    clearLocalStorage();
    refreshToken = '';
    accessToken = '';
    throw error;
  }
};
