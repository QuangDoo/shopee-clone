import { http } from 'src/utils';

export const registerAccount = ({ email, password }: AuthVariables) =>
  http.post<AuthResponse>('/register', { email, password });

export const loginAccount = ({ email, password }: AuthVariables) =>
  http.post<AuthResponse>('/login', { email, password });

export const logout = () => http.post('/logout');
