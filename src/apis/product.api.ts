import { http2 } from 'src/utils';

const URL = '/products';

export const productApi = {
  getProductList: (payload: ProductListParams) => {
    return http2.get<ResponseApi<ProductList>>(URL, { params: payload });
  },
  getProductDetail: (id: string) => {
    return http2.get<ResponseApi<Product>>(`${URL}/${id}`);
  }
};
