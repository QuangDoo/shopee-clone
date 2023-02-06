import { http2 } from 'src/utils';

type BodyUploadProfile = Pick<User, 'name' | 'address' | 'date_of_birth' | 'avatar'> & {
  password?: string;
  new_password?: string;
};

const URL = '/me';

export const userApi = {
  getProfile: () => http2.get<ResponseApi<User>>(URL),
  updateProfile: (body: BodyUploadProfile) => http2.put<ResponseApi<User>>(URL, body),
  uploadAvatar: (body: FormData) =>
    http2.post<ResponseApi<string>>(`user/upload-avatar`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
};
