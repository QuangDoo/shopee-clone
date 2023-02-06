import { http2 } from 'src/utils';

export const URL_LOGIN = 'login';
export const URL_REGISTER = 'register';
export const URL_LOGOUT = 'logout';
export const URL_REFRESH_TOKEN = 'refresh-access-token';

export const authApi = {
  registerAccount: ({ email, password }: AuthVariables) => http2.post<AuthResponse>(URL_REGISTER, { email, password }),
  loginAccount: ({ email, password }: AuthVariables) => http2.post<AuthResponse>(URL_LOGIN, { email, password }),
  logout: () => http2.post(URL_LOGOUT)
};
