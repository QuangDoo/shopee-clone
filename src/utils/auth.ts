export const saveAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const clearAccessToken = () => {
  localStorage.removeItem('access_token');
};

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || '';
