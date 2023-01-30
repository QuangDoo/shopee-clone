type Product = {
  _id: string;
  images: string[];
  price: number;
  rating: number;
  price_before_discount: number;
  quantity: number;
  sold: number;
  view: number;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
};

type ProductList = {
  products: Product[];
  pagination: {
    page: number;
    limit: numner;
    page_size: number;
  };
};

type ProductListParams = {
  page?: numner | string;
  limit?: number | string;
  sort_by?: 'createAt' | 'view' | 'sold' | 'price';
  order?: 'asc' | 'desc';
  exclude?: string;
  rating_filter?: number | string;
  price_max?: number | string;
  price_min?: number | string;
  name?: string | string;
  category?: string;
};
