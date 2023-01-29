export const setAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');
};

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || '';

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile');

  return result ? JSON.parse(result) : undefined;
};

export const setProfileToLS = (profile: User) => localStorage.setItem('profile', JSON.stringify(profile));
