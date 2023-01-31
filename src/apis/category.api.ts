import { http } from 'src/utils';

export const categoryApi = {
  getCategory: () => {
    return http.get<ResponseApi<Category[]>>('/categories');
  }
};
