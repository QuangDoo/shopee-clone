import { http2 } from 'src/utils';

export const categoryApi = {
  getCategory: () => {
    return http2.get<ResponseApi<Category[]>>('/categories');
  }
};
