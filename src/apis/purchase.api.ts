import { http2 } from 'src/utils';

const URL = '/purchases';

export type PurchaseVars = { product_id: string; buy_count: number };

export const purchaseApi = {
  getPurchases: (params: { status: PurchaseListStatus }) =>
    http2.get<ResponseApi<Purchase[]>>(URL, {
      params
    }),
  addToCart: (body: PurchaseVars) => http2.post<ResponseApi<Purchase>>(`${URL}/add-to-cart`, body),
  buyProducts: (body: PurchaseVars[]) => http2.post<ResponseApi<Purchase[]>>(`${URL}/buy-products`, body),
  updatePurchasesInCart: (body: PurchaseVars) => http2.put<ResponseApi<Purchase>>(`${URL}/update-purchase`, body),
  deletePurchaseInCart: (purchasesId: string[]) => http2.delete<{ deleted_count: number }>(URL, { data: purchasesId })
};
