type Register = {
  access_token: string;
  expires: number;
  refresh_token: string;
  expires_refresh_token: number;
} & { user: User };

type AuthResponse = ResponseApi<Register>;

type AuthVariables = {
  email: string;
  password: string;
};

type RefreshTokenResponse = ResponseApi<{ access_token: string }>;
