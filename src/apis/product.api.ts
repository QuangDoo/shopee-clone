import { http } from 'src/utils';

const URL = '/products';

export const productApi = {
  getProductList: (payload: ProductListParams) => {
    return http.get<ResponseApi<ProductList>>(URL, { params: payload });
  },
  getProductDetail: (id: string) => {
    return http.get<ResponseApi<Product>>(`${URL}/${id}`);
  }
};
