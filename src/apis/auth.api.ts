import { http } from 'src/utils';

export const registerAccount = ({ email, password }: AuthVariables) =>
  http.post<AuthResponse>('/register', { email, password });
