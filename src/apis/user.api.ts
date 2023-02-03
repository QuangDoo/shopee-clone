import { http } from 'src/utils';

type BodyUploadProfile = Pick<User, 'name' | 'address' | 'date_of_birth' | 'avatar'> & {
  password?: string;
  new_password?: string;
};

const URL = '/me';

export const userApi = {
  getProfile: () => http.get<ResponseApi<User>>(URL),
  updateProfile: (body: BodyUploadProfile) => http.put<ResponseApi<User>>(URL, body),
  uploadAvatar: (body: FormData) =>
    http.post<ResponseApi<string>>(`user/upload-avatar`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
};
