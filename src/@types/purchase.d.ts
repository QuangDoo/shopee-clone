type PurchasesStatus = -1 | 1 | 2 | 3 | 4 | 5;

type PurchaseListStatus = PurchasesStatus | 0;

type Purchase = {
  buy_count: number;
  price: number;
  price_before_discount: number;
  status: PurchaseListStatus;
  _id: string;
  user: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
};
