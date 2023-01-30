import { http } from 'src/utils';

export const authApi = {
  registerAccount: ({ email, password }: AuthVariables) => http.post<AuthResponse>('/register', { email, password }),
  loginAccount: ({ email, password }: AuthVariables) => http.post<AuthResponse>('/login', { email, password }),
  logout: () => http.post('/logout')
};
