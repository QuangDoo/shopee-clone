import { http } from 'src/utils';

const URL = '/purchases';

export const purchaseApi = {
  getPurchases: (params: { status: PurchaseListStatus }) =>
    http.get<ResponseApi<Purchase[]>>(URL, {
      params
    }),
  addToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<ResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
};
